<?php

namespace App\Helpers\Folder;

use App\Models\File\File;
use App\Models\Folder\Folder;
use Illuminate\Database\Eloquent\Collection;

class FolderChildrenFinder
{
    public function getFolderChildren(Folder $folder): \Illuminate\Support\Collection
    {
        $allChildren = collect();
        $visitedFolders = [];

        $this->getFolderChildrenRecursive($folder, $allChildren, $visitedFolders);

        return $allChildren;
    }

    private function getFolderChildrenRecursive(Folder $folder, \Illuminate\Support\Collection &$allChildren, array &$visitedFolders): void
    {
        if (in_array($folder->id, $visitedFolders)) {
            return;
        }

        $visitedFolders[] = $folder->id;

        $childFolders = $this->getChildFolders($folder->id);
        $childFiles = $this->getChildFiles($folder->id);

        $allChildren = $allChildren->merge($childFolders)->merge($childFiles);

        foreach ($childFolders as $childFolder) {
            $this->getFolderChildrenRecursive($childFolder, $allChildren, $visitedFolders);
        }
    }

    private function getChildFolders(int $parentId): Collection
    {
        return Folder::where('parent_id', $parentId)->get();
    }

    private function getChildFiles(int $parentId): Collection
    {
        return File::where('parent_id', $parentId)->get();
    }
}
