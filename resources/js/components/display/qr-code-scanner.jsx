import { Html5Qrcode } from 'html5-qrcode';
import { useEffect, useRef } from 'react';

const QRCodeScanner = ({ onScanSuccess }) => {
    const scannerRef = useRef(null);
    const scannerId = 'qr-reader';

    useEffect(() => {
        const html5QrCode = new Html5Qrcode(scannerId);
        scannerRef.current = html5QrCode;

        html5QrCode
            .start(
                { facingMode: 'environment' },
                {
                    fps: 10,
                    qrbox: { width: 250, height: 250 },
                },
                (decodedText) => {
                    onScanSuccess(decodedText);

                    // Optional: stop after first scan
                    html5QrCode
                        .stop()
                        .then(() => html5QrCode.clear())
                        .catch((err) => console.warn('Scanner stop error:', err));
                },
                (errorMessage) => {
                    // Ignore scan failure errors (happen frequently)
                },
            )
            .catch((err) => {
                console.error('QR scanner init failed:', err);
            });

        return () => {
            // Cleanup scanner when component unmounts (e.g., modal closes)
            if (scannerRef.current) {
                scannerRef.current
                    .stop()
                    .then(() => scannerRef.current.clear())
                    .catch((err) => console.warn('Cleanup error (already removed?):', err.message));
            }
        };
    }, [onScanSuccess]);

    return <div id={scannerId} style={{ width: '300px', height: '300px' }} />;
};

export default QRCodeScanner;
