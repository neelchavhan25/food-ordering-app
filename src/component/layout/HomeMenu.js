'use client'
import Image from "next/image";
import MenuItem from "../Menu/MenuItem";
import SectionHeaders from "./SectionHeaders"
import { useEffect, useState } from "react";

export default function HeroMenu(){

   const [bestSellers,setBestSellers]=useState([]);

   useEffect(()=>{
      fetch('/api/menu-items').then(res=>{
         res.json().then(menuItems=>{
            const bestSeller=menuItems.slice(-3);
            setBestSellers(bestSeller); 
         })
      })
   },[]) 
   return (
        <section >
        <div className="absolute left-0 right-0 w-full justify-start">
         <div className="  absolute left-0 -top-16 -z-10">
            <Image src={'/sallad1.png'} width={107} height={195} alt="salad"/>
         </div>
         <div className=" absolute right-0 -top-36 -z-10">
            <Image src={'/sallad2.png'} width={107} height={195} alt="salad"/>
         </div>
        </div>
        
        <div className="text-center mb-4">
         <SectionHeaders subHeader={"check out"} mainHeader={"Our Best Sellers"} />
        </div>
         <div className="grid grid-cols-3 gap-4">
            {bestSellers.length>0 && bestSellers.map(item=>(
               <MenuItem key={item._id} {...item}/>
            ))}
         </div>
        </section> 
    )
}