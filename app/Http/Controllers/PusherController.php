<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Queue\SerializesModels;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class PusherController implements ShouldBroadcast
{
  use Dispatchable, InteractsWithSockets, SerializesModels;

  public $message;
  public $channel;

  public function __construct($message, $receiver_id, $sender_id)
  {
      $this->message = $message;
      $this->channel = ['channel-'.$receiver_id.'-'.$sender_id];
  }

  public function broadcastOn()
  {
    return $this->channel;
  }

  public function broadcastAs()
  {
      return 'new-message';
  }
}
