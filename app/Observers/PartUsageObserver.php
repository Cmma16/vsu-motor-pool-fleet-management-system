<?php

namespace App\Observers;
use App\Services\PartStockService;

class PartUsageObserver
{
    protected $stockService;

    public function __construct(PartStockService $stockService)
    {
        $this->stockService = $stockService;
    }

    public function created($model)
    {
        $this->stockService->decreaseStock($model->part_id, $model->quantity_used);
    }

    public function updated($model)
    {
        if ($model->isDirty('quantity_used')) {
            $originalQty = $model->getOriginal('quantity_used');
            $newQty = $model->quantity_used;
            $this->stockService->adjustStock($model->part_id, $originalQty, $newQty);
        }
    }

    public function deleted($model)
    {
        $this->stockService->increaseStock($model->part_id, $model->quantity_used);
    }
}
