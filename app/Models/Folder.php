<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Folder extends Model
{
    protected $table = 'folders';

    protected $fillable = [
        'user_id',
        'parent_id',
        'name',
        'path',
        'size',
        'created_at',
        'updated_at'
    ];

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

    public function scopeNameExist($q, int $userId, ?int $parentId, string $name)
    {
        return $q
            ->where('user_id', $userId)
            ->where('parent_id', $parentId)
            ->where('name', $name)
            ->exists();
    }
}
