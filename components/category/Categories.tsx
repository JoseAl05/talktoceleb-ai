'use client'

import { useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Category } from '@prisma/client';
import qs from 'query-string';

interface CategoriesProps {
    categories: Category[];
}

const Categories = ({ categories }: CategoriesProps) => {

    const router = useRouter();
    const searchParams = useSearchParams();

    const categoryId = searchParams.get('category');

    const onClick = (categoryId?: string) => {
        const query = { category: categoryId };

        const url = qs.stringifyUrl({
            url: window.location.href,
            query
        }, {
            skipNull: true
        })

        router.push(url);
    }

    return (
        <div className='flex p-1 w-full overflow-x-auto space-x-2'>
            <button
                onClick={() => onClick(undefined)}
                className={cn(`
                        flex
                        items-center
                        text-xs
                        text-center
                        px-2
                        py-2
                        rounded-md
                        bg-primary/10
                        transition
                        hover:opacity-75
                        md:text-sm
                        md:px-4
                        md:py-3
                    `,
                        !categoryId ? 'bg-primary/25' : 'bg-primary/10'

                )}
            >
                Newest
            </button>
            {
                categories.map(category => (
                    <button
                        key={category.id}
                        onClick={() => onClick(category.id)}
                        className={cn(`
                            flex
                            items-center
                            text-xs
                            text-center
                            px-2
                            py-2
                            rounded-md
                            bg-primary/10
                            transition
                            hover:opacity-75
                            md:text-sm
                            md:px-4
                            md:py-3
                        `,
                            category.id === categoryId ? 'bg-primary/25' : 'bg-primary/10'
                        )}
                    >
                        {category.name}
                    </button>
                ))
            }
        </div>
    );
}

export default Categories;