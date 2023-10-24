import React, { useState } from 'react'
import { GrDrag } from "react-icons/gr";
import { AiFillEdit, AiOutlineClose } from "react-icons/ai";

const Item = ({ setModal, product, addedItems, setAddedItems, everySubItem, setEverySubItem }) => {
    const [discount, setDiscount] = useState([]);
    const [subDiscount, setSubDiscount] = useState([]);
    const [showVariants, setShowVariants] = useState([]);

    return (
        <div className='item'>
            <div className='main'>
                <GrDrag className='drag_icon' />
                <div className='product_input'>
                    <span>{product?.title.slice(9)}</span>
                    <AiFillEdit className='edit_icon' onClick={() => setModal(true)} />
                </div>
                {discount?.find((item) => item?.id===product?.id) ? 
                    <div className='discount_section'>
                        <input type="text" />
                        <select name="" id="">
                            <option value="">% off</option>
                            <option value="">flat off</option>
                        </select>
                    </div> : <button className='btn' onClick={() => setDiscount([...discount, product])}>Add Discount</button>}
                <AiOutlineClose className="remove_item" onClick={() => setAddedItems(addedItems.filter(item => item?.id !== product?.id))} />
            </div>
            <div className='variant_section'>
                {showVariants?.find((itemID) => itemID===product.id) ? <span onClick={() => setShowVariants(showVariants?.filter(item => item!==product?.id))}>Hide Variants</span> : <span onClick={() => setShowVariants([...showVariants, product.id])}>Show Variants</span>}
                {showVariants?.find((itemID) => itemID===product.id) &&
                    <div className='variants'>
                        {product?.variants.map((item) => {
                            return everySubItem?.find(itemID => itemID === item.id) && (
                                <div key={item.id}>
                                    <GrDrag className='drag_icon' />
                                    <div className='product_input'>
                                        <span>{item?.title}</span>
                                        <AiFillEdit className='edit_icon' onClick={() => setModal(true)} />
                                    </div>
                                    {subDiscount?.find((p) => p?.id===item.id) ? <div className='discount_section'>
                                        <input type="text" />
                                        <select name="" id="">
                                            <option value="">% off</option>
                                            <option value="">flat off</option>
                                        </select>
                                    </div> : <button className='btn' onClick={() => setSubDiscount([...subDiscount, item])}>Add Discount</button>}
                                    <AiOutlineClose className="remove_item" onClick={() => setAddedItems(addedItems.filter(item => item?.id !== product?.id))} />
                                </div>
                            )
                        })}
                    </div>
                }
            </div>
        </div>
    )
}

export default Item