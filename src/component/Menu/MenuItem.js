import { useContext, useState } from "react";
import { CartContext } from "../AppContext"
import toast from "react-hot-toast";
import MenuItemTile from "./MenuItemTile";
import Image from "next/image";

export default function MenuItem(menuItem){
    const {image,name,description ,basePrice,sizes,extraIngredientPrices}=menuItem;
    const {addToCart}=useContext(CartContext); 
    const [showPopup,setShowPopup]=useState(false);
    const [selectedSize,setSelectedSize]=useState(sizes?.[0] || null);
    const [selectedIngredients,setSelectedIngredients]=useState([]);

    function handleAddToCartButtonClick(){ 

        const hasOption = sizes.length > 0  && extraIngredientPrices.length > 0;
         if(hasOption && !showPopup){
            setShowPopup(true); 
            return;
         }
  
        addToCart(menuItem,selectedSize,selectedIngredients);
        toast.success('Added To Cart!')
        setShowPopup(false); 
    }

    function handleExtraThingClick(ev,extraThing){
        const checked =ev.target.checked;
        if(checked){
            setSelectedIngredients(prev=>[...prev,extraThing]);
        }
        else{
            setSelectedIngredients(prev=>{
              return prev.filter(e=>e?.name !== extraThing.name)
            })
        }
    }
    let selectedPrice=basePrice;
    if(selectedSize){
        selectedPrice +=selectedSize.price;
    }
    if(selectedIngredients?.length>0){
        for(const extra of selectedIngredients){
            selectedPrice+=extra.price;
        }
    }

    return (
        <>
          {showPopup &&(
            <div onClick={()=>setShowPopup(false)}
              className="fixed inset-0 bg-black/80 flex items-center justify-center ">
                <div onClick={ ev=>ev.stopPropagation()} 
                 className="my-8 bg-white p-2 rounded-lg max-w-md ">
                 <div className=" overflow-y-scroll p-2" style={{maxHeight:'calc(100vh - 80px'}}>
                 <Image src={image} alt={name} width={300} height={200} className="mx-auto"/>
                 <h2 className=" text-lg font-bold text-center mb-2">{name}</h2>
                 <p className="text-center text-gray-500 text-sm mb-2">{description}</p> 
                 {sizes?.length>0 && (
                    <div className=" py-2">
                        <h3 className="text-center text-gray-700 ">Pick your Size</h3>
                        {
                        sizes.map(size=>(
                            <labal className="bg-slate-100 flex items-center gap-2 p-4 mb-1 border rounded-lg">
                                <input type="radio" 
                                    onClick={()=>setSelectedSize(size)}
                                    checked={selectedSize?.name === size.name}
                                   name='size'/>
                                 {size.name} Rs.{basePrice +size.price}
                            </labal>
                        ))
                        }
                    </div>
                 )}
                 {extraIngredientPrices?.length>0 &&(
                    <div className=" py-2">
                        <h3 className="text-center text-gray-700 ">Pick your Extra Ingredient</h3> 
                        {
                            extraIngredientPrices.map(extra=>(
                            <labal className="bg-slate-100 flex items-center gap-2 p-4 mb-1 border rounded-lg">
                                <input type="checkbox" 
                                onClick={ev=> handleExtraThingClick(ev,extra)}
                                name={extra.name}/> 
                                {extra.name} +Rs.{extra.price}
                            </labal>
                        ))
                        }
                    </div>
                 )}
                 <button onClick={handleAddToCartButtonClick} 
                   className="primary sticky bottom-0" type="button">
                    Add To cart Rs.{selectedPrice}
                 </button> 
                 <button className="mt-3" 
                    onClick={()=> setShowPopup(false)} type="button">Cancel</button>  
                 </div> 
                </div> 
            </div>
          )}
          <MenuItemTile onAddToCart={handleAddToCartButtonClick} {...menuItem}/>
        </>
    )
}