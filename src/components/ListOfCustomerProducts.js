import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ListOfCustomerProducts = ({c_id, isAdmin}) => {
    const productsArray = useSelector((state) => state.products.productsArray)
    const purchasesArray = useSelector((state) => state.purchases.purchasesArray)
    const [purchasesOfCustomer, setPurchasesOfCustomer] = useState([])

    useEffect(() => {
        setPurchasesOfCustomer(purchasesArray.filter(purchase => +purchase.c_id=== +c_id))
    }, [productsArray, purchasesArray, c_id])
  return (
    <ul>{
        purchasesOfCustomer.map(purchase=>
            <li key={purchase.id}>
                {
                    isAdmin?
                        <Link to={`/dashboard/edit_product/${purchase.p_id}`}>
                            {productsArray && productsArray.find(product=> +product.id === +purchase.p_id).title}
                        </Link>
                            :productsArray && productsArray.find(product=> +product.id === +purchase.p_id).title
                }
            </li>
        )}
    </ul>
  )
}

export default ListOfCustomerProducts