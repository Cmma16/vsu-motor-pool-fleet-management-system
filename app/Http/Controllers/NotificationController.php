<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Notification;

class NotificationController extends Controller
{
    public function index(Request $request) 
    {
        $limit = $request->input('limit', 5);
        return Notification::where('user_id', auth()->user()->id)->orderBy('created_at', 'desc')->take($limit)->get();
    }

    public function markAsRead(Notification $notification)
    {
        $notification->update(['is_read' => true]);
        return response()->json(['message' => 'Notification marked as read']);
    }
}
