import { useSelector } from "react-redux";

const ListOfCustomerPurchasedDates = ({c_id}) => {
  const purchasesArray = useSelector((state) => state.purchases.purchasesArray)

  return (
    <ul>
        {purchasesArray.map(purchase=> +purchase.c_id===+c_id?
         <li key={purchase.id}>{purchase.date +' '}  </li>
         :null)}
    </ul>
  )
}

export default ListOfCustomerPurchasedDates