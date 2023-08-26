import Navbar from '@/components/navbar/Navbar';
import Sidebar from '@/components/sidebar/Sidebar';

const RootLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    return (
        <div className='h-full'>
            <Navbar />
            <div className='fixed hidden flex-col inset-y-0 w-20 mt-16 md:flex'>
                <Sidebar />
            </div>
            <main className='pt-16 h-full md:pl-20'>
                {children}
            </main>
        </div>
    );
}

export default RootLayout;