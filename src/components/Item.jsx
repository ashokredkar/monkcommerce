import React, { useState } from 'react'
import { GrDrag } from "react-icons/gr";
import { AiFillEdit, AiOutlineClose } from "react-icons/ai";

const Item = ({setModal}) => {
    const [discount, setDiscount] = useState([]);

    return (
        <div className='item'>
            <div className='main'>
                <GrDrag className='drag_icon' />
                <div className='product_input'>
                    <span>product 1</span>
                    <AiFillEdit className='edit_icon' onClick={() => setModal(true)} />
                </div>
                {discount ? <div className='discount_section'>
                    <input type="text" />
                    <select name="" id="">
                        <option value="">% off</option>
                        <option value="">flat off</option>
                    </select>
                </div> : <button className='btn' onClick={() => setDiscount(true)}>Add Discount</button>}
                <AiOutlineClose className="remove_item" />
            </div>
            <div className='variant_section'>
                <span>Show Variants</span>
                <div className='variants'>
                    <div>
                        <GrDrag className='drag_icon' />
                        <div className='product_input'>
                            <span>product 1</span>
                            <AiFillEdit className='edit_icon' onClick={() => setModal(true)} />
                        </div>
                        {discount ? <div className='discount_section'>
                            <input type="text" />
                            <select name="" id="">
                                <option value="">% off</option>
                                <option value="">flat off</option>
                            </select>
                        </div> : <button className='btn' onClick={() => setDiscount(true)}>Add Discount</button>}
                        <AiOutlineClose className="remove_item" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Item