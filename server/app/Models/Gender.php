<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
class Gender extends Model
{
    use HasFactory, Notifiable;
    protected $table = 'tbl_genders';

    protected $primaryKey = 'gender_id';

    protected $fillable = [
        'gender'
    ];

    public function users(): HasMany {
        return $this->hasMany(User::class, 'gender_id', 'gender_id');
    }


}

