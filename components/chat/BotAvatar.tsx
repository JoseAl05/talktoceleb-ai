import { Avatar, AvatarImage } from '../ui/avatar';

interface BotAvatarProps {
    image: string;
}

const BotAvatar = ({ image }: BotAvatarProps) => {
    return (
        <Avatar className='h-12 w-12'>
            <AvatarImage src={image}/>
        </Avatar>
    );
}

export default BotAvatar;