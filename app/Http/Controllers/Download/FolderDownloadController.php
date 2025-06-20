<?php

namespace App\Http\Controllers\Download;

use App\Helpers\Folder\FolderHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\DownloadFolderRequest;
use App\Models\Folder\Folder;

class FolderDownloadController extends Controller
{
    /**
     * Download a folder and its contents directly.
     *
     * @param DownloadFolderRequest $request
     */
    public function download(DownloadFolderRequest $request)
    {
        $folder = Folder::firstWhere('id', $request->id);

        if (!$folder) abort(404, 'Folder not found.');

        dd($folder);
    }
}
