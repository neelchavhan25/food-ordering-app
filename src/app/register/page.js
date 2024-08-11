"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage(){
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const [creatingUser,setCreatingUser]=useState(false);
    const [userCreated,setUserCreated]=useState(false);
    const [error ,setError]=useState(false)

    async function handleFormSubmit(ev){
        ev.preventDefault();
        setCreatingUser(true);
        setError(false);
        setUserCreated(false); 
        const response= await fetch('/api/register' , {
                method:'POST',
                body: JSON.stringify({email,password}),
                headers :{'Content-type': 'application/json'},
            });
            if(response.ok){
                
                setUserCreated(true);
            }
            else{
                setError(true); 
            }
            
            setCreatingUser(false);
    }

    return(
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl mb-4">
                Register
            </h1>
            {error && (
                <div className="my-4 text-center">
                    Error <br/> Please try again 
                </div>
            )}
            {userCreated && (
                <div className="my-4 text-center">
                    User created.<br/> Now you can{' '} 
                    <Link className="text-blue-700 underline" href={"/login"}>Login</Link>
                </div>
            )}
           
            <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
                <input type="email" placeholder="email" value={email} 
                disabled={creatingUser}
                onChange={ev=>setEmail(ev.target.value)}/>
                <input type="password" placeholder="password" value={password}
                disabled={creatingUser}
                    onChange={ev=>setPassword(ev.target.value)}
                />
                <button type="submit" disabled={creatingUser}>Register</button>
                <div className="my-4 text-center text-gray-500 ">
                    or login with provider                
                </div>
                <button className="flex gap-4 justify-center"
                    onClick={()=>signIn('google',{callbackUrl:'/'})}>
                    <Image src={'/google.png'} alt="" width={24} height={24} />
                    Login with Google
                </button>
                <div className="text-center my-4 text-gray-500 border-t pt-4">
                    Existing Account?{' '} 
                    <Link className="underline text-gray-700" href={'/login'} >Login here</Link>
                </div>
            </form>
           
        </section>
    )
}