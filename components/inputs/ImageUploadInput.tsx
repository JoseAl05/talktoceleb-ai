'use client'

import { useEffect, useState } from 'react';
import { CldUploadButton } from 'next-cloudinary';
import Image from 'next/image';

interface ImageUploadInputProps {
    value: string;
    onChange: (image: string) => void;
    disabled?: boolean;
}

const ImageUploadInput = ({ value, onChange, disabled }: ImageUploadInputProps) => {

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <div className='flex flex-col justify-center items-center space-y-4 w-full'>
            <CldUploadButton
                onUpload={(result:any) => onChange(result.info.secure_url)}
                options={{
                    maxFiles: 1
                }}
                uploadPreset='gklcuhr6'
            >
                <div
                    className='
                        flex
                        flex-col
                        justify-center
                        items-center
                        space-y-2
                        p-4
                        border-4
                        border-dashed
                        border-primary/10
                        rounded-lg
                        transition
                        hover:opacity-75'
                >
                    <div className='relative h-40 w-40'>
                        <Image
                            fill
                            alt='Upload'
                            src={value || '/placeholder.png'}
                            className='rounded-lg object-cover'
                        />
                    </div>
                </div>
            </CldUploadButton>
        </div>
    );
}

export default ImageUploadInput;