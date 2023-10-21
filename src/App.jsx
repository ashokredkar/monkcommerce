import { useState, useEffect } from 'react'
import './App.css'
import Item from './components/Item'
import { AiOutlineClose } from "react-icons/ai";
import Modal from './components/Modal';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalSearch, setModalSearch] = useState("");
  const [addedItems, setAddedItems] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(`https://stageapibc.monkcommerce.app/admin/shop/product?search=${modalSearch}`);
    const data = await response.json();
    console.log(data);
    setProducts(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [modalSearch]);

  const addProduct = () => {
    console.log("added");
    setModal(false);
  }

  return (
    <section>
      <h2>Products</h2>
      <div className="list_header">
        <h3>Product</h3>
        <h3>Discount</h3>
      </div>
      <div className="products">
        <Item setModal={setModal} />
      </div>
      <button className="btn" style={{float: 'right', width: 'max-content'}} onClick={() => setModal(true)}>Add Product</button>

      {modal && (
        <Modal products={products} setModal={setModal} loading={loading} setModalSearch={setModalSearch} addProduct={addProduct} />
      )}
    </section>
  )
}

export default App
