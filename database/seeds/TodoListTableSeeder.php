<?php

use App\TodoItem;
use Illuminate\Database\Seeder;

class TodoListTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(TodoItem::class)->times(50)->create();
    }
}
