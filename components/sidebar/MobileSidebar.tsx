import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import Sidebar from './Sidebar';

const MobileSidebar = () => {
    return (
        <Sheet>
            <SheetTrigger className='pr-4 md:hidden'>
                <Menu />
            </SheetTrigger>
            <SheetContent side='left' className='p-0 pt-10 w-32 bg-secondary'>
                <Sidebar />
            </SheetContent>
        </Sheet>
    );
}

export default MobileSidebar;