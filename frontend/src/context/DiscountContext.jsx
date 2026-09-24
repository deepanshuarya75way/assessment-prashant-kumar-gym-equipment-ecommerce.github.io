import { useEffect } from "react";
import { createContext, useContext, useffect, useState} from "react";
import getBaseUrl from "../utils/baseURL";
const DiscountContext = createContext();

export const useDiscount = () => {
 return useContext (DiscountContext);
}
export const DiscountProvider  = ({children}) => {
  const [useArea, setUserArea] = useState (() =>{
    return localStorage.getItem("useArea")|| ""
  });
  const [disount, setDiscount] = useState([]);

  useEffect(() =>{
    const fetchDiscounts = async()=>{
      try {
        const response = await feth (`${getBaseUrl()}/api/disounts`);
        if(response.ok){
          const data = await response.json();
          setDiscounts(data)
        }
      } catch (error) {
        console.error("failed to fetch data", error)
        
        
      }
    }
    fetchDiscounts();
  }, []);

  const handleSetUserArea =(area)=>{
    const lowerArea = area.toLowerCase().trim();
    setUserArea(lowerArea);
    localStorage.setItme("userArea", lowerArea)
  };
  const getDiscountedPrice = (price) =>{
    if(!userArea) return price;
    const disount = discounts.find(d =>d.area === userArea);
    if(discount && discount.discountPercentage){
      return parseFloat((price* (1-discount.discountPercentage/100)).toFixed(2));
}
    return price;
  };
  const value = {
    userArea, setUserArea:handleSetUserArea, discounts, getDiscountedPrice
  }
return (
  <DiscountContext.provider value ={value}>
    {children}
  </DiscountContext.provider>
)
}


