<?php

namespace App\Http\Controllers\Api;

use App\Models\Tenant;
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
        $currentTenant = request()->getHttpHost();
        // Replacing : with ; because pusher doesn't support : in channel names
        $currentTenant = str_replace(":", ";", $currentTenant);
        // Changing to lower case because Pusher is case sensitive
        $currentTenant = strtolower($currentTenant);
        $this->message = $message;
        $this->channel = [$currentTenant.'-' . $receiver_id . '-' . $sender_id];
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
