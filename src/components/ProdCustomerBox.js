import { Button } from '@mui/material'
import { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import BuyCombobox from './BuyCombobox'
import './styles.css'
const P_CustomerBox = ({purDate, c_id, isAdmin}) => {
  const customersArray = useSelector(state=>state.customers.customersArray)
  const [customer, setCustomer] = useState({})
  const [showComboBox, setShowComboBox] = useState(false)
  useEffect(() => {
    let currentCustomer = customersArray.find(customer=> +customer.id === +c_id)
    if (currentCustomer)
    setCustomer(currentCustomer)
  }, [c_id, customersArray])
  const handleAdd = () =>{
    setShowComboBox(!showComboBox)
  }
  return (
    <div className='customer_box'>
        <b>P_CustomerBox</b><br/><br/>
        Name:{isAdmin? <Link to={`/dashboard/edit_customer/${customer.id}`}>{customer.fname+' '+customer.lname} </Link>:
        customer.fname+' '+customer.lname}<br/>
        Purchase Date: {purDate}<br/>
        <Button variant="outlined" onClick={handleAdd}>Add</Button>
        {showComboBox? <BuyCombobox c_id={customer.id} setShowComboBox={setShowComboBox}/>:null}

    </div>
  )
}

export default P_CustomerBox