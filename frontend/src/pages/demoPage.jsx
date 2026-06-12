import demoData from "../data/demoProducts.json";
import Card from "../components/Card";
import { Link, useNavigate } from "react-router-dom";

const DemoPage = () => {
  const navigate = useNavigate();

  const demoProducts = demoData.products;

  const handleCardClick = (product) => {
    navigate("/result/${barcode}", { state: { product } });
  }

  return (
    <div>
      <div>
        <h1>Demo Mode</h1>
        <h2>Try Before You Scan</h2>
        <p>These are example products. Click any to see how Mrembo Hakiki works.</p>
        <Link to="/scan">Try Scanning a real product instead.</Link>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px", padding: "20px" }}>
        {demoProducts.map(product => (
          <Card 
          key={product.id}
          name={product.name}
          brand={product.brand}
          barcode={product.barcode}
          category={product.category}
          is_counterfeit={product.is_counterfeit}
          notes={product.notes}
          onClick={() => handleCardClick(product)}
          />
        ))}
      </div>
    </div>
    
  )
}

export default DemoPage