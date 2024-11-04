import { axiosClient } from '@/api/axios';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from 'sonner';

const formSchema = z.object({
    email: z.string()
        .min(1, { message: "Email is required." })
        .email({ message: "Invalid email format." }),
    password: z.string()
        .min(1, { message: "Password is required." })
});


const Login = () => {
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSubmit(values) {
        try {
            const response = await axiosClient.post('/auth/login', values);

            localStorage.setItem('token', response.data.token);
            toast.success('Logged in successfully')
        } catch (err) {
            toast.error('Something went wrong, check console for more details')
            console.error('Login error: ')
            console.error(err)
        }
    }

    return (
        <div className='min-h-screen w-full flex flex-col justify-center items-center'>
            <h1 className='text-center font-semibold text-3xl'>Admin Login</h1>
            <p className='mb-3 px-2 text-center text-sm font-extralight'>Welcome, Admin! Please enter your credentials to log in.</p>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="px-4 w-full sm:w-96"
                >
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="test@example.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type='password' placeholder="your password..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className='mt-4 flex justify-end'>
                        <Button type="submit">Login</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
};

export default Login;