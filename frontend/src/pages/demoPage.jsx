import demoData from "../data/demoProducts.json";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";

const DemoPage = () => {
  const navigate = useNavigate();

  const demoProducts = demoData.products;

  const handleCardClick = (product) => {
    navigate("/result/${barcode}", { state: { product } });
  }

  return (
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
  )
}

export default DemoPage