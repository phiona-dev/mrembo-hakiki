import "./Card.css";
import Badge from "./Badge";

const Card = ({ id,name,brand,barcode,category,is_counterfeit,notes, onClick }) => {
  return (
    <div className="cardContainer" key={id} onClick={onClick}>
          <h3 className="cardName">{name}</h3>
          <p className="cardBrand">{brand}</p>
          <p className="cardBarcode">{barcode}</p>
          <p className="cardCategory">{category}</p>
          <p className="cardTF">{is_counterfeit ? <Badge type="counterfeit"/> : <Badge type="genuine"/>}</p>
          <p className="cardNotes">{notes}</p>
        </div>
  )
}

export default Card