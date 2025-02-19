<?php

namespace App\Http\Controllers;

use App\Helpers\Folder\FolderHelper;
use App\Models\Folder\Folder;
use Illuminate\Http\Request;

class TestController
{
    public function test(Request $request)
    {
        $folder = Folder::firstWhere('id', $request->id);

        return response()->json((new FolderHelper)->getFolderSize($folder));
    }
}
