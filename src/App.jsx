import { useState, useEffect } from 'react'
import './App.css'
import Item from './components/Item'
import { AiOutlineClose } from "react-icons/ai";
import Modal from './components/Modal';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [query, setQuery] = useState("");

  const [addedItems, setAddedItems] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [mainChecked, setMainChecked] = useState([]);
  const [checkedSubIds, setCheckedSubIds] = useState([]);
  const [editProduct, setEditProduct] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    // const response = await fetch(`https://stageapibc.monkcommerce.app/admin/shop/product?search=${query}`);
    const response = await fetch(`https://stageapibc.monkcommerce.app/admin/shop/product`);
    const data = await response.json();
    setProducts(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  // First, removing items that are already addedItems, then searching only from the remaining array
  const filteredProducts = products.filter(item => !addedItems.includes(item)).filter(item => item?.title.toLowerCase().includes(query.toLowerCase()));

  const addProduct = (editedProduct) => {
    if(editedProduct !== undefined){
      console.log(editedProduct);    // array of current product's subId's
      let thisProdSubIds=[];
      editedProduct.map(prod => prod?.variants.map(item => thisProdSubIds.push(item.id)));    // array of current product's subId's
      if(thisProdSubIds.filter(id => checkedSubIds.includes(id)).length < 1){     // if the last sub item is being removed, getting length of current item's checked subItem id's
        alert("Please select atleast one sub item");
        return
      }
    }
    const uniqueProducts = mainChecked.filter((item, index, self) => index === self.findIndex(obj => JSON.stringify(obj) === JSON.stringify(item)));
    setAddedItems(uniqueProducts);
    setModal(false);
    setEditModal(false);
  }

  const editItem = (product) => {
    setEditModal(true);
    setEditProduct(products.filter(item => item == product));
  }

  const handleChecked = (e, product, subItemID) => {
    if(subItemID === undefined){
      if(e.target.checked){
        setMainChecked([...mainChecked, product]);
        setCheckedSubIds([...checkedSubIds, ...product?.variants.map(item => item.id)]);
      }else{
        setMainChecked(mainChecked.filter((item) => item?.id !== product?.id));
        setCheckedSubIds(checkedSubIds.filter((item) => !product?.variants?.map(item => item.id).includes(item)));
      }
    }else{
      if(e.target.checked){
        !mainChecked.includes(product) && setMainChecked([...mainChecked, product]);    // this line will not add products in the array if they are already added, but for now adding duplicates products and cleaning them while showing in UI
        // setMainChecked([...mainChecked, product]);
        setCheckedSubIds([...checkedSubIds, subItemID]); 
      }else{
        const index = mainChecked.indexOf(product);
        const newProductsArray = [...mainChecked];
        let thisProdSubIds = [];
        product?.variants.map(item => thisProdSubIds.push(item.id));
        thisProdSubIds.filter(id => checkedSubIds.includes(id)).length <= 1 && newProductsArray.splice(index, 1);
        setMainChecked(newProductsArray);
        setCheckedSubIds(checkedSubIds.filter((item) => item !== subItemID)); 
      }
    }
  }

  // useEffect(() => {
    // console.log("mainChecked", mainChecked);
    // console.log("checkedSubIds", checkedSubIds);
    // console.log("addedItems", addedItems);
  // }, [mainChecked, addedItems]);


  return (
    <section>
      <h2>Products</h2>
      <div className="list_header">
        <h3>Product</h3>
        <h3>Discount</h3>
      </div>
      <div className="products">
        {addedItems.length > 0 ? addedItems?.map((product) => (
          <Item setModal={setModal} setEditModal={setEditModal} key={product.id} product={product} addedItems={addedItems} setAddedItems={setAddedItems} mainChecked={mainChecked} setMainChecked={setMainChecked} checkedSubIds={checkedSubIds} setCheckedSubIds={setCheckedSubIds} editItem={editItem} />
        )) : <div className='no_items'>There are no items added yet</div>}
      </div>
      <button className="btn" style={{float: 'right', width: 'max-content'}} onClick={() => setModal(true)}>Add Product</button>

      {modal && (
        <Modal filteredProducts={filteredProducts} modal={modal} setModal={setModal} loading={loading} query={query} setQuery={setQuery} addProduct={addProduct} handleChecked={handleChecked} mainChecked={mainChecked} setMainChecked={setMainChecked} checkedSubIds={checkedSubIds} />
      )}
      {editModal && (
        <Modal editProduct={editProduct} editModal={editModal} setEditModal={setEditModal} loading={loading} query={query} setQuery={setQuery} addProduct={addProduct} handleChecked={handleChecked} mainChecked={mainChecked} setMainChecked={setMainChecked} checkedSubIds={checkedSubIds} />
      )}
    </section>
  )
}

export default App
