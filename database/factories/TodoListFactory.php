<?php

use App\TodoItem;
use Faker\Generator as Faker;

$factory->define(TodoItem::class, function ($faker) {
    return [
        'title' => $faker->name,
        'isFinished' => $faker->boolean
    ];
});
