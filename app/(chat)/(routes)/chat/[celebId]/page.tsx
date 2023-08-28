import ChatCeleb from '@/components/chat/ChatCeleb';
import prismadb from '@/lib/prismadb';
import { auth, redirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';


interface ChatPageProps {
    params: {
        celebId: string
    }
}

const ChatPage = async ({ params }: ChatPageProps) => {

    const { userId } = auth();

    if (!userId) {
        return redirectToSignIn();
    }

    const celeb = await prismadb.celeb.findUnique({
        where: {
            id: params.celebId
        },
        include: {
            messages: {
                orderBy: {
                    createdAt: 'asc'
                },
                where: {
                    userId
                }
            },
            _count: {
                select: {
                    messages: true
                }
            }
        }
    })

    if(!celeb) {
        return redirect('/');
    }

    return (
        <ChatCeleb
            celeb={celeb}
        />
    );
}

export default ChatPage;