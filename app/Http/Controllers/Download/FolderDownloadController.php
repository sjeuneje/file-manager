<?php

namespace App\Http\Controllers\Download;

use App\Helpers\Folder\FolderHelper;
use App\Helpers\ZipHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\DownloadFolderRequest;
use App\Models\Folder\Folder;
use App\Services\Folder\FolderDownloadService;
use Symfony\Component\HttpFoundation\BinaryFileResponse;

class FolderDownloadController extends Controller
{
    private FolderDownloadService $folderDownloadService;

    public function __construct(FolderHelper $folderHelper, ZipHelper $zipHelper)
    {
        $this->folderDownloadService = new FolderDownloadService(
            $folderHelper,
            $zipHelper
        );
    }

    /**
     * Download a folder and its contents directly.
     *
     * @param DownloadFolderRequest $request
     * @return BinaryFileResponse
     */
    public function download(DownloadFolderRequest $request): BinaryFileResponse
    {
        $folder = Folder::findOrFail($request->id);

        return response()->download(
            $this->folderDownloadService->downloadZip($folder)
        )->deleteFileAfterSend(true);
    }
}
