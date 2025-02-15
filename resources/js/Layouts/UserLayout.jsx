import Navbar from '@/Components/Navbar';
import Footer from '@/Pages/UserProducts/Footer';

export default function UserLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="pt-20 pb-10 px-4 sm:px-8 lg:px-12">
                {children}
            </main>
            <Footer/>
        </div>
    );
}
