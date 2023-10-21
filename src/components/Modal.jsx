import React, { useState } from 'react'
import { AiOutlineClose } from "react-icons/ai"

const Modal = ({products, setModal, loading, setModalSearch, addProduct}) => {
    const [mainChecked, setMainChecked] = useState([]);

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
                            <input type="checkbox" id={`inp_${product?.id}`} onChange={() => setMainChecked([...mainChecked, product?.id])} />
                            <label htmlFor={`inp_${product?.id}`}>
                                <img src={product?.image?.src} alt="" />
                                <p>{product?.title.slice(9)}</p>
                            </label>
                        </div>
                        <div className="product_subItems">
                        {product?.variants?.map((subItem) => (
                            <div key={subItem?.id}>
                                {mainChecked.find((item) => item===product?.id) ? (
                                    <input type="checkbox" checked id={`inp_${subItem?.id}`} />
                                ) : (
                                    <input type="checkbox" id={`inp_${subItem?.id}`} />
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