'use client'

import { Celeb, Message } from '@prisma/client';
import ChatHeader from './ChatHeader';

interface ChatCelebProps {
    celeb: (Celeb & {
        messages: Message[];
        _count: {
            messages: number;
        }
    });
}

const ChatCeleb = ({ celeb }: ChatCelebProps) => {
    return (
        <div className='flex flex-col h-full p-4 space-y-2'>
            <ChatHeader
                celeb={celeb}
            />
        </div>
    );
}

export default ChatCeleb;