import { Celeb } from '@prisma/client';
import Image from 'next/image';
import { Card, CardFooter, CardHeader } from '../ui/card';
import Link from 'next/link';
import { MessagesSquare } from 'lucide-react';

interface CelebsProps {
    celebs: (Celeb & {
        _count: {
            messages: number;
        }
    })[];
}

const Celebs = ({ celebs }: CelebsProps) => {

    if (celebs.length === 0) {
        return (
            <div className='flex flex-col justify-center items-center pt-10 space-y-3'>
                <div className='relative w-60 h-60'>
                    <Image
                        fill
                        src='/empty.png'
                        className='grayscale'
                        alt='Empty'
                    />
                </div>
                <p className='text-sm text-muted-foreground'>
                    No celebs found.
                </p>
            </div>
        )
    }

    return (
        <div className='grid grid-cols-2 gap-2 pb-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
            {
                celebs.map(celeb => (
                    <Card
                        key={celeb.id}
                        className='bg-primary/10 rounded-xl cursor-pointer border-0 transition hover:opacity-75'
                    >
                        <Link
                            href={`/chat/${celeb.id}`}
                        >
                            <CardHeader className='flex justify-center items-center text-center text-muted-foreground'>
                                <div className='relative w-32 h-32'>
                                    <Image
                                        fill
                                        src={celeb.image}
                                        className='rounded-xl object-cover'
                                        alt={celeb.name}
                                    />
                                </div>
                                <p className='font-bold'>
                                    {celeb.name}
                                </p>
                                <p className='text-xs'>
                                    {celeb.description}
                                </p>
                            </CardHeader>
                            <CardFooter className='flex justify-between items-center text-xs text-muted-foreground'>
                                <p className='lowercase'>
                                    @{celeb.username}
                                </p>
                                <div className='flex items-center'>
                                    <MessagesSquare className='w-3 h-3 mr-1' />
                                    {celeb._count.messages}
                                </div>
                            </CardFooter>
                        </Link>
                    </Card>
                ))
            }
        </div>
    );
}

export default Celebs;