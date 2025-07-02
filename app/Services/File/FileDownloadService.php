<?php

namespace App\Services\File;

use App\Helpers\ZipHelper;
use App\Http\Requests\DownloadFileRequest;
use App\Models\File\File;
use Illuminate\Support\Facades\Storage;
use ZipArchive;

class FileDownloadService
{
    private ZipHelper $zipHelper;

    public function __construct(ZipHelper $zipHelper)
    {
        $this->zipHelper = $zipHelper;
    }

    public function downloadZip(File $file): string
    {
        $zipFileName = $file->name . '-' . now()->timestamp . '.zip';
        $zipPath = storage_path("app/tmp/{$zipFileName}");

        Storage::makeDirectory('tmp');

        $zip = new ZipArchive;
        if ($zip->open($zipPath, ZipArchive::CREATE | ZipArchive::OVERWRITE) === TRUE) {
            $this->zipHelper->addFileToZip($file, $zip);
            $zip->close();
        } else {
            abort(500, 'Impossible de créer l’archive ZIP.');
        }

        return $zipPath;
    }
}
