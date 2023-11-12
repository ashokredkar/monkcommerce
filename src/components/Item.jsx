import React, { useState } from 'react'
import { GrDrag } from "react-icons/gr";
import { AiFillEdit, AiOutlineClose } from "react-icons/ai";

const Item = ({ setModal, setEditModal, product, addedItems, setAddedItems, mainChecked, setMainChecked, checkedSubIds, setCheckedSubIds, editItem }) => {
    const [discount, setDiscount] = useState([]);
    const [subDiscount, setSubDiscount] = useState([]);
    const [showVariants, setShowVariants] = useState([]);

    const removeMainItem = (product) => {
        setAddedItems(addedItems.filter(item => item?.id !== product?.id));
        setMainChecked(mainChecked.filter(item => item?.id !== product?.id));
        const subIdsArray = product?.variants.map(item => item.id);
        setCheckedSubIds(checkedSubIds.filter(id => !subIdsArray.includes(id)));          // removing subitems id's of this product from the array
    }

    const removeSubItems = (product, subItemID) => {
        const thisProdSubIds = product?.variants.map(item => item.id);    // array of current product's subId's
        const checkedSubIdsLength = thisProdSubIds.filter(id => checkedSubIds.includes(id)).length;     // getting length of current item's checked subItem id's
        if(checkedSubIdsLength <= 1){     // if the last sub item is being removed
            const confirmation = confirm("Removing last sub item will remove the whole item, are you sure about that?");
            confirmation && setAddedItems(addedItems.filter(item => item?.id !== product?.id));
            setCheckedSubIds(checkedSubIds.filter(id => id !== subItemID));                // without below two lines, added items remains checked inside add modal after deleting
            setMainChecked(mainChecked.filter((item) => item?.id !== product?.id));
        }else{
            setCheckedSubIds(checkedSubIds.filter(id => id !== subItemID));
        }
    }

    return (
        <div className='item'>
            <div className='main'>
                <GrDrag className='drag_icon' />
                <div className='product_input'>
                    <span>{product?.title.slice(9)}</span>
                    <AiFillEdit className='edit_icon' onClick={() => editItem(product)} />
                </div>
                {discount?.find((item) => item?.id===product?.id) ? 
                    <div className='discount_section'>
                        <input type="text" />
                        <select name="" id="">
                            <option value="">% off</option>
                            <option value="">flat off</option>
                        </select>
                    </div> : <button className='btn' onClick={() => setDiscount([...discount, product])}>Add Discount</button>}
                <AiOutlineClose className="remove_item" onClick={() => removeMainItem(product)} />
            </div>
            <div className='variant_section'>
                {showVariants?.find((itemID) => itemID===product.id) ? <span onClick={() => setShowVariants(showVariants?.filter(item => item!==product?.id))}>Hide Variants</span> : <span onClick={() => setShowVariants([...showVariants, product.id])}>Show Variants</span>}
                {showVariants?.find((itemID) => itemID===product.id) &&
                    <div className='variants'>
                        {product?.variants.map((item) => {
                            return checkedSubIds?.find(itemID => itemID === item.id) && (
                                <div key={item.id}>
                                    <GrDrag className='drag_icon' />
                                    <div className='product_input'>
                                        <span>{item?.title}</span>
                                        {/* <AiFillEdit className='edit_icon' onClick={() => setEditModal(true)} /> */}
                                    </div>
                                    {subDiscount?.find((p) => p?.id===item.id) ? <div className='discount_section'>
                                        <input type="text" />
                                        <select name="" id="">
                                            <option value="">% off</option>
                                            <option value="">flat off</option>
                                        </select>
                                    </div> : <button className='btn' onClick={() => setSubDiscount([...subDiscount, item])}>Add Discount</button>}
                                    <AiOutlineClose className="remove_item" onClick={() => removeSubItems(product, item.id)} />
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