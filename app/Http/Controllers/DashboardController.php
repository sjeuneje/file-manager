<?php

namespace App\Http\Controllers;

use App\Helpers\Folder\FolderHelper;
use App\Models\File\File;
use App\Models\Folder\Folder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request): \Inertia\Response
    {
        return Inertia::render('Dashboard', [
            'folders' => Folder::where('user_id', Auth::user()->id)
                ->with('owner')
                ->when(!empty($request->parent_id), function ($q) use ($request) {
                    $q->where('parent_id', '=', $request->parent_id);
                })
                ->when(empty($request->parent_id), function ($q) use ($request) {
                    $q->whereNull('parent_id');
                })
                ->orderBy('created_at', 'desc')
                ->get()
                ->map(function ($folder) {
                    $folder->size = (new FolderHelper())->getFolderSize($folder);
                    return $folder;
                }),
            'files' => File::where('user_id', Auth::user()->id)
                ->with('owner')
                ->when(!empty($request->parent_id), function ($q) use ($request) {
                    $q->where('parent_id', '=', $request->parent_id);
                })
                ->when(empty($request->parent_id), function ($q) use ($request) {
                    $q->whereNull('parent_id');
                })
                ->orderBy('created_at', 'desc')
                ->get(),
        ]);
    }
}
