import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ErrorPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-base-200">
            <motion.div 
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-white p-10 rounded-2xl shadow-lg max-w-md text-center border border-gray-300"
            >
                <motion.h1 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, ease: "backOut" }}
                    className="text-8xl font-extrabold text-primary"
                >
                    404
                </motion.h1>
                <motion.h2 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-2xl font-semibold text-gray-700 mt-4"
                >
                    Oops! Page Not Found
                </motion.h2>
                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="text-gray-500 mt-2"
                >
                    The page you’re looking for might have been removed or is temporarily unavailable.
                </motion.p>
                <Link to="/">
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="mt-6"
                    >
                        <p className="bg-primary text-white px-6 py-3 rounded-lg shadow-md hover:bg-primary-focus transition">
                            Back to Home
                        </p>
                    </motion.div>
                </Link>
            </motion.div>
        </div>
    );
};

export default ErrorPage;
