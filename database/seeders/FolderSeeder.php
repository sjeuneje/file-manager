<?php

namespace Database\Seeders;

use App\Models\Folder\Folder;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class FolderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 0; $i < 10; $i++) {
            Folder::create([
                'name' => Str::random(8)
            ]);
        }
    }
}
