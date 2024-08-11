"use client";
import { useProfile } from "@/component/UseProfile";
import UserTabs from "@/component/layout/UserTabs";
import UserForm from "../../../component/layout/UserForm"
import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; 
import toast from "react-hot-toast";

export default function EditUserPage(){
    const {loading,data}=useProfile();
    const [user,setUser]=useState(null);
    const {id}=useParams();

    useEffect(()=>{
        fetch('/api/profile?_id='+id).then(res=>{
            res.json().then(user=>{
              setUser(user)
            })
        })
    },[]) 

    async function handleSaveButtonClick(ev,data){
        ev.preventDefault();
        const promise = new Promise(async (resolve, reject) => {
            const res = await fetch('/api/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...data, _id: id }),
            });
            if (res.ok)
                resolve();
            else
                reject();
        });

        await toast.promise(promise, {
            loading: 'Saving user...',
            success: 'User saved',
            error: 'An error has occurred while saving the user',
        });
    }

    if(loading){
        return 'Loading user info...'
    }
    if(!data.admin){
        return 'Not an Admin';
    }

    return(
        <section className="mt-8 ">
            <UserTabs isAdmin={true}/>
            <div className="mt-8">
                <UserForm user={user} onSave={handleSaveButtonClick}/>
            </div>
        </section>
    )
}