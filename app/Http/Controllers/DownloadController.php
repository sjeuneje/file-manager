<?php

namespace App\Http\Controllers;

use App\Helpers\Folder\FolderHelper;
use App\Http\Requests\DownloadFolderRequest;
use App\Models\File\File;
use App\Models\Folder\Folder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Response;
use ZipArchive;

class DownloadController extends Controller
{
    /**
     * Download all subfolders from the given parent folder.
     *
     * @param DownloadFolderRequest $request
     * @return \Symfony\Component\HttpFoundation\BinaryFileResponse
     * @throws \Exception
     */
    public function downloadFolder(DownloadFolderRequest $request): \Symfony\Component\HttpFoundation\BinaryFileResponse
    {
        $folder = Folder::firstWhere('id', $request->id);

        if (!$folder) abort(404, 'Folder not found.');

        $zipFileName = $folder->name . '.zip';
        $zipPath = storage_path("app/{$zipFileName}");
        $sourceFolder = $folder->path;
        $rootFolderName = $folder->name;

        $zip = new ZipArchive;
        if ($zip->open($zipPath, ZipArchive::CREATE | ZipArchive::OVERWRITE) !== true) {
            throw new \Exception('Unable to create ZIP file.');
        }

        $files = Storage::allFiles($sourceFolder);

        foreach ($files as $file) {
            $fileModel = File::firstWhere('path', $file);

            if (!$fileModel) continue;

            $realName = $fileModel->name;
            $parentFolder = Folder::firstWhere('id', $fileModel->parent_id);
            $logicalPath = $this->buildFolderPath($parentFolder, $folder->id);
            $pathInZip = $rootFolderName;

            if ($logicalPath) {
                $pathInZip .= '/' . $logicalPath;
            }

            $pathInZip .= '/' . $realName;
            $zip->addFromString($pathInZip, Storage::get($file));
        }

        $zip->close();

        if (!file_exists($zipPath)) abort(500, 'ZIP file not created.');

        return response()->download($zipPath)->deleteFileAfterSend(true);
    }

    private function buildFolderPath(?Folder $folder, $rootFolderId): string
    {
        if (!$folder || $folder->id == $rootFolderId) {
            return '';
        }

        $parentPath = $this->buildFolderPath($folder->parent, $rootFolderId);

        return $parentPath ? $parentPath . '/' . $folder->name : $folder->name;
    }
}
