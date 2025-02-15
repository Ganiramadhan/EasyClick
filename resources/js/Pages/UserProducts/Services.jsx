import { FaShippingFast, FaLock, FaHeadset } from 'react-icons/fa';

export default function Service() {
    return (
        <div className="container mx-auto px-4 py-16">
            {/* Service Header */}
            <div className="text-center mb-16">
                <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6">
                    Our Services
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    We provide the best services to enhance your shopping experience.
                </p>
                <div className="mt-6 flex justify-center">
                    <div className="w-20 h-1 bg-green-600 rounded-full"></div>
                </div>
            </div>

            {/* Service Items */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Fast Delivery */}
                <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
                    <div className="mb-4 text-green-600">
                        <FaShippingFast size={48} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Fast Delivery
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                        Enjoy fast and reliable delivery services to your doorstep.
                    </p>
                </div>

                {/* Secure Payment */}
                <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
                    <div className="mb-4 text-green-600">
                        <FaLock size={48} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        Secure Payment
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                        Your transactions are safe with our secure payment methods.
                    </p>
                </div>

                {/* Customer Support */}
                <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
                    <div className="mb-4 text-green-600">
                        <FaHeadset size={48} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        24/7 Support
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                        Our support team is available 24/7 to assist you with any issues.
                    </p>
                </div>
            </div>
        </div>
    );
}
