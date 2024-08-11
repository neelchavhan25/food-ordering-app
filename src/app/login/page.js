"use client" 
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

export default function LoginPage(){
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const [loginProgress,setLoginrogress]=useState(false);

    async function handleFormSubmit(ev){
        ev.preventDefault();
        setLoginrogress(true);
       
        await signIn('credentials',{email,password,callbackUrl:'/'});
        setLoginrogress(false);
    }

    return (
        <section className="mt-8">
             <h1 className="text-center text-primary text-4xl mb-4">
                Login
            </h1>
            <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
                <input type="email" placeholder="email" value={email} 
                disabled={loginProgress}
                onChange={ev=>setEmail(ev.target.value)}/>
                <input type="password" placeholder="password" value={password}
                    disabled={loginProgress}
                    onChange={ev=>setPassword(ev.target.value)}
                />
                <button type="submit"
                    disabled={loginProgress}
                    >Login</button>
                <div className="my-4 text-center text-gray-500 ">
                    or login with provider                
                </div>
                <button type="button" onClick={()=>signIn('google',{callbackUrl:'/'})} 
                    className="flex gap-4 justify-center">
                    <Image src={'/google.png'} alt="" width={24} height={24} />
                    Login with Google
                </button> 
                
            </form>
        </section>
    )
}