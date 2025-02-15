import { useState, useEffect } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

export default function Carousel({ images }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [images.length]);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    return (
        <div className="relative w-full h-48 sm:h-64 lg:h-96 overflow-hidden rounded-lg shadow-2xl">
            <div className="absolute inset-0 flex items-center justify-center">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Slide ${index}`}
                        className={`absolute w-full h-full object-cover transition-transform duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100 scale-110' : 'opacity-0 scale-100'}`}
                    />
                ))}
            </div>
            
            {/* Overlay dengan tagline dan CTA */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-30 text-white text-center p-4">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold drop-shadow-2xl">EasyClick</h2>
                <p className="text-xl sm:text-2xl lg:text-3xl mt-4 drop-shadow-2xl">Shopping Made Simple</p>
                <button className="mt-6 bg-green-500 hover:bg-green-600 px-8 py-3 rounded-full text-white font-semibold transition-all duration-300 shadow-2xl hover:shadow-3xl">
                    Shop Now
                </button>
            </div>
            
            {/* Tombol Navigasi (Prev/Next) */}
            <button 
                onClick={prevSlide} 
                className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 p-2 sm:p-3 rounded-full text-gray-800 hover:bg-opacity-100 transition-all duration-300 shadow-lg hover:shadow-xl">
                <HiChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
            <button 
                onClick={nextSlide} 
                className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 p-2 sm:p-3 rounded-full text-gray-800 hover:bg-opacity-100 transition-all duration-300 shadow-lg hover:shadow-xl">
                <HiChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
            </button>
            
        </div>
    );
}