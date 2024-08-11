import Link from "next/link"; 
import Header from "../component/layout/Header"
import Hero from "../component/layout/Hero"
import HomeMenu from "../component/layout/HomeMenu"
import Image from "next/image";
import SectionHeaders from "@/component/layout/SectionHeaders";

export default function Home() {
  return (
    <>
      
      <Hero />
      <HomeMenu />
      <section className="text-center my-16 " id="about">
        <SectionHeaders
          subHeader={'Our Story'}
          mainHeader ={'About us'}
        />  
        <div className="text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4">
          <p className="">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
            mollit anim id est laborum.
          </p>
          <p className="">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,  sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </section>
      <section className=" text-center my-8" id="contact">
      <SectionHeaders
          subHeader={`Don\'t hesitate`}
          mainHeader ={'Contact us'}
        />
        <div className="mt-8 underline">
        <a className="text-2xl " href="tel:+918468976214">+91 1888 23 48</a>
        </div>
      </section>
     
    </>
  );
}
