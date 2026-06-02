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
      <h2>Result</h2>
      <h4>{product?.name}</h4>
      <p>{product?.brand}</p>
      <p>{product?.barcode}</p>
      <p>{product?.is_counterfeit ? <Badge type="counterfeit"/> : <Badge type="genuine" />}</p>
      <h6>Evidence</h6>
      <p>{product?.notes}</p>

      <button onClick={() => navigate("/scan")}>Scan another</button>
      <button onClick={() => navigate("/demo")}>Demo</button>
    </div>
  )
}

export default ResultPage