import { useState } from 'react';
import getProduct from '../services/api';
import { useNavigate } from "react-router-dom";
import ProductSkeleton from '../components/ProductSkeleton';

const ScanPage = () => {
  const navigate = useNavigate();
  const [barcode, setBarcode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCheckProduct = async (e) => {
    e.preventDefault();

    if (!barcode.trim()) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await getProduct(barcode);

      //console.log("Product data received:", response)
      
      navigate(`/result/${barcode}`, { state: { product: response } })
    } catch(error) {
      setError(error.message)
      setIsLoading(false);
    }
  }
  return (
      <div>
        <form onSubmit={handleCheckProduct}>
          <input value={barcode} onChange={(e) => setBarcode(e.target.value)}placeholder="Enter barcode" disabled={isLoading}/>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : "Submit"}
          </button>
          
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
        {isLoading && <ProductSkeleton/>}
      </div>
  )
}

export default ScanPage