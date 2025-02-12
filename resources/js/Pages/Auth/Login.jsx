import { FaGoogle, FaSignInAlt } from 'react-icons/fa';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import Checkbox from '@/Components/Checkbox';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        if (status) {
            setTimeout(() => {
                reset('status');
            }, 3000);
        }
    }, [status]);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    const loginWithGoogle = () => {
        window.location.href = route('auth.google.redirect');
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-800 p-6">
            <Head title="Log in" />

            {/* SVG Background */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
                <svg className="absolute top-0 left-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#ffffff" fillOpacity="0.2" d="M0,192L40,181.3C80,171,160,149,240,160C320,171,400,213,480,213.3C560,213,640,171,720,138.7C800,107,880,85,960,101.3C1040,117,1120,171,1200,202.7C1280,235,1360,245,1400,250.7L1440,256V320H0Z"></path>
                </svg>
            </div>

            <div className="relative w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl border border-gray-300 backdrop-blur-md bg-opacity-80">
                <h2 className="mb-6 text-center text-4xl font-extrabold text-gray-900">Welcome Back</h2>

                {status && (
                    <div className="mb-4 text-sm font-medium text-green-600 bg-green-100 p-2 rounded-md">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="space-y-5">
                    <div>
                        <InputLabel htmlFor="email" value="Email" className="text-gray-700 font-medium" />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-all"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
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
                            className="mt-1 w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition-all"
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        <InputError message={errors.password} className="mt-2 text-red-500" />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                            />
                            <span className="ml-2 text-sm text-gray-700">Remember me</span>
                        </div>
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-sm text-blue-600 hover:underline hover:text-blue-800"
                            >
                                Forgot password?
                            </Link>
                        )}
                    </div>

                    <div className="mt-6 flex flex-col gap-4">
                        <PrimaryButton className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium shadow-lg transition-all transform hover:scale-105 disabled:opacity-50" disabled={processing}>
                            <FaSignInAlt className="text-lg" /> Login
                        </PrimaryButton>

                        <button
                            type="button"
                            onClick={loginWithGoogle}
                            className="flex h-12 w-full items-center justify-center rounded-xl border border-gray-300 bg-white text-gray-700 font-medium shadow-md transition hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 hover:scale-105"
                        >
                            <FaGoogle className="mr-2 text-xl text-red-500" /> Sign in with Google
                        </button>
                    </div>

                    <div className="mt-6 text-center text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link href={route('register')} className="text-blue-600 hover:underline hover:text-blue-800">
                            Register
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
