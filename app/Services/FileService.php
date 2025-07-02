<?php

namespace App\Services;

use App\Helpers\Folder\FolderHelper;
use App\Jobs\StoreImportedFile;
use App\Models\File\File;
use App\Models\Folder\Folder;
use Illuminate\Http\UploadedFile;

class FileService
{
    private FolderHelper $folderHelper;

    public function __construct(FolderHelper $folderHelper)
    {
        $this->folderHelper = $folderHelper;
    }

    public function rename(int $fileId, string $newName): File
    {
        $file = File::findOrFail($fileId);

        $fileExtension = pathinfo($file->name, PATHINFO_EXTENSION);
        $fullName = $fileExtension ? $newName . '.' . $fileExtension : $newName;

        $file->update(['name' => $fullName]);

        return $file->fresh();
    }

    public function uploadMultiple(array $uploadedFiles, int $userId, ?int $parentId = null): array
    {
        $files = [];

        foreach ($uploadedFiles as $uploadedFile) {
            $files[] = $this->upload($uploadedFile, $userId, $parentId);
        }

        return $files;
    }

    private function upload(UploadedFile $uploadedFile, int $userId, ?int $parentId = null): File
    {
        $parentFolder = $parentId ? Folder::findOrFail($parentId) : null;

        $file = new File([
            'user_id' => $userId,
            'parent_id' => $parentId,
            'name' => $uploadedFile->getClientOriginalName(),
            'size' => $uploadedFile->getSize(),
        ]);

        $tempFilePath = $uploadedFile->store('temp');

        $file->path = $this->folderHelper->generateFolderPath(
            $userId,
            $parentFolder?->path ?? '',
            $uploadedFile->getClientOriginalExtension()
        );

        $file->save();

        StoreImportedFile::dispatch($file, $tempFilePath);

        return $file;
    }
}
