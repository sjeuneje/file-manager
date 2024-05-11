<?php

namespace App\Helpers;

use Illuminate\Support\Str;

class FolderHelper
{
    public static function generateFolderPath(int $userId, string $path = "", string $extension = ""): string
    {
        $generatedPath = (empty($path) ? $userId . '/folders' : $path) . '/';
        $generatedPath .= Str::random() . (empty($extension) ? "" : '.' . $extension);

        return $generatedPath;
    }
}
