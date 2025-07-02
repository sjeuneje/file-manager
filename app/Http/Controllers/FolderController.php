<?php

namespace App\Http\Controllers;

use App\Helpers\Folder\FolderHelper;
use App\Http\Requests\Folder\StoreNewFolderRequest;
use App\Http\Requests\UpdateFolderRequest;
use App\Models\Folder\Folder;
use App\Services\Folder\FolderService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FolderController extends Controller
{
    private FolderService $folderService;

    public function __construct()
    {
        $this->folderService = new FolderService(new FolderHelper());
    }

    /**
     * Store a new folder in the storage.
     *
     * @param StoreNewFolderRequest $request
     * @return RedirectResponse
     */
    public function store(StoreNewFolderRequest $request): RedirectResponse
    {
        $this->folderService->create(
            $request->name,
            $request->user_id,
            $request->parent_id
        );

        return redirect()->back()->with([
            'message' => 'Dossier créé avec succès.'
        ]);
    }

    /**
     * Update an existing folder in the storage
     *
     * @param UpdateFolderRequest $request
     * @return RedirectResponse
     */
    public function update(UpdateFolderRequest $request): RedirectResponse
    {
        $this->folderService->rename(
            $request->id,
            $request->name
        );

        return redirect()->back()->with([
            'message' => 'Dossier modifié avec succès.'
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
        $folder = Folder::query()
            ->firstWhere([
                'id' => $request->id,
                'user_id' => $request->user_id
            ]);

        if (!$folder) {
            return redirect()->back()->withErrors([
                'errors' => [
                    'Dossier non trouvé.'
                ]
            ]);
        }

        $folder->delete();

        return redirect()->back()->with([
            'message' => 'Dossier supprimé avec succès.',
            'folders' => Folder::whereUserRoot(Auth::user()->id)
                ->with('owner')
                ->get()
        ]);
    }
}
