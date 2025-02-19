<?php

namespace App\Actions\Folder;

use App\Actions\BaseActionInterface;
use App\Helpers\Folder\FolderHelper;
use App\Http\Requests\Folder\StoreNewFolderRequest;
use App\Models\Folder\Folder;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class CreateFolder implements BaseActionInterface
{
    private StoreNewFolderRequest $request;

    public function __construct(StoreNewFolderRequest $request)
    {
        $this->request = $request;
    }

    public function execute(): void
    {
        if (!empty($this->request->parent_id)) {
            $parentFolder = Folder::firstWhere('id', $this->request->parent_id);

            $generatedFolderPath = (new FolderHelper)->generateFolderPath(
                $this->request->user_id,
                $parentFolder->path
            );
        } else {
            $generatedFolderPath = (new FolderHelper)->generateFolderPath($this->request->user_id);
        }

        try {
            Storage::makeDirectory($generatedFolderPath);
        } catch (\Exception $e) {
            Log::error($e->getMessage(), $this->request->all());
            abort(400, 'Une erreur est survenue lors de la création du dossier.');
        }

        try {
            Folder::query()
                ->create([
                    'path' => $generatedFolderPath,
                    'user_id' => $this->request->user_id,
                    'parent_id' => $this->request->parent_id,
                    'name' => $this->request->name,
                    'size' => 0
                ]);
        } catch (\Exception $e) {
            Log::error($e->getMessage(), $this->request->all());
            Storage::deleteDirectory($generatedFolderPath);
            abort(400, 'Une erreur est survenue lors de la création du dossier.');
        }
    }
}
