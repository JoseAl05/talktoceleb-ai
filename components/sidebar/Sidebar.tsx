'use client'

import { cn } from '@/lib/utils';
import { Home, Plus, Settings } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

const Sidebar = () => {

    const pahtname = usePathname();
    const router = useRouter();

    const routes = [
        {
            icon: Home,
            href: '/',
            label: 'Home',
            isPro: false
        },
        {
            icon: Plus,
            href: '/celeb/new',
            label: 'Create',
            isPro: true
        },
        {
            icon: Settings,
            href: '/settings',
            label: 'Settings',
            isPro: false
        },
    ]

    const onNavigate = (url: string, isPro: boolean) => {
        // CHECK IF USER IS PRO

        return router.push(url);
    }

    return (
        <div className='flex flex-col text-primary bg-secondary h-full space-y-4'>
            <div className='flex flex-1 justify-center p-3'>
                <div className='space-y-2'>
                    {
                        routes.map(route => (
                            <div
                                key={route.href}
                                onClick={() => onNavigate(route.href, route.isPro)}
                                className={cn(
                                    `
                                        flex
                                        justify-start
                                        w-full
                                        p-3
                                        text-muted-foreground
                                        text-xs
                                        font-medium
                                        rounded-lg
                                        cursor-pointer
                                        transition
                                        group
                                        hover:text-primary
                                        hover:bg-primary/10
                                    `,
                                    pahtname === route.href && 'bg-primary/10 text-primary'
                                )}
                            >
                                <div className='flex flex-col flex-1 items-center gap-y-2'>
                                    <route.icon className='h-5 w-5' />
                                    {route.label}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default Sidebar;