<?php

namespace App\Helpers;

use App\Models\File\File;
use ZipArchive;

class ZipHelper
{
    public function addFileToZip(File $file, ZipArchive $zip, string $currentPath = ''): void
    {
        $folderName = $file->name;
        $path = $currentPath . $folderName . '/';

        $storagePath = storage_path('app/' . $file->path);
        $filename = $file->name;
        if (file_exists($storagePath)) {
            $zip->addFile($storagePath, $path . $filename);
        }
    }

    public function addFolderToZip(array $tree, ZipArchive $zip, string $currentPath = ''): void
    {
        $folderName = $tree['folder']->name;
        $path = $currentPath . $folderName . '/';

        foreach ($tree['files'] as $file) {
            $storagePath = storage_path('app/' . $file->path);
            $filename = $file->name;
            if (file_exists($storagePath)) {
                $zip->addFile($storagePath, $path . $filename);
            }
        }

        foreach ($tree['children'] as $child) {
            $this->addFolderToZip($child, $zip, $path);
        }
    }
}
