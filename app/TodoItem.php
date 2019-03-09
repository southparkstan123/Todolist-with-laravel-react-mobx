<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TodoItem extends Model
{
    protected $fillable = [
        'title', 'isFinished'
    ];

    protected $table = 'todo_list';
}
