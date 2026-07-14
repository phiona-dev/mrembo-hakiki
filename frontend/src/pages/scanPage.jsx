import { useState, useCallback } from 'react';
import getProduct from '../services/api';
import { useNavigate } from "react-router-dom";
import ProductSkeleton from '../components/ProductSkeleton';
import BarcodeScanner from '../components/BarcodeScanner';

const ScanPage = () => {
  const navigate = useNavigate();
  const [barcode, setBarcode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isScannerOpen, setIsScannerOpen] = useState(false)

  //helper function to handle api call and navigation logic
  const fetchProductAndNavigate = async (codeToSearch) => {
    if (!codeToSearch.trim()) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await getProduct(codeToSearch);
      navigate(`/result/${codeToSearch}`, { state: { product: response } })
    } catch (error) {
      setError(error.message)
      setIsLoading(false);
    }
  }

  const handleCheckProduct = (e) => {
    e.preventDefault();
    fetchProductAndNavigate(barcode)
  }

  const handleRetry = () => {
    fetchProductAndNavigate(barcode)
  }

  const handleDetected = useCallback((detectedBarcode) => {
    console.log("CAMERA CAUGHT THIS CODE:", detectedBarcode)
    setBarcode(detectedBarcode);
    
    fetchProductAndNavigate(detectedBarcode) //immediately lookup the detected barcode
  }, [])

  const handleScannerToggle = (e) => {
    if (e) {
      e.preventDefault()
    }
    setIsScannerOpen((prev) => !prev);
  }


  return (
      <div>
        <form onSubmit={handleCheckProduct}>
          <input value={barcode} onChange={(e) => setBarcode(e.target.value)} placeholder="Enter barcode" disabled={isLoading}/>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Submit"}
          </button>
          <button type="button" onClick={handleScannerToggle} >
            {isScannerOpen ? "Close Scanner" : "Scan Barcode"}
          </button>
          
          {error &&  (
            <div>
              <p style={{ color: "red" }}>{error}</p>
              {error.includes("Product not found") ? (
                <button onClick={() => navigate("/demo")}>Try Demo mode</button>
              ) : (
                <button onClick={() => handleRetry(barcode)} disabled={isLoading}>Retry</button>
              )}
            </div>
          )}
        </form>

        {isScannerOpen && (
          <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "10px" }}>
            <BarcodeScanner
              opened={isScannerOpen}
              onDetected={handleDetected}
              onClose={() => setIsScannerOpen(false)}
            />
          </div>
        )}
        
        {isLoading && <ProductSkeleton/>}
      </div>
  )
}

export default ScanPage