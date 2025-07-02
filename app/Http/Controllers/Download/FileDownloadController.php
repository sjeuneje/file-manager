<?php

namespace App\Http\Controllers\Download;

use App\Helpers\ZipHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\DownloadFileRequest;
use App\Models\File\File;
use App\Services\File\FileDownloadService;
use App\Services\Folder\FolderDownloadService;
use Illuminate\Http\Request;

class FileDownloadController extends Controller
{
    private FileDownloadService $fileDownloadService;

    public function __construct(ZipHelper $zipHelper)
    {
        $this->fileDownloadService = new FileDownloadService($zipHelper);
    }

    public function download(DownloadFileRequest $request)
    {
        $file = File::findOrFail($request->id);

        return response()->download(
            $this->fileDownloadService->downloadZip($file)
        )->deleteFileAfterSend(true);
    }
}
