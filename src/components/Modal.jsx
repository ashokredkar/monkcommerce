import React, { useState } from 'react'
import { AiOutlineClose } from "react-icons/ai"

const Modal = ({ filteredProducts, editProduct, modal, setModal, editModal, setEditModal, loading, query, setQuery, addProduct, handleChecked, mainChecked, checkedSubIds }) => {
    if(!editModal){
        return (
            <div className="modal">
                <div className="header">
                    <h3>Add Products</h3>
                    <AiOutlineClose className='close_modal' onClick={() => setModal(false)} />
                </div>
                <input type="search" value={query} placeholder='Search Product' className='search' onChange={(e) => setQuery(e.target.value)} />
                <div className="select_products">
                    {/* {!loading ? filteredProducts?.map((product) => ( */}    {/* Handling search without calling the api, so no need for loading state */}
                    {filteredProducts.length>0 ? filteredProducts?.map((product) => (
                        <div className="product_item" key={product?.id}>
                            <div className='info'>
                                {mainChecked.find((item) => item===product) ? (
                                    <input type="checkbox" checked id={`inp_${product?.id}`} onChange={(e) => handleChecked(e, product)} />
                                ) : (
                                    <input type="checkbox" id={`inp_${product?.id}`} onChange={(e) => handleChecked(e, product)} />
                                )}
                                <label htmlFor={`inp_${product?.id}`}>
                                    <img src={product?.image?.src} alt="" />
                                    <p>{product?.title.slice(9)}</p>
                                </label>
                            </div>
                            <div className="product_subItems">
                            {product?.variants?.map((subItem) => (
                                <div key={subItem?.id}>
                                    {checkedSubIds.find((item) => item===subItem?.id) ? (
                                        <input type="checkbox" checked id={`inp_${subItem?.id}`} onChange={(e) => handleChecked(e, product, subItem?.id)} />
                                    ) : (
                                        <input type="checkbox" id={`inp_${subItem?.id}`} onChange={(e) => handleChecked(e, product, subItem?.id)} />
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
                    )) : (<center>No more remaining products to add!</center>)}
                </div>
                <div className='footer'>
                    <p>1 product(s) selected</p>
                    <div>
                    <button className='btn' onClick={() => setModal(false)}>Cancel</button>
                    <button className='btn' onClick={() => addProduct()}>Add</button>
                    </div>
                </div>
            </div>
        )
    }else{
        return (
            <div className="modal">
                <div className="header">
                    <h3>Edit Product</h3>
                    <AiOutlineClose className='close_modal' onClick={() => setEditModal(false)} />
                </div>
                {/* <input type="search" value={query} placeholder='Search Product' className='search' onChange={(e) => setQuery(e.target.value)} /> */}
                <div className="select_products">
                    {!loading ? editProduct?.map((product) => (
                        <div className="product_item" key={product?.id}>
                            <div className='info'>
                                {/* {mainChecked.find((item) => item===product) ? ( */}
                                    <input type="checkbox" checked id={`inp_${product?.id}`} onChange={(e) => handleChecked(e, product)} />
                                {/* // ) : (
                                //     <input type="checkbox" id={`inp_${product?.id}`} onChange={(e) => handleChecked(e, product)} />
                                // )} */}
                                <label htmlFor={`inp_${product?.id}`}>
                                    <img src={product?.image?.src} alt="" />
                                    <p>{product?.title.slice(9)}</p>
                                </label>
                            </div>
                            <div className="product_subItems">
                            {product?.variants?.map((subItem) => (
                                <div key={subItem?.id}>
                                    {checkedSubIds.find((item) => item===subItem?.id) ? (
                                        <input type="checkbox" checked id={`inp_${subItem?.id}`} onChange={(e) => handleChecked(e, product, subItem?.id)} />
                                    ) : (
                                        <input type="checkbox" id={`inp_${subItem?.id}`} onChange={(e) => handleChecked(e, product, subItem?.id)} />
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
                    {/* <p>1 product(s) selected</p> */}
                    <p></p>
                    <div>
                        <button className='btn' onClick={() => setEditModal(false)}>Cancel</button>
                        <button className='btn' onClick={() => addProduct(editProduct)}>Edit</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Modal