<?php

namespace App\Models\File;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class File extends Model
{
    use SoftDeletes;

    protected $table = 'files';

    protected $fillable = [
        'user_id',
        'parent_id',
        'name',
        'path',
        'size',
        'created_at',
        'updated_at'
    ];

    // Relations

    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function scopeWhereUserRoot($q, int $userId)
    {
        return $q
            ->whereNull('parent_id')
            ->where('user_id', $userId);
    }
}
