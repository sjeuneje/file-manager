<?php

namespace App\Helpers\Folder;

use App\Models\File\File;
use App\Models\Folder\Folder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Str;

class FolderHelper extends FolderChildrenFinder
{
    public function getFolderChidren(Folder $folder)
    {
        return $this->getFolderChildren($folder);
    }

    public function generateFolderPath(int $userId, string $path = "", string $extension = ""): string
    {
        $generatedPath = (empty($path) ? $userId . '/folders' : $path) . '/';
        $generatedPath .= Str::random() . (empty($extension) ? "" : '.' . $extension);

        return $generatedPath;
    }

    public function getFolderSize(Folder $folder): int
    {
        $folderChildren = $this->getFolderChildren($folder);
        $size = 0;

        foreach ($folderChildren as $folderChild) {
            $size += $folderChild->size;
        }

        return $size;
    }
}
