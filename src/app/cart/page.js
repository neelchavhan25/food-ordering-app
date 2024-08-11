"use client"
import { CartContext, cartProductPrice } from "@/component/AppContext";
import SectionHeaders from "@/component/layout/SectionHeaders";
import Trash from "@/component/icons/Trash"
import Image from "next/image";
import AddressInputs from "@/component/layout/AddressInputs";
import { useContext, useEffect, useState } from "react";
import { useProfile } from "@/component/UseProfile";
import CartProduct from "../../component/Menu/CartProduct";

export default function CartPage(){
    const {cartProducts,removeCartProduct}=useContext(CartContext);
    const [address,setAddress]=useState({})
    const {data:profileData}=useProfile();

    useEffect(()=>{
        if(profileData?.city){
            const {phone,streetAddress,city,postalCode,country}=profileData;
            const addressFromProfile={
                phone,streetAddress,
                city,postalCode,
                country
            }
            setAddress(addressFromProfile)
        }
    },[profileData])
    let total=0;
    for(const p of cartProducts){
        total+=cartProductPrice(p);
    }
    function handleAddressChange(propName,value){
        setAddress(prev=>{
            return{...prev,[propName]:value}
        })
    }

    return(
        <section className="mt-8">
         <div className="text-center">
            <SectionHeaders mainHeader={"Cart"} />
         </div> 
            <div className="mt-8 grid gap-8 grid-cols-2">
                <div> 
                    {cartProducts?.length ===0  && (
                        <div>No products in your shopping cart</div>
                    )}
                    {cartProducts?.length > 0 && cartProducts.map((product, index) => (
                        <CartProduct
                            key={index}
                            product={product}
                            onRemove={removeCartProduct}
                        />

                    ))} 
                    <div className="py-2 text-right pr-16">
                        <span className="text-gray-500">Total: &nbsp;</span>
                        <span className="text-lg font-semibold">Rs.{total}</span>
                    </div>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg"> 
                  <h2>Checkout</h2>
                  <form>
                    <label>Address</label>
                    <AddressInputs addressProps={address} 
                        setAddressProps={handleAddressChange}
                    />
                    <button type="submit">Pay Rs.{total}</button>
                  </form>
                </div>
            </div>
        </section>
    )
}