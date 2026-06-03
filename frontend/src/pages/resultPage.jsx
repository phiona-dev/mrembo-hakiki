import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import Badge from '../components/Badge';

const ResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { product } = location.state || {};

  console.log("Locations state: ", location.state)
  console.log("Product: ", product)

  if (!product){
    return <div>
      No product. <button onClick={() => navigate("/scan")}>Go to scan</button>
    </div>
  }


  return (
    <div>
      <h3>Result</h3>
      <h2>{product?.name ? product.name : "Unknown Product"}</h2>
      <p>{product?.brand ? product.brand : "Unknown Brand"}</p>
      <p>{product?.barcode ? product.barcode : "No barcode available"}</p>
      <p>{product?.is_counterfeit ? <Badge type="counterfeit"/> : <Badge type="genuine" />}</p>
      <h6>Evidence</h6>
      <p>{product?.notes ? product.notes : "No evidence provided"}</p>

      <button onClick={() => navigate("/scan")}>Scan another</button>
      <button onClick={() => navigate("/demo")}>Demo</button>
    </div>
  )
}

export default ResultPage