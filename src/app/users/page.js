'use client'
import { useProfile } from "@/component/UseProfile";
import UserTabs from "@/component/layout/UserTabs";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function UserPage(){

    const[users,setUsers]=useState([]);
    const {loading,data}=useProfile();

    useEffect(()=>{
        fetch('api/users').then(response=>{
            response.json().then(users=>{
                setUsers(users);
            })
        })
    },[])

    if(loading){
        return 'Loading user info...';
    }
    if(!data.admin){
        return 'Not an Admin';
    }

    return(
        <section className="max-w-2xl mx-auto mt-8">
            <UserTabs isAdmin={true}/>
            <div className="mt-8">
                {users?.length>0 && users.map(user=>(
                    <div className="bg-gray-100 rounded-lg mb-2 p-1 flex px-4 items-center gap-4"
                    key={user._id}

                    >
                     <div className="grid grid-cols-2 md:grid-cols-3 gap-4 grow">
                      <div>
                       {user.name && (<span>{user.name}</span>)}
                       {!user.name && (<span className="italic text-gray-500">No Name</span>)}
                      </div> 
                      <span className="text-gray-500">{user.email}</span>
                     </div>
                      <div>
                        <Link className="button" href={'/users/'+user._id}>
                            Edit
                        </Link>
                      </div>  
                    </div>
                ))}
            </div>
        </section>
    )
}