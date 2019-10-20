<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;
class UserCalendar extends Model
{
    protected $table = 'users_calendars';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id', 'user_id', 'calendar_id', 'updated_at', 'created_at'
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
