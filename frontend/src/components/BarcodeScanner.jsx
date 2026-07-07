import { useEffect, useRef } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const BarcodeScanner = ({ onDetected, onClose }) => {

    const scannerRef = useRef(null);
    const mountId = "html5qr-reader";

    useEffect(() => {
        if (!mountId) return;
        
        const scanner = new Html5QrcodeScanner(
          mountId,
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          },
          false
        )

        scanner.render(
          (decodedText) => {
            onDetected(decodedText)
            onClose()
          },
          (error) => {
            console.warn("Scanner error", error)
          }
        )

        scannerRef.current = scanner;

        return () => {
          if (scannerRef.current) {
            scannerRef.current.clear().catch((err) => {
              console.error("Failed to clear scanner", err);
            })
            scannerRef.current = null;
          }
        }

    }, [onDetected, onClose])

  return (
    <div id={mountId} style={{ width: "100%", minHeight: "320px" }} />
  )
}

export default BarcodeScanner