import { FaUserPlus } from 'react-icons/fa';
import { Head, Link, useForm } from '@inertiajs/react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-800 p-6">
            <Head title="Register" />
            {/* SVG Background */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
                <svg className="top-0 left-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#ffffff" fillOpacity="0.2" d="M0,192L40,181.3C80,171,160,149,240,160C320,171,400,213,480,213.3C560,213,640,171,720,138.7C800,107,880,85,960,101.3C1040,117,1120,171,1200,202.7C1280,235,1360,245,1400,250.7L1440,256V320H0Z"></path>
                </svg>
            </div>
            <div className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-xl border border-gray-200">
                <h2 className="mb-6 text-center text-3xl font-bold text-gray-800">Create an Account</h2>
                <form onSubmit={submit} className="space-y-5">
                    <div>
                        <InputLabel htmlFor="name" value="Name" className="text-gray-700 font-medium" />
                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-1 w-full rounded-lg border border-gray-300 p-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 transition-all"
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />
                        <InputError message={errors.name} className="mt-2 text-red-500" />
                    </div>

                    <div>
                        <InputLabel htmlFor="email" value="Email" className="text-gray-700 font-medium" />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 w-full rounded-lg border border-gray-300 p-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 transition-all"
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                        <InputError message={errors.email} className="mt-2 text-red-500" />
                    </div>

                    <div>
                        <InputLabel htmlFor="password" value="Password" className="text-gray-700 font-medium" />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-1 w-full rounded-lg border border-gray-300 p-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 transition-all"
                            autoComplete="new-password"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />
                        <InputError message={errors.password} className="mt-2 text-red-500" />
                    </div>

                    <div>
                        <InputLabel htmlFor="password_confirmation" value="Confirm Password" className="text-gray-700 font-medium" />
                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 w-full rounded-lg border border-gray-300 p-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 transition-all"
                            autoComplete="new-password"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            required
                        />
                        <InputError message={errors.password_confirmation} className="mt-2 text-red-500" />
                    </div>

                    <div className="mt-6 flex flex-col gap-4">
                        <PrimaryButton className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium shadow-lg transition-all transform hover:scale-105 disabled:opacity-50" disabled={processing}>
                            <FaUserPlus className="text-lg" /> Register
                        </PrimaryButton>
                    </div>

                    <div className="mt-6 text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link href={route('login')} className="text-indigo-600 hover:underline hover:text-indigo-800">
                            Log in
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
