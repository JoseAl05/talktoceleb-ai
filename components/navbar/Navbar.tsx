'use client'

import { cn } from '@/lib/utils';
import { UserButton } from '@clerk/nextjs';
import { Sparkles } from 'lucide-react';
import { Poppins } from 'next/font/google';
import Link from 'next/link'
import { Button } from '../ui/button';
import { ModeToggle } from '../theme/ModeToggle';
import MobileSidebar from '../sidebar/MobileSidebar';

const font = Poppins({
    weight: '600',
    subsets: ['latin']
})

const Navbar = () => {
    return (
        <div className='fixed flex justify-between items-center py-2 px-4 w-full h-16 border-b border-primary/10 bg-secondary z-50'>
            <div className='flex items-center'>
                <MobileSidebar />
                <Link href='/'>
                    <h1 className={
                        cn(
                            'hidden text-xl text-primary font-bold md:text-3xl md:block',
                            font.className
                        )
                    }
                    >
                        Talk to Celeb
                    </h1>
                </Link>
            </div>
            <div className='flex items-center gap-x-3'>
                <Button size='sm' variant='premium'>
                    Upgrade
                    <Sparkles
                        className='h-4 w-4 fill-white text-white ml-2'
                    />
                </Button>
                <ModeToggle />
                <UserButton afterSignOutUrl='/' />
            </div>
        </div>
    );
}

export default Navbar;