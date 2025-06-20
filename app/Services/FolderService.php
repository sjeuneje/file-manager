<?php

namespace App\Services;

use App\Helpers\Folder\FolderHelper;
use App\Models\Folder\Folder;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class FolderService
{
    private FolderHelper $folderHelper;

    public function __construct(FolderHelper $folderHelper)
    {
        $this->folderHelper = $folderHelper;
    }

    public function create(string $name, int $userId, ?int $parentId = null): Folder
    {
        $generatedFolderPath = $this->generateFolderPath($userId, $parentId);

        try {
            Storage::makeDirectory($generatedFolderPath);
        } catch (\Exception $e) {
            Log::error('Failed to create directory: ' . $e->getMessage(), [
                'name' => $name,
                'user_id' => $userId,
                'parent_id' => $parentId
            ]);
            throw new \RuntimeException('Unable to create folder directory.');
        }

        try {
            return Folder::create([
                'path' => $generatedFolderPath,
                'user_id' => $userId,
                'parent_id' => $parentId,
                'name' => $name,
                'size' => 0
            ]);
        } catch (\Exception $e) {
            Storage::deleteDirectory($generatedFolderPath);
            Log::error('Failed to create folder record: ' . $e->getMessage(), [
                'name' => $name,
                'user_id' => $userId,
                'parent_id' => $parentId
            ]);
            throw new \RuntimeException('Unable to create folder record.');
        }
    }

    public function rename(int $folderId, string $newName): Folder
    {
        $folder = Folder::findOrFail($folderId);

        $folder->update(['name' => $newName]);

        return $folder->fresh();
    }

    public function getSize(Folder $folder): int
    {
        return $this->folderHelper->getFolderSize($folder);
    }

    private function generateFolderPath(int $userId, ?int $parentId): string
    {
        if ($parentId) {
            $parentFolder = Folder::findOrFail($parentId);
            return $this->folderHelper->generateFolderPath($userId, $parentFolder->path);
        }

        return $this->folderHelper->generateFolderPath($userId);
    }
}
