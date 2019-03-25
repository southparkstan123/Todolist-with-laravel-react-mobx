<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\TodoItem;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class TodoItemController extends Controller
{
    public function fetchAllItems(){
        $items = TodoItem::orderBy('updated_at', 'desc')->get();
        return $items;
    }

    public function createItem(Request $request){
        $validator = Validator::make($request->all(), [
            'title' => 'required|unique:todo_list|max:255'
        ]);

        if($validator->fails()){
            $status = [
                'code' => 400,
                'title' => 'Item cannot be created',
                'errors' => $validator->errors()
            ];
            return response()->json($status, 400);
        }else{

            $todo = new TodoItem();
            $todo->title = $request->title;
            $todo->isFinished = $request->isFinished;
    
            if($todo->save()){
                $status = [
                    'code' => 201,
                    'title' => 'Item created',
                    'item' => $todo
                ];
                return response()->json($status, 201);
            } else {
                $status = [
                    'message' => 'Item cannot be created',
                ];
                return response()->json($status, 500);
            }
        }
    }

    public function updateItem($id, Request $request){
        $validator = Validator::make($request->all(), [
            'title' => [
                'required',
                Rule::unique('todo_list')->ignore($id),
                'max:255'
            ]
        ]);

        if($validator->fails()){
            $status = [
                'code' => 400,
                'title' => 'Item cannot be updated',
                'errors' => $validator->errors()
            ];
            return response()->json($status, 400);
        } else {   
            $todo = TodoItem::findOrFail($id);
            $todo->title =  $request->title;
            $todo->isFinished = $request->isFinished;
            $todo->save();
            $status = [ 
                'code' => 200,
                'title' => 'Item Updated',
                'item' => $todo
            ];
            return response()->json($status, 200);
        }
    }

    public function deleteItem($id){
        $result = TodoItem::find($id);
        
        if($result->delete()){
            $status = [
                'code' => 200,
                'title' => 'Item deleted'
            ];
            return response()->json($status, 200);
        } else if($result === null){
            $status = [
                'code' => 404,
                'title' => 'Item not found'
            ];
            return response()->json($status, 404);
        } else{
            $status = [
                'code' => 500,
                'title' => 'Item cannot be deleted'
            ];
            return response()->json($status, 500);
        }
    }
}
