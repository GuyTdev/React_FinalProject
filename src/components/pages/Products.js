import { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import ProdCustomerBox from '../ProdCustomerBox'
import '../styles.css'
const Products = () => {
  const productsArray = useSelector((state) => state.products.productsArray)
  const purchasesArray = useSelector((state) => state.purchases.purchasesArray)
  const isAdmin = useSelector((state) => state.user.isAdmin)
  const [products, setProducts] = useState([])
  const [purchases, setPurchases] = useState([])
  const [totalPurchases, setTotalPurchases] = useState(0)
  const navigate = useNavigate();
  useEffect(() => {
    setProducts(productsArray)
    setTotalPurchases(purchasesArray.length)
    setPurchases(purchasesArray)
  }, [productsArray,purchasesArray])
  return (
    <div>
      {/* Show data related to Product. */}
      {/* All viewing and filtered data show will execute via rtk  . */}
      {/* All CRUD Operations will execute via firestore db  . */}
      <h3>Products</h3>
      <div className='total_purchases_box' onClick={()=>navigate('/dashboard/purchases')}>Total: {totalPurchases}</div>
      {!products?
        <div>Loading...</div>
        : products?.map(product => <div key={product.id} className={"product_box"}>
                                            <b>P_ID: {product.id}</b><br/><br/>
                                            Title: {isAdmin?
                                                    <Link to={`/dashboard/edit_product/${product.id}`}>{product.title}</Link>
                                                    :product.title
                                                    }<br/>
                                            Price: {product.price}<br/>
                                            Quantity: {product.quantity}<br/>
                                            {purchases.map(purchase=> +purchase.p_id === +product.id && purchase.c_id? 
                                            <ProdCustomerBox key={purchase.id} c_id={purchase.c_id} isAdmin={isAdmin} purDate={purchase.date} />
                                            :null)}
                                        </div>

                        )}
    </div>
  )
}

export default Products