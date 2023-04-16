<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\MessageRequest;
use App\Models\Message;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(MessageRequest $request)
    {
        //
        $sender_id = Auth::id();
        $receiver_id = $request->input('receiver_id');
        $data = $request->input('data');
        $current_timestamp = Carbon::now()->timestamp;
        $query = array('sender_id' => $sender_id, "receiver_id" => $receiver_id, "data" => $data, 'created_at' => $current_timestamp);
        $result = DB::table('messages')->insertGetId($query);
        $newMessageData = [
            'id'=> $result,
            'sender_id'=> $sender_id,
            'receiver_id'=> $receiver_id,
            'data'=> $data,
            'created_at'=> $current_timestamp,
        ];
        event(new PusherController($newMessageData, $receiver_id, $sender_id));
        return response($newMessageData, 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Message $message)
    {
        //
    }

    public function showAllMessages(int $receiver_id)
    {
        $sender_id = Auth::id();
        $sentConditions = [
            ['sender_id', '=', $sender_id],
            ['receiver_id', '=', $receiver_id]
        ];
        $receivedConditions = [
            ['sender_id', '=', $receiver_id],
            ['receiver_id', '=', $sender_id]
        ];
        $messages = DB::table('messages')
            ->select('*')
            ->where($sentConditions)
            ->orWhere($receivedConditions)
            ->get();
        //return response('AAAAA', 200);
        return response($messages, 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Message $message)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Message $message)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Message $message)
    {
        //
    }
}
