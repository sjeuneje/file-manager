<?php

namespace App\Http\Controllers;

use App\Http\Requests\DownloadFolderRequest;
use Illuminate\Http\Request;

class DownloadController extends Controller
{
    /**
     * Download all subfolders from the given parent folder.
     *
     * @param DownloadFolderRequest $request
     * @return void
     */
    public function downloadFolder(DownloadFolderRequest $request)
    {

    }
}
