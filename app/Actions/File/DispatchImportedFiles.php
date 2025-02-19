<?php

namespace App\Actions\File;

use App\Actions\BaseActionInterface;
use App\Helpers\Folder\FolderHelper;
use App\Jobs\StoreImportedFile;
use App\Models\File\File;

class DispatchImportedFiles implements BaseActionInterface
{
    public function __construct(
        private array $importedFiles,
        private ?int $parentId,
        private int $userId)
    {}

    public function execute(): void
    {
        foreach ($this->importedFiles as $importedFile) {
            $file = new File();

            $file->user_id = $this->userId;
            $file->parent_id = $this->parentId;
            $file->name = $importedFile->getClientOriginalName();
            $file->size = $importedFile->getSize();

            $tempFilePath = $importedFile->store('temp');

            $file->path = (new FolderHelper)->generateFolderPath($this->userId, "", $importedFile->getClientOriginalExtension());

            $file->save();

            StoreImportedFile::dispatch(
                $file,
                $tempFilePath
            );
        }
    }
}
