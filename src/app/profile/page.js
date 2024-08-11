'use client';
import { useSession } from "next-auth/react"
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import InfoBox from "../../component/layout/InfoBox" 
import {toast} from "react-hot-toast";
import Link from "next/link";
import UserTabs from "../../component/layout/UserTabs"; 
import UserForm from "@/component/layout/UserForm"

export default function ProfilePage() {
    const session = useSession();
    const { status } = session;

    const [user,setUser]=useState(null);
    const [saving,setSaving]=useState(false);
    const [isAdmin,setIsAdmin]=useState(false);
    const [profileFetched,setProfileFetched]=useState(false)

    useEffect(()=>{ 
        if(status==='authenticated'){ 
             fetch('/api/profile').then(response=>{
                response.json().then(data=>{
                    setUser(data);
                    setIsAdmin(data.admin);
                    setProfileFetched(true);
                })
            })
        }
    },[session,status]);
    
    async function handleProfileInfoUpdate(ev,data){ 
        ev.preventDefault(); 
        setSaving(true);
        const response = await fetch('/api/profile', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
          });
          setSaving(false);
          if(response.ok){
            console.log('Toast triggered');

            toast.success('Saved');
          }
    }

    
    if (status === 'loading' || !profileFetched) {
        return "loading...";
    }

    if (status === 'unauthenticated') {
        return redirect(`/login`);
    }

    
    return (
        <section className="mt-8 ">
            <UserTabs isAdmin={isAdmin} />
            <h1 className="text-center text-primary text-4xl mb-4">
                Profile
            </h1>
            
            <div className="max-w-xl mx-auto "> 
                {saving && (
                    <InfoBox>Saving...</InfoBox>
                )} 
                <UserForm user={user} onSave={handleProfileInfoUpdate}/>
            </div>
        </section>
    )
}