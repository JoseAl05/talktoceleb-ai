'use client'

import { Celeb, Message } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { ChevronLeft, Edit, MessagesSquare, MoreVertical, Trash } from 'lucide-react';
import { Button } from '../ui/button';
import BotAvatar from './BotAvatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { useToast } from '../ui/use-toast';
import axios from 'axios';

interface ChatHeaderProps {
    celeb: (Celeb & {
        messages: Message[];
        _count: {
            messages: number;
        }
    });
}

const ChatHeader = ({ celeb }: ChatHeaderProps) => {

    const router = useRouter();
    const { user } = useUser();
    const { toast } = useToast();

    const onDelete = async () => {
        try {
            await axios.delete(`/api/celeb/${celeb.id}`);

            toast({
                description: 'Success'
            });
            router.refresh();
            router.push('/');
        } catch (error) {
            toast({
                variant: 'destructive',
                description: 'Something went wrong!.'
            })
        }
    }

    return (
        <div className='flex justify-between items-center w-full border-b border-primary/10 pb-4'>
            <div className='flex items-center gap-x-2'>
                <Button
                    size='icon'
                    variant='ghost'
                    onClick={() => router.back()}
                >
                    <ChevronLeft className='h-8 w-8' />
                </Button>
                <BotAvatar image={celeb.image} />
                <div className='flex flex-col gap-y-1'>
                    <div className='flex items-center gap-x-2'>
                        <p className='font-bold'>
                            {celeb.name}
                        </p>
                        <div className='flex items-center text-xs text-muted-foreground'>
                            <MessagesSquare className='w-3 h-3 m-1' />
                            {celeb._count.messages}
                        </div>
                    </div>
                    <p className='text-xs text-muted-foreground'>
                        Created by {celeb.username}
                    </p>
                </div>
            </div>
            {
                user?.id === celeb.userId && (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant='secondary' size='icon'>
                                <MoreVertical />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                            <DropdownMenuItem onClick={() => router.push(`/celeb/${celeb.id}`)}>
                                <Edit className='w-4 h-4 mr-2' />
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={onDelete}>
                                <Trash className='w-4 h-4 mr-2' />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            }
        </div>
    );
}

export default ChatHeader;