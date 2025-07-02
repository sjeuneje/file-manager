<?php

namespace App\Services\Folder;

use App\Helpers\Folder\FolderHelper;
use App\Helpers\ZipHelper;
use App\Models\Folder\Folder;
use Illuminate\Support\Facades\Storage;
use ZipArchive;

class FolderDownloadService
{
    private FolderHelper $folderHelper;
    private ZipHelper $zipHelper;

    public function __construct(FolderHelper $folderHelper, ZipHelper $zipHelper)
    {
        $this->folderHelper = $folderHelper;
        $this->zipHelper = $zipHelper;
    }

    public function downloadZip(Folder $folder): string
    {
        $tree = $this->folderHelper->buildTree($folder);

        $zipFileName = $folder->name . '-' . now()->timestamp . '.zip';
        $zipPath = storage_path("app/tmp/{$zipFileName}");

        Storage::makeDirectory('tmp');

        $zip = new ZipArchive;
        if ($zip->open($zipPath, ZipArchive::CREATE | ZipArchive::OVERWRITE) === TRUE) {
            $this->zipHelper->addFolderToZip($tree, $zip);
            $zip->close();
        } else {
            abort(500, 'Impossible de créer l’archive ZIP.');
        }

        return $zipPath;
    }
}
