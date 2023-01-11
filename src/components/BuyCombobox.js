import {Combobox} from "react-widgets";
import "react-widgets/styles.css";
import {useSelector, useDispatch} from 'react-redux'
import { doc, setDoc,  updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import {  useState} from 'react';
import { addPurchase } from "../features/purchases/purchasesSlice";
import { updateProductQuantity } from "../features/products/productsSlice";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const BuyCombobox = ({c_id, setShowComboBox}) => {
    const productsArray = useSelector(state=>state.products.productsArray)
    const purchasesArray = useSelector(state=>state.purchases.purchasesArray)
    const dispatch = useDispatch()
    const [product, setProduct] = useState({})
    const handleBuy = () =>{
            //1. add to firebase purchases collection with c_id and p_id . and current PC date.
            //2. decrease quantity from products collection in firebase
            //3. add to rtk purchases collection with c_id and p_id . and date from timestamp.?
            //4. decrease quantity from products rtk and from firebase  "products" collection?
            if(product && product.quantity > 0){
                const newId = +purchasesArray[purchasesArray.length - 1]?.id+1 || 1;
                console.log(newId);
                const purchasedDate = Date().toLocaleString().split(' ').slice(0,5).join(' ');
                const newPurchase = {id:newId, c_id:c_id, p_id:product.id, date:purchasedDate}
                console.log(newPurchase);
                addNewPurchase(newPurchase, product.quantity-1);//adding newPurchase to db and to rtk.
                setShowComboBox(false)
            }else{
                alert("product is out of stock");
            }
        }
        const addNewPurchase = async (newPurchase, newQuantity) =>{
            //adding newPurchase to db and to rtk.
            //update Product quantity
            console.log("newQuantity",newQuantity);
            try {
                await setDoc(doc(db, "purchases", `${newPurchase.id}`), {
                    c_id: newPurchase.c_id,
                    p_id: newPurchase.p_id,
                    date: newPurchase.date,
                });
            } catch (error) {
                        toast(error)
            }
            dispatch(addPurchase(newPurchase))//add new purchase to rtk
            try {
	                await updateDoc(doc(db, "products", `${newPurchase.p_id}`), {
	                quantity: newQuantity,
	            });
            } catch (error) {
                toast(error)
            }
            dispatch(updateProductQuantity(newPurchase.p_id));//decrease quantity from productsSlice rtk
            alert(`Purchase successfully added to purchases! with id: ${newPurchase.id} `)
        }

    const handleSelect = (value)=>{
        console.log("value",value);
        setProduct(productsArray.find(p => p.title === value))
    }
  return (
    <div>
        Buy Product:<br/>
        {console.log(productsArray.map(product=>product.title))}
    <Combobox
        defaultValue={""}
        data={productsArray.map(product=>product.title)}
        onSelect={handleSelect}
        />
        selected Product: <span>P_ID:{product.id }</span><br/><span>Title:{product.title }</span><br/>
        <Button variant='contained'  onClick={handleBuy} color="primary" aria-label="add to shopping cart" endIcon={<AddShoppingCartIcon onClick={handleBuy}/>}>
            Buy
        </Button>
    </div>
  )
}

export default BuyCombobox
