<?php

namespace App\Helpers\Folder;

use App\Models\File\File;
use App\Models\Folder\Folder;
use Illuminate\Support\Str;

class FolderHelper
{
    private FolderChildrenFinder $childrenFinder;

    public function __construct()
    {
        $this->childrenFinder = new FolderChildrenFinder();
    }

    /**
     * Build a Tree Structure containing children of a given Folder
     * @return array
     */
    public function buildTree(Folder $folder): array
    {
        return [
            'folder' => $folder,
            'files' => File::where('parent_id', $folder->id)->get(),
            'children' => Folder::where('parent_id', $folder->id)
                ->get()
                ->map(fn(Folder $childFolder) => $this->buildTree($childFolder))
                ->toArray(),
        ];
    }

    public function generateFolderPath(int $userId, string $path = "", string $extension = ""): string
    {
        $generatedPath = (empty($path) ? $userId . '/folders' : $path) . '/';
        $generatedPath .= Str::random() . (empty($extension) ? "" : '.' . $extension);

        return $generatedPath;
    }

    public function getFolderSize(Folder $folder): int
    {
        $folderChildren = $this->childrenFinder->getFolderChildren($folder);
        $size = 0;

        foreach ($folderChildren as $folderChild) {
            $size += $folderChild->size;
        }

        return $size;
    }
}
