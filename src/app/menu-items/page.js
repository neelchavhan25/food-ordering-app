"use client"
import { useProfile } from "@/component/UseProfile" 
import Right from "@/component/icons/Right";
import UserTabs from "@/component/layout/UserTabs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function MenuItemsPage(){

    const {loading,data}=useProfile();
    const [menuItems,setMenuItems]=useState([]);

    useEffect(() => {
        fetch('/api/menu-items').then(res => {
          res.json().then(menuItems => {
            setMenuItems(menuItems);
          });
        })
      }, []);
    

    if(loading){
        return 'Loading items';
    }
    if(!data.admin){
        return "Not an Admin"
    }
    return(
       <section className="mt-8 max-w-2xl mx-auto">
        <UserTabs isAdmin={true}/>
            <div className="mt-8">
                <Link href={'/menu-items/new'}
                    className="button gap-2" >
                    <span>Create new menu item</span>
                    <Right />
                </Link>
            </div>
            <div> 
                <h2 className="mt-8 text-sm text-gray-500 ">Edit Menu Items</h2>
                <div className="grid grid-cols-3 gap-2">
                    {menuItems?.length > 0 && menuItems.map(item => (
                        <Link href={'/menu-items/edit/' + item._id} 
                            className="bg-gray-200 p-4 rounded-lg">
                            <div className="">
                              <div className="relative  ">
                                  <Image className="rounded-md" src={item.image} alt="" width={200} height={200} />
                              </div>
                              <div className="text-center ">
                              {item.name}
                              </div>
                            </div>
                            
                        </Link>
                    ))}
                </div>
                
            </div>
       </section>
    )
}