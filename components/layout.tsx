import React, { ReactNode } from 'react';
// import { Toaster } from "@/components/ui/toaster"
import { Inter } from "next/font/google";
import Link from 'next/link';
const inter = Inter({ subsets: ["latin"] });
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sooner } from "@/components/ui/sonner"
import { HamburgerMenuIcon } from "@radix-ui/react-icons"

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <main className={`bg-stone-100 ${inter.className}`}>
            <Toaster />
            <Sooner />
            <header className="bg-stone-100 py-4">
                <div className="px-4 md:container mx-auto text-center text-stone-950 flex flex-row items-center justify-between">
                    <Link href={"/"}>
                        <h1 className="text-2xl font-semibold">Contacts</h1>
                    </Link>
                  <div className='flex w-auto justify-center items-center md:hidden'>
                        <Sheet>
                            <SheetTrigger>
                                <HamburgerMenuIcon 
                                    className='w-5 h-5 text-stone-950 hover:text-indigo-600 cursor-pointer mb-0'
                                />
                            </SheetTrigger>
                            <SheetContent>
                                <SheetHeader>
                                    {/* <SheetTitle>Are you absolutely sure?</SheetTitle> */}
                                    <SheetDescription>
                                        <ul className="flex flex-col text-start py-4 gap-4 text-stone-950 font-bold">
                                            <li>
                                                <Link href="/">
                                                    Home
                                                </Link>
                                            </li>
                                            <li>
                                                <a href="https://zulzidan.com/about" target='_blank'>
                                                    About Me
                                                </a>
                                            </li>
                                        </ul>
                                    </SheetDescription>
                                </SheetHeader>
                            </SheetContent>
                        </Sheet>
    
                  </div>
                    <nav className='hidden md:flex '>
                        <ul className="hidden md:flex justify-center gap-4">
                            <li>
                                <Link href="/">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <a href="https://zulzidan.com/about" target='_blank'>
                                    About Me
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
            <main className='px-4 md:container '>
                {children}
            </main>
            <footer className="bg-stone-100 py-4">
                <div className="container mx-auto text-center text-stone-950">
                    <p>&copy; 2022 DikshaTech. All rights reserved.</p>
                    <div className="flex justify-center space-x-4 mt-2">
                        <Link href="/privacy-policy" className="text-stone-950 hover:text-indigo-600">Privacy Policy</Link>
                        <Link href="/terms-of-service" className="text-stone-950  hover:text-indigo-600">Terms of Service</Link>
                        <Link href="/contact-us" className="text-stone-950 hover:text-indigo-600">Contact Us</Link>
                    </div>
                </div>
            </footer>
            {/* <Toaster /> */}
        </main>
    );
};

export default Layout;