<?php

namespace App\Http\Controllers\File;

use App\Actions\File\DispatchImportedFiles;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreFilesRequest;
use Illuminate\Http\Request;

class FileController extends Controller
{
    public function store(StoreFilesRequest $request)
    {
        (new DispatchImportedFiles(
            $request->allFiles()['files'],
            $request->parent_id,
            $request->user_id
        ))->execute();

        return redirect()->back()->with([
            'message' => 'Vos fichiers sont en cours d\'importation.'
        ]);
    }
}
