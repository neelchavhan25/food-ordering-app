'use client';
import { signOut, useSession } from "next-auth/react";
import Link from "next/link"; 
import { useContext } from "react";
import { CartContext } from "../AppContext";
import ShoppingCart from "../icons/ShoppingCart"

export default function Header(){
  const session=useSession();
  const status=session?.status;
  const userData=session.data?.user;
  let UserName=userData?.name || userData?.email;
  const {cartProducts} = useContext(CartContext);
  if(UserName && UserName.includes(' ')){
    UserName=UserName.split(' ')[0];
  }
    return(
        <header className="flex items-center justify-between">
        <nav className="flex items-center gap-8 text-gray-500 font-semibold">
        <Link className="text-primary font-semibold text-2xl" href={'/'}> ST PIZZA</Link>
        <Link href={'/'}>Home</Link>
        <Link href={'/menu'}>Menu</Link>
        <Link href={'/#about'}>About</Link>
        <Link href={'/#contact'}>Contact</Link>
        </nav>
        <nav className="flex items-center gap-4 text-gray-=500 font-semibold">
          {status === 'authenticated' && (
            <>
            <Link href={'/profile'}
            className=" whitespace-nowrap"
            >Hello, {UserName}</Link>
            <button className=" bg-primary rounded-full text-white px-8 py-2"
              onClick={()=>signOut()}
              href={'/login'}>Logout</button>
            </>
            
          )}
          {status ==="unauthenticated" && (
            <> 
               <Link className=" bg-primary rounded-full text-white px-8 py-2" 
                  href={'/login'}>Login</Link>
               <Link className=" bg-primary rounded-full text-white px-8 py-2" 
                  href={'/register'}>Register</Link>
            </>
          )} 
            <Link href={'/cart'} className="relative">
              <ShoppingCart />
              <span className="absolute -top-2 -right-3 bg-primary  text-white text-sm px-1.5 py-1 rounded-full leading-3">
               {cartProducts.length}
              </span> 
            </Link> 
        </nav>
      </header>
    );
}