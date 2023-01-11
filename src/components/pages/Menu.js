import { collection, getDocs } from 'firebase/firestore'
import { useEffect } from 'react'
import {Link, Outlet} from 'react-router-dom'
import { db } from '../../firebase-config'
import {useDispatch} from 'react-redux'
import { setFirebaseFetchedProducts } from '../../features/products/productsSlice'
import { setFirebaseFetchedCustomers } from '../../features/customers/customersSlice'
import { setFirebaseFetchedPurchases } from '../../features/purchases/purchasesSlice'
import { setFirebaseFetchedUser ,setUserRoleAsAdmin, setUserRoleAsSimpleUser} from '../../features/user/userSlice'
import '../../App.css'
const Menu = () => {
    //1. Grab 3 collections(products, customers, purchases) data from db and store to local rtk(redux-toolkit)
    const dispatch = useDispatch();
    useEffect(() => {
        const tmpProductsArray = []
        const tmpCustomersArray = []
        const tmpPurchasesArray = []
        const tmpUsersArray = []
        const currentUserEmail = sessionStorage.getItem("userEmail");
        const myGetDocs = async() =>{
          const querySnapshotUsers = await getDocs(collection(db, "users"));
            const querySnapshotProducts = await getDocs(collection(db, "products"));
            const querySnapshotCustomers = await getDocs(collection(db, "customers"));
            const querySnapshotPurchases = await getDocs(collection(db, "purchases"));
            querySnapshotUsers.forEach((doc,index) => {
              // doc.data() is never undefined for query doc snapshots
              tmpUsersArray.push({...doc.data(),id: doc.id});
            });
            dispatch(setFirebaseFetchedUser(currentUserEmail))
            if (tmpUsersArray && checkIfAdmin(tmpUsersArray, currentUserEmail ))
            {
              dispatch(setUserRoleAsAdmin())
            }else{
              dispatch(setUserRoleAsSimpleUser())
            }
            querySnapshotCustomers.forEach((doc,index) => {
              // doc.data() is never undefined for query doc snapshots
              tmpCustomersArray.push({...doc.data(),id: doc.id});
            });
            dispatch(setFirebaseFetchedCustomers(tmpCustomersArray))
            querySnapshotProducts.forEach((doc,index) => {
              // doc.data() is never undefined for query doc snapshots
              tmpProductsArray.push({...doc.data(),id: doc.id});
            });
            dispatch(setFirebaseFetchedProducts(tmpProductsArray))
            querySnapshotPurchases.forEach((doc,index) => {
              // doc.data() is never undefined for query doc snapshots
            //   const myStringDate = new Timestamp(doc.data().date.seconds , doc.data().date.nanoseconds).toDate().toDateString();
            //   console.log(myStringDate);
              tmpPurchasesArray.push({...doc.data(),id: doc.id});
            });
            dispatch(setFirebaseFetchedPurchases(tmpPurchasesArray))
            console.log("tmpUsersArray", tmpUsersArray);
            console.log("tmpProductsArray", tmpProductsArray);
            console.log("tmpCustomersArray", tmpCustomersArray);
            console.log("tmpPurchasesArray", tmpPurchasesArray);
        }
        myGetDocs();
    }, [dispatch])
    const checkIfAdmin = (usersArray, userEmail) => {
      const user = usersArray.find(user =>
        user.email === userEmail)
        console.log("userEmail in checkIfAdmin", userEmail);
        console.log("usersArray in checkIfAdmin", usersArray);
        console.log("user in checkIfAdmin", user);
      return user?.role === 'admin';
    }

  return (
    <div >
        <nav>
          <Link className='link' to='products'>Products </Link>
          <Link className='link' to='customers'>Customers </Link>
          <Link className='link' to='purchases'>Purchases </Link><br/>
        </nav>
        <Outlet/>
    </div>
  )
}
export default Menu