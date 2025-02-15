import { HiStar, HiOutlineStar } from 'react-icons/hi';

// Data dummy untuk feedback
const dummyFeedback = [
    {
        id: 1,
        name: "John Doe",
        rating: 4.5,
        comment: "Produknya sangat bagus dan berkualitas. Pengiriman juga cepat!",
        date: "2023-10-15",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg", // URL gambar profil
    },
    {
        id: 2,
        name: "Jane Smith",
        rating: 5,
        comment: "Sangat puas dengan pelayanannya. Barang sesuai deskripsi.",
        date: "2023-10-10",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    {
        id: 3,
        name: "Alice Johnson",
        rating: 3.5,
        comment: "Produknya bagus, tapi pengiriman agak lama.",
        date: "2023-10-05",
        avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    {
        id: 4,
        name: "Bob Brown",
        rating: 4,
        comment: "Harga terjangkau dan kualitas oke. Recommended!",
        date: "2023-09-28",
        avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    },
];

export default function Feedback() {
    return (
        <div className="bg-gray-50 dark:bg-gray-900 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Feedback */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        What Our Customers Say
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        Hear from our satisfied customers about their experiences.
                    </p>
                    <div className="mt-6 flex justify-center">
                        <div className="w-16 h-1 bg-green-600 rounded-full"></div>
                    </div>
                </div>

                {/* Feedback Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {dummyFeedback.map((feedback) => {
                        const rating = parseFloat(feedback.rating) || 0;
                        const fullStars = Math.floor(rating);
                        const hasHalfStar = rating % 1 !== 0;

                        return (
                            <div
                                key={feedback.id}
                                className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 transform hover:scale-105 transition-transform duration-300"
                            >
                                {/* Avatar and Name */}
                                <div className="flex items-center space-x-4 mb-4">
                                    <img
                                        src={feedback.avatar}
                                        alt={feedback.name}
                                        className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
                                    />
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            {feedback.name}
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {new Date(feedback.date).toLocaleDateString("id-ID", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}
                                        </p>
                                    </div>
                                </div>

                                {/* Rating */}
                                <div className="flex items-center mb-4">
                                    {[...Array(fullStars)].map((_, i) => (
                                        <HiStar key={i} className="text-yellow-400 w-5 h-5" />
                                    ))}
                                    {hasHalfStar && <HiStar className="text-yellow-400 w-5 h-5" />}
                                    {[...Array(5 - Math.ceil(rating))].map((_, i) => (
                                        <HiOutlineStar key={i} className="text-gray-300 w-5 h-5" />
                                    ))}
                                </div>

                                {/* Comment */}
                                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                                    {feedback.comment}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}