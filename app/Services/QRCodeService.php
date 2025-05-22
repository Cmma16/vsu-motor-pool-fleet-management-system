<?php

namespace App\Services;

use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Storage;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class QRCodeService
{
    public function generateAndStore($assetTag)
    {
        $encrypted = Crypt::encryptString($assetTag);
        $qrImage = QrCode::format('png')->size(600)->generate($encrypted);
        $fileName = 'qr-codes/' . $assetTag . '.png';

        Storage::disk('public')->put($fileName, $qrImage);

        return 'storage/' . $fileName;
    }

    public function decrypt($encryptedValue)
    {
        return Crypt::decryptString($encryptedValue);
    }
}
