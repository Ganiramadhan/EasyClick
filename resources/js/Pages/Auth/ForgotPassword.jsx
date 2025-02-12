import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-800 p-6">
            <Head title="Forgot Password" />
            {/* SVG Background */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
                <svg className="absolute top-0 left-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path fill="#ffffff" fillOpacity="0.2" d="M0,192L40,181.3C80,171,160,149,240,160C320,171,400,213,480,213.3C560,213,640,171,720,138.7C800,107,880,85,960,101.3C1040,117,1120,171,1200,202.7C1280,235,1360,245,1400,250.7L1440,256V320H0Z"></path>
                </svg>
            </div>
            <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl border border-gray-200 relative z-10">
                <h2 className="mb-6 text-center text-3xl font-bold text-gray-800">Forgot Password</h2>
                <div className="mb-4 text-sm text-gray-600">
                    Forgot your password? No problem. Just let us know your email
                    address and we will email you a password reset link that will
                    allow you to choose a new one.
                </div>
                {status && (
                    <div className="mb-4 text-sm font-medium text-green-600">
                        {status}
                    </div>
                )}
                <form onSubmit={submit} className="space-y-5">
                    <div>
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full rounded-lg border border-gray-300 p-3 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300 transition-all"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                        <InputError message={errors.email} className="mt-2 text-red-500" />
                    </div>
                    <div className="mt-4 flex items-center justify-end">
                        <PrimaryButton className="w-full flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium shadow-lg transition-all disabled:opacity-50" disabled={processing}>
                            Email Password Reset Link
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    );
}
