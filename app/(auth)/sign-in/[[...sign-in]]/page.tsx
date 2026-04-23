
//SAMAJH GAYA 
"use client"
import { SignIn } from "@clerk/nextjs"
import { useTheme } from "next-themes"
import { dark } from "@clerk/themes"

export default function page() {

    const {theme, setTheme} = useTheme();
    
         return (
                <div className="flex min-h-min justify-center">
            <SignIn appearance={{
        baseTheme: theme === "light" ? dark : undefined,
      }} 
        />
    </div>
         );
}