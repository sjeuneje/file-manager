<?php

namespace App\Helpers\Folder;

use App\Models\File\File;
use App\Models\Folder\Folder;
use Illuminate\Database\Eloquent\Collection;

class FolderChildrenFinder
{
    private \Illuminate\Support\Collection $allFolderChildren;

    public function __construct()
    {
        $this->allFolderChildren = collect();
    }

    private function getAllFolderChildren(): \Illuminate\Support\Collection
    {
        return $this->allFolderChildren;
    }

    protected function getFolderChildren(Folder $folder, &$visitedFolders = [])
    {
        if (in_array($folder->id, $visitedFolders)) {
            return;
        }

        $visitedFolders[] = $folder->id;

        $foundChildren = $this->getFoundChildren($folder->id);

        if ($foundChildren->isEmpty()) {
            return $this->allFolderChildren;
        }

        $this->allFolderChildren = $this->allFolderChildren->merge($foundChildren);

        foreach ($foundChildren as $foundChild) {
            if ($foundChild instanceof Folder) {
                $this->getFolderChildren($foundChild, $visitedFolders);
            }
        }

        return $this->allFolderChildren;
    }

    protected function getFoundChildren(int $parentId)
    {
        $foundChildrenFolder = Folder::query()
            ->where('parent_id', $parentId)
            ->get();

        $foundChildrenFile = File::query()
            ->where('parent_id', $parentId)
            ->get();

        if ($foundChildrenFolder->isEmpty())
            return $foundChildrenFile;

        return $foundChildrenFolder->merge($foundChildrenFile);
    }
}
