import React, { useState, useEffect } from 'react'
import { AiOutlineClose } from "react-icons/ai"

const Modal = ({ products, setModal, loading, setModalSearch, addProduct, selectedItems, setSelectedItems, everySubItem, setEverySubItem, everySubParentID, setEverySubParentID }) => {
    const [mainChecked, setMainChecked] = useState([]);

    const handleAllChecked = (id, e, product) => {
        if(e.target.checked){
            setMainChecked([...mainChecked, id]);
            setSelectedItems([...selectedItems, product]);
        }else{
            setMainChecked(mainChecked.filter(itemID => itemID !== id));
            setSelectedItems(selectedItems.filter(item => item.id !== id));
        }
        console.log(selectedItems);         // weird logs, didn't make sense.
    }

    const handleSubChecked = (e, prodID, subItemID, product) => {
        if(e.target.checked){
            setEverySubParentID([...everySubParentID, prodID]);
            setEverySubItem([...everySubItem, subItemID]);
            setSelectedItems(new Set([...selectedItems, product]));
        }else{
            const index = everySubParentID.indexOf(prodID);
            if (index !== -1) {         // only if ID is present in state array
                const newIDs = [...everySubParentID];
                newIDs.splice(index, 1);
                setEverySubParentID(newIDs);
            }
            const ProdIndex = [...selectedItems].indexOf(product);
            if (index !== -1) {         // only if ID is present in state array
                const newIDs = [...selectedItems];
                newIDs.splice(ProdIndex, 1);
                setSelectedItems(new Set(newIDs));
            }
            setEverySubItem(everySubItem.filter(itemID => itemID !== subItemID));   
        }
    }
    
    useEffect(() => {
        console.log(new Set(selectedItems));
    }, [selectedItems]);
    

    return (
        <div className="modal">
            <div className="header">
                <h3>Select Products</h3>
                <AiOutlineClose className='close_modal' onClick={() => setModal(false)} />
            </div>
            <input type="search" placeholder='Search Product' className='search' onChange={(e) => setModalSearch(e.target.value)} />
            <div className="select_products">
                {!loading ? products?.map((product) => (
                    <div className="product_item" key={product?.id}>
                        <div className='info'>
                            {/* {everySubItem.find((itemID) => itemID===product?.variants?.map(subItem => subItem)) ? ( */}
                            {/* {subItemChecked(product?.variants) ? (
                                <input type="checkbox" id={`inp_${product?.id} true`} checked onChange={(e) => handleAllChecked(product?.id, e, product)} />
                            ) : (<input type="checkbox" id={`inp_${product?.id} false`} onChange={(e) => handleAllChecked(product?.id, e, product)} />)} */}
                            {everySubParentID.find(prodID => prodID === product?.id) ? (
                                <input type="checkbox" id={`inp_${product?.id}`} checked onChange={(e) => handleAllChecked(product?.id, e, product)} />
                            ) : (<input type="checkbox" id={`inp_${product?.id}`} onChange={(e) => handleAllChecked(product?.id, e, product)} />)}
                            <label htmlFor={`inp_${product?.id}`}>
                                <img src={product?.image?.src} alt="" />
                                <p>{product?.title.slice(9)}</p>
                            </label>
                        </div>
                        <div className="product_subItems">
                        {product?.variants?.map((subItem) => (
                            <div key={subItem?.id}>
                                {/* {mainChecked.find((itemID) => itemID===product?.id) ? (
                                    <input type="checkbox" className="sub_input_check" checked id={`inp_${subItem?.id}`} onChange={(e) => handleSubChecked(e, subItem?.id)} />
                                ) : (
                                    <input type="checkbox" className="sub_input_check" id={`inp_${subItem?.id}`} onChange={(e) => handleSubChecked(e, subItem?.id)} />
                                )} */}
                                {mainChecked.find((itemID) => itemID===product?.id) ? (
                                    <input type="checkbox" checked id={`inp_${subItem?.id}`} onChange={(e) => handleSubChecked(e, product?.id, subItem?.id, product)} />
                                ) : (
                                    <input type="checkbox" id={`inp_${subItem?.id}`} onChange={(e) => handleSubChecked(e, product?.id, subItem?.id, product)} />
                                )}
                                <label htmlFor={`inp_${subItem?.id}`}>
                                    <p className='name'>{subItem?.title}</p>
                                    <div>
                                        <p>{subItem?.inventory_quantity ? subItem?.inventory_quantity : 0} available</p>
                                        <p>${subItem?.price}</p>
                                    </div>
                                </label>
                            </div>
                        ))}
                        </div>
                    </div>
                )) : (<center>Loading</center>)}
            </div>
            <div className='footer'>
                <p>1 product(s) selected</p>
                <div>
                    <button className='btn' onClick={() => setModal(false)}>Cancel</button>
                    <button className='btn' onClick={addProduct}>Add</button>
                </div>
            </div>
        </div>
    )
}

export default Modal