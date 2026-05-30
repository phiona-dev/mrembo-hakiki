import { useState } from 'react';
import getProduct from '../services/api';
import { useNavigate } from "react-router-dom";

const ScanPage = () => {
  const navigate = useNavigate();
  const [barcode, setBarcode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleCheckProduct = async (e) => {
    e.preventDefault();

    if (!barcode.trim()) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await getProduct(barcode);
      if(response.ok){
        navigate(`/result/${barcode}`, { state: { product: response.data } })
      }
    } catch(error) {
      setError(error)
      setIsLoading(false);
    }
  }
  return (
      <form onSubmit={handleCheckProduct}>
        <input value={barcode} onChange={(e) => setBarcode(e.target.value)}placeholder="Enter barcode" disabled={isLoading}/>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Submit"}
        </button>
        
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
  )
}

export default ScanPage