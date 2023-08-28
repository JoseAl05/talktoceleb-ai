import CelebForm from '@/components/forms/CelebForm';
import prismadb from '@/lib/prismadb';

interface CelebPageProps {
    params: {
        celebId: string;
    }
}

const CelebPage = async ({ params }: CelebPageProps) => {
    //CHECK SUBSCRIPTION

    const celeb = await prismadb.celeb.findUnique({
        where: {
            id: params.celebId
        }
    });

    const categories = await prismadb.category.findMany();

    return (
        <CelebForm
            celeb={celeb}
            categories={categories}
        />
    );
}

export default CelebPage;