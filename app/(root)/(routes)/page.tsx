import Categories from '@/components/category/Categories';
import SearchInput from '@/components/inputs/SearchInput';
import prismadb from '@/lib/prismadb';
import { UserButton } from '@clerk/nextjs';

const RootPage = async () => {

    const categories = await prismadb.category.findMany();

    return (
        <div className='h-full p-4 space-y-2'>
            <SearchInput />
            <Categories categories={categories} />
        </div>
    );
}

export default RootPage;