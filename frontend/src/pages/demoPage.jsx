import demoData from "../data/demoProducts.json";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";

const DemoPage = () => {
  const navigate = useNavigate();

  const demoProducts = demoData.products;

  const genuineProduct = demoProducts.find(p => p.id === "demo_001");
  const counterfeitProduct = demoProducts.find(p => p.id === "demo_006");

  const handleCardClick = (product) => {
    navigate(`/result/${product.barcode}`, { state: { product } });
  }

  return (
    <div style={{ padding: "20px", maxWidth: "1400px", margin: "0 auto" }}>
    {/*Header section */}
      <div>
        <h1>Demo Mode</h1>
        <h2>Try Before You Scan</h2>
        <p>These are example products. Click any to see how Mrembo Hakiki works.</p>
        <button onClick={() => navigate("/scan")}>Try Scanning a real product instead.</button>
      </div>

      {/*Quick actions section */}
      <div style={{ margin: "20px 0", display: "flex", gap: "12px" }}>
        <button onClick={() => handleCardClick(genuineProduct)}>Try Genuine Product</button>
        <button onClick={() => handleCardClick(counterfeitProduct)}>Try Counterfeit Product</button>
      </div>
      
      {/*Instructions section */}
      <div>
        <h4>How to use this app.</h4>
        <ol>
          <li>Browse products below</li>
          <li>Click any card to see result</li>
          <li>Compare genuine vs counterfeit flags.</li>
        </ol>
      </div>

      {/*demo count*/}
      <p>{demoProducts.length} demo products available. Click any to try.</p>


      {/*cards grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px", padding: "20px 0" }}>
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

      {/*call to action section */}
      <div style={{ marginTop: "40px", padding: "20px", backgroundColor: "#f0f9ff", borderRadius: "12px", textAlign: "center" }}>
        <p>Ready to scan a real product</p>
        <button style={{ backgroundColor: "#a4c0ed", color: "white", padding: "12px 12px", border: "none", borderRadius: "8px", fontSize: "16px", cursor: "pointer" }}
        onClick={() => navigate("/scan")}
        >Go to Scanner</button>
      </div>
    </div>
    
  )
}

export default DemoPage