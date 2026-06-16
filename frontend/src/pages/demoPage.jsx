import demoData from "../data/demoProducts.json";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";
import "../styles/DemoPage.css"

const DemoPage = () => {
  const navigate = useNavigate();

  const demoProducts = demoData.products;

  const genuineProduct = demoProducts.find(p => p.id === "demo_001");
  const counterfeitProduct = demoProducts.find(p => p.id === "demo_006");

  const handleCardClick = (product) => {
    navigate(`/result/${product.barcode}`, { state: { product } });
  }

  return (
    <div className="DemoContainer">
    {/*Header section */}
      <div className="demoHeader">
        <h1 className="demoTitle">Demo Mode</h1>
        <h2 className="demoSubtitle">Try Before You Scan</h2>
        <p className="demoDescription">These are example products. Click any to see how Mrembo Hakiki works.</p>
        <button className="backLink" onClick={() => navigate("/scan")}>Try Scanning a real product instead.</button>
      </div>

      {/*Quick actions section */}
      <div className="quickActions">
        <div className="quickActionsTitle">Quick Examples</div>
        <div className="quickActionsButtons">
          <button className="quickBtn quickBtnGenuine" onClick={() => handleCardClick(genuineProduct)}>Try Genuine Product</button>
          <button className="quickBtn quickBtnCounterfeit" onClick={() => handleCardClick(counterfeitProduct)}>Try Counterfeit Product</button>
        </div>
      </div>
      
      {/*Instructions section */}
      <div className="instructions">
        <div className="instructionsTitle">
          <h4>How to use this app.</h4>
        </div>
        <ol className="instructionsList">
          <li>Browse products below</li>
          <li>Click any card to see the verification result</li>
          <li>Compare how genuine vs counterfeit products are flagged.</li>
          <li>Ready? Scan a real product from your home</li>
        </ol>
      </div>

      {/*demo count*/}
      <div className="demoCount">
        <p>{demoProducts.length} demo products available.</p>
      </div>


      {/*cards grid */}
      <div className="cardsGrid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px", padding: "20px 0" }}>
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
      <div className="callToAction" style={{ marginTop: "40px", padding: "20px", backgroundColor: "#f0f9ff", borderRadius: "12px", textAlign: "center" }}>
        <div className="callToActionTitle">Ready to scan a real product</div>
        <p className="callToActionText">Scan a barcode from any cosmetic product in your home</p>
        <button className="scanButton" style={{ backgroundColor: "#a4c0ed", color: "white", padding: "12px 12px", border: "none", borderRadius: "8px", fontSize: "16px", cursor: "pointer" }}
        onClick={() => navigate("/scan")}
        >Go to Scanner</button>
      </div>
    </div>
    
  )
}

export default DemoPage