<?php

namespace App\Actions\File;

use App\Actions\BaseActionInterface;
use App\Helpers\Folder\FolderHelper;
use App\Jobs\StoreImportedFile;
use App\Models\File\File;
use App\Models\Folder\Folder;

class DispatchImportedFiles implements BaseActionInterface
{
    public function __construct(
        private readonly array $importedFiles,
        private readonly ?int $parentId,
        private readonly int $userId)
    {}

    public function execute(): void
    {
        foreach ($this->importedFiles as $importedFile) {

            $file = new File();

            $file->user_id = $this->userId;
            $file->parent_id = $this->parentId;
            $file->name = $importedFile->getClientOriginalName();
            $file->size = $importedFile->getSize();

            $parentFolder = Folder::query()->firstWhere('id', $file->parent_id);

            $tempFilePath = $importedFile->store('temp');

            $file->path = (new FolderHelper)->generateFolderPath($this->userId, $parentFolder->path, $importedFile->getClientOriginalExtension());

            $file->save();

            StoreImportedFile::dispatch(
                $file,
                $tempFilePath
            );
        }
    }
}
