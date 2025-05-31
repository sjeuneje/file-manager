<?php

namespace App\Http\Controllers;

use App\Actions\File\DispatchImportedFiles;
use App\Actions\File\UpdateFileName;
use App\Http\Requests\StoreFilesRequest;
use App\Http\Requests\UpdateFileNameRequest;
use App\Models\File\File;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class FileController extends Controller
{
    /**
     * Store a new file to the storage.
     *
     * @param StoreFilesRequest $request
     * @return RedirectResponse
     */
    public function store(StoreFilesRequest $request): RedirectResponse
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

    public function updateName(UpdateFileNameRequest $request)
    {
        (new UpdateFileName($request))->execute();

        return redirect()->back()->with([
            'message' => 'Dossier modifié avec succès.'
        ]);
    }

    /**
     * Soft delete a selected file from the storage.
     *
     * @param Request $request
     * @return RedirectResponse
     */
    public function softDelete(Request $request): RedirectResponse
    {
        $file = File::query()
            ->firstWhere([
                'id' => $request->id,
                'user_id' => $request->user_id
            ]);

        if (!$file) {
            return redirect()->back()->withErrors([
                'errors' => [
                    'Fichier non trouvé.'
                ]
            ]);
        }

        $file->delete();

        return redirect()->back()->with([
            'message' => 'Dossier supprimé avec succès.',
            'files' => File::query()
                ->when(!empty($request->parent_id), function ($q) use ($request) {
                    $q->where('parent_id', '=', $request->parent_id);
                })
                ->when(empty($request->parent_id), function ($q) use ($request) {
                    $q->whereNull('parent_id');
                })
                ->with('owner')
                ->get()
        ]);
    }
}
