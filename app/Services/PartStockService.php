<?php

namespace App\Services;

use App\Models\Part;

class PartStockService
{
    public function decreaseStock($partId, $quantity)
    {
        $part = Part::findOrFail($partId);
        $part->decrement('stock_quantity', $quantity);
    }

    public function increaseStock($partId, $quantity)
    {
        $part = Part::findOrFail($partId);
        $part->increment('stock_quantity', $quantity);
    }

    public function adjustStock($partId, $oldQty, $newQty)
    {
        $difference = $newQty - $oldQty;
        $part = Part::findOrFail($partId);

        if ($difference > 0) {
            $part->decrement('stock_quantity', $difference);
        } elseif ($difference < 0) {
            $part->increment('stock_quantity', abs($difference));
        }
    }
}
