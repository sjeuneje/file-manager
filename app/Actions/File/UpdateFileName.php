<?php

namespace App\Actions\File;

use App\Actions\BaseActionInterface;
use App\Http\Requests\UpdateFileNameRequest;
use App\Models\File\File;

class UpdateFileName implements BaseActionInterface
{
    private UpdateFileNameRequest $request;

    public function __construct(UpdateFileNameRequest $request)
    {
        $this->request = $request;
    }

    public function execute(): void
    {
        $file = File::query()
            ->firstWhere([
                'id' => $this->request->id,
                'user_id' => $this->request->user_id,
            ]);

        abort_if(is_null($file), 404, 'Fichier non trouvé.');

        $fileExtension = substr($file->name, strrpos($file->name, '.'), strlen($file->name) - 1);

        $file->name = $this->request->name . $fileExtension;
        $file->save();
    }
}
