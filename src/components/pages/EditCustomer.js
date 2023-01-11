import { deleteDoc, doc, updateDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useSelector, useDispatch} from "react-redux"
import { useParams, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { deleteCustomer, updateCustomer } from "../../features/customers/customersSlice"
import { deletePurchase } from "../../features/purchases/purchasesSlice"
import { db } from "../../firebase-config"
import DeleteIcon from '@mui/icons-material/Delete'; 
import { Button } from "@mui/material"

const EditCustomer = () => {
    const {c_id} = useParams()
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentCustomer = useSelector((state)=> state.customers.customersArray.find(customer=> +customer.id === +c_id))
    const customerPurchasesArray = useSelector((state)=> state.purchases.purchasesArray.filter(p=> p.c_id === c_id))
    const [updatedCustomer, setUpdatedCustomer] = useState({})
    useEffect(() => {
        setUpdatedCustomer(currentCustomer)
    }, [c_id,currentCustomer])

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setUpdatedCustomer({...updatedCustomer, [name]:value})
    }

    const handleDelete = async(e) =>{
        dispatch(deleteCustomer(c_id))//delete customer from rtk
        try {
        deleteDoc(doc(db, "customers", `${c_id}`))//delete customer from db
        } catch (error) {
            toast(error)
        }
        const customerPurchasesIdsArray = customerPurchasesArray.map(purchase=>purchase.id)
        customerPurchasesIdsArray.forEach(async(purId) => {//delete any customer purchases data from rtk and db
            dispatch(deletePurchase(purId))
            try {
                await deleteDoc(doc(db, "purchases", `${purId}`))
            } catch (error) {
                toast(error)
            }
        });
        alert("All Customer data has been deleted successfully");
        navigate('/dashboard/customers')
    }
    const handleSubmit = async(e) =>{
        e.preventDefault();
        dispatch(updateCustomer(updatedCustomer))
        try {
            await updateDoc(doc(db, "customers", `${c_id}`), {
                fname: updatedCustomer.fname,
                lname: updatedCustomer.lname,
                city: updatedCustomer.city
            });
        } catch (error) {
            toast(error)
        }
        alert("Customer updated successfully");
    }
  return (
    <div className="edit_customer_box">
        <h3>Edit Customer {c_id}</h3><br/>
        <b>C_ID: {c_id}</b>
        <form onSubmit={handleSubmit}>
            First Name: <input type={"text"} name="fname" defaultValue={updatedCustomer.fname} onChange={handleChange}/>
            Last Name: <input type={"text"} name="lname" defaultValue={updatedCustomer.lname} onChange={handleChange}/>
            city: <input type={"text"} name="city" defaultValue={updatedCustomer.city} onChange={handleChange}/><br/>
            <Button style={{margin:"10px"}}variant="contained" type="submit">Update Customer</Button><br/>
        </form>
        <Button style={{margin:"5px"}} variant="outlined" onClick={handleDelete} startIcon={<DeleteIcon />}>
        Delete All Customer Data
      </Button>

    </div>
  )
}

export default EditCustomer