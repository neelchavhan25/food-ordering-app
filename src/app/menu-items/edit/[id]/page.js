"use client";
import {useProfile}  from "@/component/UseProfile" 
import UserTabs from "@/component/layout/UserTabs"
import MenuItemForm from "@/component/layout/MenuItemForm";
import { useEffect, useState } from "react"; 
import toast from "react-hot-toast";
import Link from "next/link";
import Left from "@/component/icons/Left";
import { redirect, useParams } from "next/navigation";
import DeleteButton from "../../../../component/DeleteButton";

export default function EditMenuItemPage(){
    
    const {id}=useParams();
    
    const [redirectToItems,setRedirectToItems]=useState(false);
    const {loading,data}=useProfile();
     const [menuItem,setMenuItem]=useState(null);
    useEffect(()=>{
        fetch('/api/menu-items').then(res=>{
            res.json().then(items =>{
                const item=items.find(i=> i._id === id);
                setMenuItem(item);
            })
        })
    },[])
    async function handleFormSubmit(ev,data){
        ev.preventDefault(); 
         data={...data,_id:id}
        const savingPromise =new Promise(async(resolve,reject)=>{
            const response=await fetch('/api/menu-items',{
                method:'PUT',
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

    async function handleDeleteClick(){
        const promise=new Promise(async(resolve,reject)=>{
          const response= await fetch('/api/menu-items?_id='+id,{
                method:'DELETE',
            })
            if(response.ok){
                resolve();
            }
            else{
                reject()
            }
        }) 

        toast.promise(promise,{
            loading:"Deleting...",
            success:'Deleted',
            error:'Error',
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
        <div className="max-w-md mx-auto mt-8">
            <Link href={'/menu-items'}
                  className="button gap-2" >
                <Left/>
                <span>Show all menu items</span>
            </Link>
        </div> 
       <MenuItemForm menuItem={menuItem} onSubmit={handleFormSubmit}/>
       <div className="max-w-md mx-auto mt-2">
         <div className="max-w-xs ml-auto pl-4">
         <DeleteButton label={'Delete this menu item'} onDelete={handleDeleteClick}/> 
         </div>
       </div>
    </section>
    )
}