import demoData from "../data/demoProducts.json";
const demoPage = () => {

  const demoProducts = demoData.products;
  return (
    <div>
      {demoProducts.map(product => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>{product.brand}</p>
          <p>{product.barcode}</p>
          <p>{product.category}</p>
          <p>{product.is_counterfeit}</p>
          <p>{product.notes}</p>
        </div>
      ))}
    </div>
  )
}

export default demoPage