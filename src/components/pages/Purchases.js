import { Button } from '@mui/material';
import { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import { Combobox } from 'react-widgets'
import "react-widgets/styles.css";

const Purchases = () => {
  const purchasesArray = useSelector((state) => state.purchases.purchasesArray)
  const productsArray = useSelector((state) => state.products.productsArray)
  const customersArray = useSelector((state) => state.customers.customersArray)
  const onlyDatesArray = purchasesArray.map(purchase => purchase.date.split(' ').slice(0, 4).join(' '))
  const uniqueDates = [...new Set(onlyDatesArray)];

  const isAdmin = useSelector((state) => state.user.isAdmin)

  const [filteredPurchases, setFilteredPurchases] = useState([])
  const [filters, setFilters] = useState({p_id:"",c_id:"",dateOnly:""})

  useEffect(() => {
    setFilteredPurchases(purchasesArray)
  }, [purchasesArray])
  // const getOnlyDate = (fullDateStr) =>{
  //   return fullDateStr.split(' ').slice(0, 4).join(' ');
  // }
  const getProductTitleById = (p_id) =>{
    return productsArray.find(product => +product.id === +p_id).title
  }
  const getCustomerFullNameById = (c_id) =>{
    const customer = customersArray.find(customer => +customer.id === +c_id)
    if(customer)
        return customer.fname + ' '+customer.lname
  }
  
  const handleSelectProduct = (value)=>{
    console.log("value",value);
    setFilters({...filters, p_id : value.id})
  }
  const handleSelectCustomer = (value)=>{
    console.log("value",value);
    setFilters({...filters, c_id : value.id})
  }
  const handleSelectDate = (value)=>{
      console.log("handleSelectDate value",value);
      setFilters({...filters, dateOnly: value })
  }
  const handleChangeProduct = (value)=>{
   if(value === ""){
    setFilters({...filters, p_id : ""})
   }
  }
  const handleChangeCustomer = (value)=>{
   if(value === ""){
    setFilters({...filters, c_id : ""})
   }
  }
  const handleChangeDate = (value)=>{
   if(value === ""){
    setFilters({...filters, dateOnly : ""})
   }
  }
  const handleSearch = () =>{
    let tempFilter = [...purchasesArray]
    console.log("tempFilter",tempFilter);
    console.log("filters.p_id",filters.p_id);
    console.log("filters.c_id",filters.c_id);
    console.log("filters.dateOnly",filters.dateOnly);
    if(filters.p_id)
      tempFilter = tempFilter.filter((purchase) => +purchase.p_id === +filters.p_id)
    if(filters.c_id)
      tempFilter = tempFilter.filter((purchase) => +purchase.c_id === +filters.c_id)
    if(filters.dateOnly)
      tempFilter = tempFilter.filter((purchase) => purchase.date.includes(filters.dateOnly))
    setFilteredPurchases(tempFilter);
    // setFilters({p_id:"",c_id:"",dateOnly:""} )
  }

  return (
    <>
    <h3>Purchases</h3>
    <div style={{width:'300px'}}>
      Filter by Product:
      <div>
  <Combobox
      defaultValue={""}
      data={productsArray}
      dataKey={"id"}
      onSelect={handleSelectProduct}
      onChange={handleChangeProduct}
      textField={"title"}
      />
  </div>
     Filter by Customer:
     <div>
  <Combobox
      defaultValue={""}
      dataKey={"id"}
      textField={item => typeof item === 'string' ? item : item.fname + ' ' + item.lname}
      data={customersArray}
      onSelect={handleSelectCustomer}
      onChange={ handleChangeCustomer}
      />
  </div>
     Filter by Date:
     <div>
  <Combobox
      defaultValue={""}
      data={uniqueDates}
      onSelect={handleSelectDate}
      onChange={ handleChangeDate}
      />
  </div>
      <Button style={{margin:"5px",width:"280px"}} variant='contained' onClick={handleSearch}>Search</Button><br/>
    </div>
      {/* Three comboboxes: products customers dates */}
      {/* a Search button to filter the results */}
      Purchases table:<br/>
      <table border={1}>
        <thead>
          <tr>
          <th>  </th><th>ID</th><th>Customer Name</th><th>Product Title </th><th>Purchase date</th>
          </tr>
        </thead>
        <tbody>
      {filteredPurchases?.map((purchase,index) =>
                        <tr key={index}>
                            <td> <b>{index+1}</b></td>
                            <td> <b>{purchase.id}</b></td>
                            <td>
                              {isAdmin?
                                    <Link to={`/dashboard/edit_customer/${purchase.c_id}`}>{getCustomerFullNameById(purchase.c_id)}</Link>
                                    : getCustomerFullNameById(purchase.c_id)}
                              </td>
                            <td>
                              {isAdmin?
                                    <Link to={`/dashboard/edit_product/${purchase.p_id}`}>{getProductTitleById(purchase.p_id)}</Link>
                                    : getProductTitleById(purchase.p_id)}
                            </td>
                            <td>  {purchase.date}</td>
                        </tr>)}

        </tbody>
      </table>
    </>
  )
}

export default Purchases