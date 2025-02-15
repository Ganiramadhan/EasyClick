import { HiStar, HiOutlineStar, HiShoppingCart } from 'react-icons/hi';
import { useState } from 'react';

export default function BestSellerProduct({ products }) {
    const [loading, setLoading] = useState(null);

    const addCartItems = (product) => {
        setLoading(product.id);
        setTimeout(() => setLoading(null), 1000);
    };

    // Filter top 4 products by rating
    const topProducts = products
        .filter(product => !isNaN(parseFloat(product.rating)))
        .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
        .slice(0, 4);

    return (
        <div className="bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            {/* Header Best Seller Product */}
            <div className="text-center mb-10">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    Best Seller Products
                </h2>
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
                    Discover our most popular and highly-rated products
                </p>
                <div className="mt-6 flex justify-center">
                    <div className="w-16 h-1 bg-green-600 rounded-full"></div>
                </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {topProducts.map((product) => {
                    const rating = parseFloat(product.rating) || 0;
                    const formattedRating = rating.toFixed(1);
                    const price = parseFloat(product.price) || 0;
                    const discount = parseFloat(product.discount) || 0;
                    const discountedPrice = discount > 0 
                        ? price * (1 - discount / 100) 
                        : price;

                    return (
                        <div key={product.id} className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden flex flex-col justify-between hover:shadow-lg transition-shadow text-sm">
                            <div>
                                <div className="w-full h-48 sm:h-56 relative overflow-hidden">
                                    <img 
                                        src={product.image ? `/storage/${product.image}` : "/placeholder.png"} 
                                        alt={product.name} 
                                        className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300" 
                                    />
                                    {/* Best Seller Badge */}
                                    <span className="absolute top-2 left-2 bg-yellow-400 text-gray-900 text-xs px-2 py-1 rounded-full font-semibold">
                                        Best Seller
                                    </span>
                                    {discount > 0 && (
                                        <span className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                                            {discount}%
                                        </span>
                                    )}
                                </div>
                                <div className="p-3 flex-grow">
                                    <h2 className="font-bold truncate text-lg mb-1 dark:text-white">{product.name}</h2>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-2 line-clamp-2">{product.description}</p>
                                    {discount > 0 && (
                                        <p className="text-gray-400 line-through text-xs">Rp {price.toLocaleString()}</p>
                                    )}
                                    <p className="text-green-600 font-bold text-base">
                                        Rp {discountedPrice.toLocaleString()}
                                    </p>
                                    <div className="flex justify-between items-center text-xs text-gray-600 dark:text-gray-300 mt-3">
                                        <div className="flex items-center">
                                            {[...Array(Math.floor(rating))].map((_, i) => (
                                                <HiStar key={i} className="text-yellow-400 w-4 h-4" />
                                            ))}
                                            {[...Array(5 - Math.floor(rating))].map((_, i) => (
                                                <HiOutlineStar key={i} className="text-gray-300 w-4 h-4" />
                                            ))}
                                            <span className="ml-1 text-sm">{formattedRating}</span>
                                        </div>
                                        <span className="text-sm">{product.sold}+ sold</span>
                                    </div>
                                </div>
                            </div>
                            <div className="p-3 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center mt-auto">
                                <span className="text-sm dark:text-gray-300">Stock: {product.stock}</span>
                                <button 
                                    onClick={() => addCartItems(product)} 
                                    className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all text-sm font-semibold disabled:opacity-50" 
                                    disabled={loading === product.id}
                                >
                                    {loading === product.id ? (
                                        <span className="flex items-center">
                                            <svg className="animate-spin h-4 w-4 text-white mr-1" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                                            </svg> Loading...
                                        </span>
                                    ) : (
                                        <span className="flex items-center"><HiShoppingCart className="w-4 h-4 mr-1" /> Add to cart</span>
                                    )}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}