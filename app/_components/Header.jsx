import { Button } from "@/components/ui/button";
import { Plus, CircleUserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";


const Header = () => {
  return (
    <div  className="mb-2 p-2 flex justify-between px-2 shadow-sm fixed top-0 w-full z-10 bg-white">
      <div className="flex gap-12 items-center">

       
        <Image 
        src={"/logo.svg"} 
        height={150} 
        width={150} 
        alt="logo-Main" 
        priority={true}
        />


        <ul className="hidden md:flex gap-10">
            <Link href={'/'}> 
            <li className="hover:text-primary font-medium text-sm cursor-pointer">Indoor</li>
            </Link>
         
            <Link href={'/'}> 
          <li className="hover:text-primary font-medium text-sm cursor-pointer" >About</li>
          </Link>

          <Link href={'/'}> 
          <li className="hover:text-primary font-medium text-sm cursor-pointer" >Register</li>
          </Link>
        </ul>
      </div>
      <div className="flex gap-2 items-center">
        {/* Button with icon-only on smaller screens */}
        <Button className="flex gap-2">
          <Plus className="sm:hidden" /> 
          <span className="hidden sm:inline">Register</span> 
        </Button>

        <Button variant="outline" className="flex gap-2">
          <CircleUserRound className="sm:hidden" /> {/* Icon-only for smaller screens */}
          <span className="hidden sm:inline">Login</span> {/* Text appears on larger screens */}
        </Button>
      </div>
    </div>
  );
};

export default Header;
