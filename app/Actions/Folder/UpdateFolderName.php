<?php

namespace App\Actions\Folder;

use App\Actions\BaseActionInterface;
use App\Http\Requests\UpdateFolderRequest;
use App\Models\Folder\Folder;

class UpdateFolderName implements BaseActionInterface
{
    private UpdateFolderRequest $updateFolderRequest;

    public function __construct(UpdateFolderRequest $updateFolderRequest)
    {
        $this->updateFolderRequest = $updateFolderRequest;
    }

    public function execute(): void
    {
        $folder = Folder::query()->firstWhere('id', $this->updateFolderRequest->id);

        abort_if(is_null($folder), 404, 'Dossier non trouvé.');

        $folder->name = $this->updateFolderRequest->name;
        $folder->save();
    }
}
