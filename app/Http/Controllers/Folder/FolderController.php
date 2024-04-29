<?php

namespace App\Http\Controllers\Folder;

use App\Http\Controllers\Controller;
use App\Models\Folder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class FolderController extends Controller
{
    public function index(): Response
    {
        $folders = Folder::whereUserRoot(Auth::user()->id)
            ->with('owner')
            ->get();

        return Inertia::render('Dashboard', [
            'folders' => $folders
        ]);
    }
}
