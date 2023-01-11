import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom'
import '../styles.css'
import {db} from '../../firebase-config'
import { collection, getDocs } from "firebase/firestore";
import ClipLoader from 'react-spinners/ClipLoader';
import { IconButton } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const HomePage = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([])
    const [loadingInProgress, setLoading] = useState(false);
    useEffect(() => {
        const tmpProductsArray = []
        const myGetDocs = async() =>{
            setLoading(true);
            const querySnapshot = await getDocs(collection(db, "products"));
            querySnapshot.forEach((doc,index) => {
              // doc.data() is never undefined for query doc snapshots
              tmpProductsArray.push({...doc.data(),id: doc.id});
            });
            setProducts(tmpProductsArray)
            console.log("tmpProductsArray", tmpProductsArray);
        }
        myGetDocs();
        setLoading(true);
    }, [])
    return (
        <div>
            <div className='top_left'>
                <Button variant="contained" style={{textTransform: "none"}} onClick={()=>{navigate('/login')}}>Login</Button>{' '}
                <Button variant="contained" style={{textTransform: "none"}} onClick={()=>{navigate('/register')}}>Register</Button>
            </div>
            <h2>Home Page</h2>
            products:<br/>
            {
                !loadingInProgress ?
                <div className="loader-container">
                <ClipLoader color={'#fff'} size={150} />
                </div> :
                products.map(product=>
                    <div key={product.id} className={"product_box"}>
                        <b>P_ID: {product.id}</b><br/><br/>
                        Title: {product?.title}<br/>
                        Price: {product?.price}<br/>
                        Quantity: {product.quantity}<br/>
                        <IconButton color="primary" aria-label="add to shopping cart">
                          <AddShoppingCartIcon onClick={()=>alert("please login to make a purchase..")}/>
                        </IconButton>
                    </div>
                )

            }
            <div>

            </div>
        </div>
    )
}

export default HomePage