import { Button } from "@mui/material"
import { deleteDoc, doc, updateDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useSelector, useDispatch} from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { deleteProduct, updateProduct } from "../../features/products/productsSlice"
import { deletePurchase } from "../../features/purchases/purchasesSlice"
import { db } from "../../firebase-config"
import DeleteIcon from '@mui/icons-material/Delete'; 


const EditProduct = () => {
    const {p_id}=useParams()
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentProduct = useSelector((state)=> state.products.productsArray.find(product=> +product.id === +p_id))
    const productPurchasesArray = useSelector((state)=> state.purchases.purchasesArray.filter(p=> p.p_id === p_id))
    const [updatedProduct, setUpdatedProduct] = useState({})
    useEffect(() => {
        setUpdatedProduct(currentProduct)
    }, [p_id, currentProduct])
    
    const handleChange = (e) =>{
        const {name, value} = e.target;
        setUpdatedProduct({...updatedProduct, [name]:value})
    }
    const handleDelete = async(e) =>{

        dispatch(deleteProduct(p_id))//delete product from rtk
        try {
            deleteDoc(doc(db, "products", `${p_id}`))//delete product from db
        } catch (error) {
            toast(error)
        }
        const productPurchasesIdsArray = productPurchasesArray.map(purchase=>purchase.id)
        productPurchasesIdsArray.forEach(async(purId) => {//delete any product purchases data from rtk and db
            dispatch(deletePurchase(purId))
            try {
                await deleteDoc(doc(db, "purchases", `${purId}`))
            } catch (error) {
                toast(error)
            }
        });
        alert("All Product data has been deleted successfully");
        navigate('/dashboard/products')
    }
    const handleSubmit = async(e) =>{
        e.preventDefault();
        dispatch(updateProduct(updatedProduct))
        try {
            await updateDoc(doc(db, "products", `${updatedProduct.id}`), {
                title: updatedProduct.title,
                price: updatedProduct.price,
                quantity: updatedProduct.quantity
            });
        } catch (error) {
            toast(error)
        }
        alert("Product updated successfully");

    }
  return (
    <div className="edit_product_box">
        <h3>Edit Product {p_id}</h3><br/>
        <b>P_ID: {p_id}</b>
        <form onSubmit={handleSubmit}>
            Title: <input type={"text"} name="title" defaultValue={updatedProduct.title} onChange={handleChange}/>
            Price: <input type={"text"} name="price" defaultValue={updatedProduct.price} onChange={handleChange}/>
            Quantity: <input type={"text"} name="quantity" defaultValue={updatedProduct.quantity} onChange={handleChange}/><br/>
            <Button style={{margin:"10px"}} variant='contained' type="submit">Update Product</Button><br/>
        </form>
        <Button style={{margin:"5px"}} variant="outlined" onClick={handleDelete} startIcon={<DeleteIcon/>}>Remove All Product Data</Button>
        {/* <div className='delete-button' onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.onCancel(item) } } /> */}
    </div>
  )
}

export default EditProduct