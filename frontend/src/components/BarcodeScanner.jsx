import { useEffect, useRef } from "react";
import { Html5QrcodeScanner, Html5QrcodeSupportedFormats } from "html5-qrcode";
import "../styles/barcodeScanner.css";

const BarcodeScanner = ({ opened, onDetected, onClose }) => {
    const scannerRef = useRef(null);
    const mountId = "html5qr-reader";

    useEffect(() => {
        if (!opened) return;
        
        let isMounted = true;
        let scannerInstance = null;

        // 1. We delay setup slightly (50ms) to let React Strict Mode unmounting finish first
        const initTimer = setTimeout(() => {
          if (!isMounted) return;

          const container = document.getElementById(mountId);
          if (!container) return;
          
          // Force clear any leftover UI elements
          container.innerHTML = "";

          try {
            scannerInstance = new Html5QrcodeScanner(
              mountId,
              {
                fps: 4,
                qrbox: { width: 260, height: 120 },
                aspectRatio: 1.777778,
                formatsToSupport: [
                  Html5QrcodeSupportedFormats.QR_CODE,
                  Html5QrcodeSupportedFormats.EAN_13,
                  Html5QrcodeSupportedFormats.EAN_8,
                  Html5QrcodeSupportedFormats.UPC_A,
                  Html5QrcodeSupportedFormats.UPC_E,
                  Html5QrcodeSupportedFormats.CODE_128
                ]
              },
              false
            );

            scannerRef.current = scannerInstance;

            scannerInstance.render(
              (decodedText) => {
                if (isMounted) onDetected(decodedText);
              },
              (error) => {}
            );
          } catch (err) {
            console.error("Failed to initialize scanner:", err);
          }
        }, 50);

        // 2. Synchronous cleanup safely handles fast React mounts/unmounts
        return () => {
          isMounted = false;
          clearTimeout(initTimer);

          if (scannerRef.current) {
            const tempScannerRef = scannerRef.current;
            scannerRef.current = null; 
            tempScannerRef.clear().catch(() => {});
          }
        };

    }, [opened, onDetected]);

    if (!opened) return null;

    return (
      <div className="overlay">
        <div className="modal">
          <h3 className="title">Scan Barcode / QR</h3>
          
          <div id={mountId} style={{ width: "100%", minHeight: "320px" }} />

          <div className="footer">
            <p className="tip">
              Tip: Center the barcode in the rectangle and ensure good lighting.
            </p>
            <button
              type="button"
              className="closeButton"
              onClick={() => {
                if (scannerRef.current) {
                  const tempScannerRef = scannerRef.current;
                  scannerRef.current = null;
                  
                  tempScannerRef.clear()
                    .catch(() => {})
                    .finally(() => onClose());
                } else {
                  onClose();
                }
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
};

export default BarcodeScanner;