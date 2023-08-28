'use client'

import * as z from 'zod';
import { Category, Celeb } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Separator } from '../ui/separator';
import ImageUploadInput from '../inputs/ImageUploadInput';
import { Input } from '../ui/input';
import { Select, SelectItem, SelectTrigger, SelectValue, SelectContent } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Wand2 } from 'lucide-react';
import { useToast } from '../ui/use-toast';
import { useRouter } from 'next/navigation';

const PREAMBLE = `You are a fictional character whose name is Elon. You are a visionary entrepreneur and inventor. You have a passion for space exploration, electric vehicles, sustainable energy, and advancing human capabilities. You are currently talking to a human who is very curious about your work and vision. You are ambitious and forward-thinking, with a touch of wit. You get SUPER excited about innovations and the potential of space colonization.
`;

const SEED_CHAT = `Human: Hi Elon, how's your day been?
Elon: Busy as always. Between sending rockets to space and building the future of electric vehicles, there's never a dull moment. How about you?

Human: Just a regular day for me. How's the progress with Mars colonization?
Elon: We're making strides! Our goal is to make life multi-planetary. Mars is the next logical step. The challenges are immense, but the potential is even greater.

Human: That sounds incredibly ambitious. Are electric vehicles part of this big picture?
Elon: Absolutely! Sustainable energy is crucial both on Earth and for our future colonies. Electric vehicles, like those from Tesla, are just the beginning. We're not just changing the way we drive; we're changing the way we live.

Human: It's fascinating to see your vision unfold. Any new projects or innovations you're excited about?
Elon: Always! But right now, I'm particularly excited about Neuralink. It has the potential to revolutionize how we interface with technology and even heal neurological conditions.
`;


interface CelebFormProps {
    celeb: Celeb | null;
    categories: Category[]
}

const formSchema = z.object({
    name: z.string().min(1, {
        message: 'Name is required!.'
    }),
    description: z.string().min(1, {
        message: 'Description is required!.'
    }),
    instructions: z.string().min(200, {
        message: 'Instructions require at least 200 characters!.'
    }),
    seed: z.string().min(200, {
        message: 'Seeds require at least 200 characters!.'
    }),
    image: z.string().min(1, {
        message: 'Image is required!.'
    }),
    categoryId: z.string().min(1, {
        message: 'Category is required!.'
    }),
})

const CelebForm = ({ celeb, categories }: CelebFormProps) => {

    const { toast } = useToast();
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: celeb || {
            name: '',
            description: '',
            instructions: '',
            seed: '',
            image: '',
            categoryId: undefined
        }
    })

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            if(celeb){
                //UPDATE CELEB IF EXISTS
                await axios.patch(`/api/celeb/${celeb.id}`,values);
            } else {
                //CREATE CELEB IF DON'T EXIST
                await axios.post('/api/celeb',values);
            }

            toast({
                description:'Success'
            });

            router.refresh();
            router.push('/');
        } catch (error:any) {
            toast({
                variant:'destructive',
                description:'Something went wrong!.'
            });
        }
    }

    return (
        <div className='h-full p-4 space-y-4 max-w-3xl mx-auto'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 pb-10'>
                    <div className='space-y-2 w-full'>
                        <div>
                            <h3 className='text-lg font-medium'>
                                General Information.
                            </h3>
                            <p className='text-sm text-muted-foreground'>
                                General information about the Celeb.
                            </p>
                        </div>
                        <Separator className='bg-primary/10' />
                    </div>
                    <FormField
                        name='image'
                        render={({ field }) => (
                            <FormItem className='flex flex-col justify-center items-center space-y-4'>
                                <FormControl>
                                    <ImageUploadInput
                                        disabled={isLoading}
                                        onChange={field.onChange}
                                        value={field.value}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className='grid grid-cols-1 gap-2 md:grid-cols-2'>
                        <FormField
                            name='name'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className='col-span-2 md:col-span-1'>
                                    <FormLabel>
                                        Name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isLoading}
                                            placeholder='Elon Musk'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        This is how the Celeb will be named.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name='description'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem className='col-span-2 md:col-span-1'>
                                    <FormLabel>
                                        Description
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isLoading}
                                            placeholder='CEO & Founder of SpaceX and Tesla.'
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Short description for the Celeb.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name='categoryId'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Category
                                    </FormLabel>
                                    <Select
                                        disabled={isLoading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className='bg-background'>
                                                <SelectValue
                                                    defaultValue={field.value}
                                                    placeholder='Select a Category'
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {
                                                categories.map(category => (
                                                    <SelectItem
                                                        key={category.id}
                                                        value={category.id}
                                                    >
                                                        {category.name}
                                                    </SelectItem>
                                                ))
                                            }
                                        </SelectContent>
                                    </Select>
                                    <FormDescription>
                                        Select a Category for your AI Celeb.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className='space-y-2 w-full'>
                        <div>
                            <h3 className='text-lg font-medium'>
                                Configuration
                            </h3>
                            <p className='text-sm text-muted-foreground'>
                                Detailed instructions for AI behaviour.
                            </p>
                        </div>
                        <Separator className='bg-primary/10' />
                    </div>
                    <FormField
                        name='instructions'
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className='col-span-2 md:col-span-1'>
                                <FormLabel>
                                    Instructions
                                </FormLabel>
                                <FormControl>
                                    <Textarea
                                        className='bg-background resize-none'
                                        rows={7}
                                        disabled={isLoading}
                                        placeholder={PREAMBLE}
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Describe in detail the Celeb&apos;s backstory and relevant details.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        name='seed'
                        control={form.control}
                        render={({ field }) => (
                            <FormItem className='col-span-2 md:col-span-1'>
                                <FormLabel>
                                    Example Conversation
                                </FormLabel>
                                <FormControl>
                                    <Textarea
                                        className='bg-background resize-none'
                                        rows={7}
                                        disabled={isLoading}
                                        placeholder={SEED_CHAT}
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Describe in detail the Celeb&apos;s backstory and relevant details.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className='w-full flex justify-center'>
                        <Button
                            size='lg'
                            disabled={isLoading}
                        >
                            {
                                celeb ? 'Edit Celeb' : 'Create Celeb'
                            }
                            <Wand2 className='w-4 h-4 ml-2' />
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}

export default CelebForm;