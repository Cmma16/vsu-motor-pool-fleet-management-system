<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Notification;


class DeleteOldNotifications extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'notifications:cleanup';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Delete read notifications older than 90 days';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $cutoffDate = now()->subDays(90);
        \Log::info('[DeleteOldNotifications] Cleanup command triggered at ' . now());
        $deleted = Notification::where('is_read', true)
            ->where('created_at', '<', $cutoffDate)
            ->delete();

        $this->info("Deleted {$deleted} read notifications older than 90 days.");
    }
}
