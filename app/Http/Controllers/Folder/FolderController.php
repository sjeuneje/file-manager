<?php

namespace App\Http\Controllers\Folder;

use App\Http\Controllers\Controller;
use App\Http\Requests\Folder\StoreNewFolderRequest;
use App\Models\Folder\Folder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class FolderController extends Controller
{
    /**
     * List all folders of the logged user.
     *
     * @return Response
     */
    public function index(): Response
    {
        return Inertia::render('Dashboard', [
            'folders' => Folder::whereUserRoot(Auth::user()->id)
                ->with('owner')
                ->get()
        ]);
    }


    /**
     * Store a new folder in the storage.
     *
     * @param StoreNewFolderRequest $request
     * @return RedirectResponse
     */
    public function store(StoreNewFolderRequest $request)
    {
        if (!$request->parent_id) {
            $generatedFolderPath = 'folders' . '/' . $request->user_id . '/' . Str::random();

            try {
                Storage::makeDirectory($generatedFolderPath);
            } catch (\Exception $e) {
                Log::error($e->getMessage(), $request->all());
                abort(400, 'Une erreur est survenue lors de la création du dossier.');
            }

            try {
                Folder::query()
                    ->create([
                        'path' => $generatedFolderPath,
                        'user_id' => $request->user_id,
                        'parent_id' => $request->parent_id,
                        'name' => $request->name,
                        'size' => 0
                    ]);
            } catch (\Exception $e) {
                Log::error($e->getMessage(), $request->all());
                Storage::deleteDirectory($generatedFolderPath);
                abort(400, 'Une erreur est survenue lors de la création du dossier.');
            }
        }

        return redirect()->back()->with([
            'message' => 'Dossier créé avec succès.'
        ]);
    }

    /**
     * Destroy the given folder from the storage.
     *
     * @param Request $request
     * @return RedirectResponse
     */
    public function destroy(Request $request)
    {
        Folder::query()
            ->firstWhere($request->id)
            ->delete();

        return redirect()->back([
            'message' => 'Dossier supprimé avec succès.'
        ]);
    }
}
