"use client"

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ThemeToggle } from '@/components/ui/theme/theme-toggle';
import { TooltipTrigger } from '@/components/ui/tooltip';
import { useConversation } from '@/hooks/useConversation';
import { useNavigation } from '@/hooks/useNavigation'
import { UserButton } from '@clerk/nextjs';
// import { Tooltip, TooltipContent } from '@radix-ui/react-tooltip';
import Link from 'next/dist/client/link';
import React from 'react'
import { Tooltip, TooltipContent } from '@/components/ui/tooltip';


const MobileNav = () => {
    const paths = useNavigation();

    const {isActive} = useConversation()

    if(isActive) return null;

    console.log("Mobile nav is being rendered..");

    return (
        <Card className='fixed bottom-4 w-[calc(100vw-32px)] flex items-center h-16 p-2 lg:hidden'>
            <nav className='w-full'>
                <ul className='flex justify-evenly items-center'>
                    {
                        paths.map((path, id) => {
                            return(
                            <li key={id} className='relative'>
                                <Link href={path.href}>
                                <Tooltip>
                                    {/* <TooltipTrigger asChild>
                                        <Button size="icon" variant={path.active ? "default" : "outline"}>
                                            {path.icon}
                                        </Button>
                                    </TooltipTrigger> */}
                                                                       <TooltipTrigger asChild>
                                    <div>
                                        <Button size="icon" variant={path.active ? "default" : "outline"}>
                                            {path.icon}
                                        </Button>
                                        {
                                            path.count ? 
                                            (<Badge className='absolute left-6 bottom-7 px-2'>{path.count}</Badge>) : null
                                            
                                        }
                                        </div>    
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{path.name}</p>
                                    </TooltipContent>
                                </Tooltip>
                                </Link>
                            </li>
                            )
                        })
                    }
            <li><ThemeToggle/></li>
            <li><UserButton/></li>
                </ul>
            </nav>
        </Card>
    )

}

export default MobileNav