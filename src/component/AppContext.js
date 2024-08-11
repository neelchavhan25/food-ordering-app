"use client";
import { set } from "mongoose";
import { SessionProvider } from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const CartContext=createContext({});

export function cartProductPrice(cartProduct){
  let price=cartProduct.basePrice;
  if(cartProduct.size){
    price+=cartProduct.size.price;
  }
  if(cartProduct.extras?.length>0){
    for(const extra of cartProduct.extras){
      price+=extra.price;
    }
  }
  return price;
}

export default function AppProvider({children}){
    const [cartProducts,setCartProducts]=useState([]);
    const ls=typeof window !=='undefined' ? window.localStorage :null;

    useEffect(()=>{
      if(ls && ls.getItem('cart')){
        setCartProducts(JSON.parse(ls.getItem('cart')))
      }
    },[]);

    function clearCart(){
      setCartProducts([]);
      saveCartProductToLocalStorage([]);
    }

    function removeCartProduct(indexToRemove){
      setCartProducts(prev=>{
        const newCartProduct=prev.filter((v,index)=> index!==indexToRemove);
        saveCartProductToLocalStorage(newCartProduct);
        return newCartProduct;
      })
      toast.success("Product Removed")
    }

    function saveCartProductToLocalStorage(cartProducts){
      if(ls){
        ls.setItem('cart',JSON.stringify(cartProducts))
      }
    }

    function addToCart(product,size=null,extras=[]){
        setCartProducts(prevProducts=>{
            const cartProduct={...product,size,extras}
            const newProducts=[...prevProducts,cartProduct]; 
            saveCartProductToLocalStorage(newProducts);
            return newProducts;
        })
    }

   
    return(
        <SessionProvider>
          <CartContext.Provider value={
            {cartProducts,setCartProducts,addToCart,removeCartProduct,clearCart}
          }>
            {children}
          </CartContext.Provider>
        </SessionProvider>
    )
}