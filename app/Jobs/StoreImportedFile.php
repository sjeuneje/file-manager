<?php

namespace App\Jobs;

use App\Models\File\File;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\UploadedFile;

class StoreImportedFile implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    private File $file;
    private string $tempFilePath;

    /**
     * Create a new job instance.
     */
    public function __construct(File $file, string $tempFilePath)
    {
        $this->file = $file;
        $this->tempFilePath = $tempFilePath;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        try {
            Storage::move($this->tempFilePath, $this->file->path);
        } catch (\Exception $e) {
            Storage::delete($this->tempFilePath);
            $this->file->forceDelete();
            Log::error('Error storing imported file', [
                'message' => $e->getMessage(),
                'file_id' => $this->file->id,
                'path' => $this->file->path,
            ]);
        }
    }
}
