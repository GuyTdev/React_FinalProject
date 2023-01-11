import { useState } from 'react'
import {useSelector} from 'react-redux'
import ListOfCustomerProducts from '../ListOfCustomerProducts'
import ListOfCustomerPurchasedDates from '../ListOfCustomerPurchasedDates'
import BuyCombobox from '../BuyCombobox'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import '../styles.css'
const Customers = () => {
  const customersArray = useSelector((state) => state.customers.customersArray)
  const isAdmin = useSelector((state) => state.user.isAdmin)
  const [showComboBox, setShowComboBox] = useState(false)


  const handleAdd = () =>{
    setShowComboBox(!showComboBox)
  }

  return (
    <div>
      {/* Show data related to customer. */}
      {/* All viewing and filtered data show will execute via rtk  . */}
      {/* All Crud Operations will execute via firestore db  and also update rtk. */}
    <h3>Customers</h3>
    <table border={1}>
      <thead>
        <tr>
        <th>ID</th><th>Customer Name</th><th>List Of Products </th><th>List Of Purchased dates</th><th>Buy more</th>
        </tr>
      </thead>
      <tbody>
    {customersArray.map(customer =><tr key={customer.id}>
                                    <td> <b>{customer.id}</b> </td>
                                    <td>
                              {isAdmin?
                                    <Link to={`/dashboard/edit_customer/${customer.id}`}>{customer.fname+' '+customer.lname}</Link>
                                    : customer.fname+' '+customer.lname}
                              </td>
                                    <td> {customer.id?<ListOfCustomerProducts isAdmin={isAdmin} c_id={customer.id}/>:null}</td>
                                    <td> {customer.id?<ListOfCustomerPurchasedDates c_id={customer.id}/>:null}</td>
                                    <td>
                                        <Button variant='contained' style={{margin:'5px'}} onClick={handleAdd}>Buy Product</Button><br/>
                                        {showComboBox? <BuyCombobox setShowComboBox={setShowComboBox} c_id={customer.id}/>:null}
                                    </td>
                              </tr>)}
      </tbody>
    </table>
    </div>
  )
}

export default Customers