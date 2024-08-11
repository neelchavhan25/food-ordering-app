 "use client";
import {useProfile}  from "../../../component/UseProfile" 
import UserTabs from "@/component/layout/UserTabs"
import EditableImage from "@/component/layout/EditableImage";
import { useState } from "react"; 
import toast from "react-hot-toast";
import Link from "next/link";
import Left from "@/component/icons/Left";
import { redirect } from "next/navigation";
import MenuItemForm from "@/component/layout/MenuItemForm";

export default function NewMenuItemPage(){
 
    const [redirectToItems,setRedirectToItems]=useState(false);
    const {loading,data}=useProfile();

    async function handleFormSubmit(ev,data){
        ev.preventDefault(); 
        const savingPromise =new Promise(async(resolve,reject)=>{
            const response=await fetch('/api/menu-items',{
                method:'POST',
                body:JSON.stringify(data),
                headers:{'Content-Type':'application/json'},
            });
            if(response.ok){
                resolve();
            }
            else 
                reject();
        })
        await toast.promise(savingPromise,{
            loading:'Saving this items',
            success:'Saved',
            error:'Error'
        })
        
        setRedirectToItems(true);
    } 
    if(redirectToItems){
        return redirect('/menu-items')
    }
    if(loading){
        return "Loading..."
    }
    if(!data.admin){
        return "Not a admin";
    }
    return(
        <section className="mt-8">
        <UserTabs isAdmin={true}/>
        <div className="max-w-lg mx-auto mt-8">
            <Link href={'/menu-items'}
                  className="button gap-2" >
                <Left/>
                <span>Show all menu items</span>
            </Link>
        </div>
        <MenuItemForm menuItem={null} onSubmit={handleFormSubmit}/>
    </section>
    )
}