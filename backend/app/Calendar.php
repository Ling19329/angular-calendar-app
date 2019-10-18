<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;
class Calendar extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title', 'description', 'updated_at', 'created_at'
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [];

    public function users()
    {
        return $this->belongsToMany('App\User', 'user_calendars')->withTimestamps();;
    }
}
