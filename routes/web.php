<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Download\FileDownloadController;
use App\Http\Controllers\Download\FolderDownloadController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\FolderController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect('/dashboard');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::prefix('dashboard')->group(function () {
        Route::get('', [DashboardController::class, 'index'])->name('dashboard');
        Route::get('trash', [DashboardController::class, 'trash'])->name('dashboard.trash');

        Route::prefix('folders')->group(function () {
            Route::post('', [FolderController::class, 'store'])->name('dashboard.folders.create');
            Route::delete('', [FolderController::class, 'destroy'])->name('dashboard.folders.delete');
            Route::patch('', [FolderController::class, 'update'])->name('dashboard.folders.update');
        });

        Route::prefix('files')->group(function () {
            Route::post('', [FileController::class, 'store'])
                ->name('dashboard.files.create')
                ->middleware('throttle:10,1');

            Route::patch('name', [FileController::class, 'updateName'])->name('dashboard.files.update_name');

            Route::delete('', [FileController::class, 'softDelete'])->name('dashboard.files.soft_delete');
        });

        Route::prefix('download')->group(function () {
            Route::get('folder', [FolderDownloadController::class, 'download'])->name('download.folder');
            Route::get('file', [FileDownloadController::class, 'download'])->name('download.file');
        });
    });
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
