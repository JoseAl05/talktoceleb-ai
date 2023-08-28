import Categories from '@/components/category/Categories';
import Celebs from '@/components/celebs/Celebs';
import SearchInput from '@/components/inputs/SearchInput';
import prismadb from '@/lib/prismadb';
import { UserButton } from '@clerk/nextjs';

interface RootPageProps {
    searchParams: {
        categoryId: string;
        name: string;
    }
}

const RootPage = async ({ searchParams }: RootPageProps) => {

    const celebs = await prismadb.celeb.findMany({
        where: {
            categoryId: searchParams.categoryId,
            name: {
                search: searchParams.name
            }
        },
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            _count: {
                select: {
                    messages: true
                }
            }
        }
    })

    const categories = await prismadb.category.findMany();

    return (
        <div className='h-full p-4 space-y-2'>
            <SearchInput />
            <Categories categories={categories} />
            <Celebs
                celebs={celebs}
            />
        </div>
    );
}

export default RootPage;