import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const AboutUs = () => {
    return (
        <section className="bg-gradient-to-r from-[#3E007C] via-[#6A0DAD] to-[#9A4DFF] text-white min-h-screen flex items-center justify-center px-6 py-12">
            <div className="max-w-5xl text-center">
                <motion.h2
                    className="text-4xl font-extrabold text-orange-600"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    About Core Team
                </motion.h2>
                <motion.p
                    className="mt-4 text-white text-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    Core Team is a dedicated platform that empowers businesses to manage employees efficiently. 
                    We specialize in payroll management, HR solutions, and team collaboration tools.
                </motion.p>

                <div className="grid md:grid-cols-3 gap-8 mt-10">
                    {/* Card 1 */}
                    <motion.div
                        className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all"
                        whileHover={{ scale: 1.05 }}
                    >
                        <h3 className="text-xl font-bold text-orange-500">Our Mission</h3>
                        <p className="text-gray-600 mt-2">
                            Streamline workforce management with seamless payroll and employee tracking.
                        </p>
                    </motion.div>

                    {/* Card 2 */}
                    <motion.div
                        className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all"
                        whileHover={{ scale: 1.05 }}
                    >
                        <h3 className="text-xl font-bold text-orange-500">Our Vision</h3>
                        <p className="text-gray-600 mt-2">
                            Revolutionizing HR solutions with automation and AI-driven insights.
                        </p>
                    </motion.div>

                    {/* Card 3 */}
                    <motion.div
                        className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all"
                        whileHover={{ scale: 1.05 }}
                    >
                        <h3 className="text-xl font-bold text-orange-500">Why Choose Us?</h3>
                        <p className="text-gray-600 mt-2">
                            Secure, scalable, and user-friendly solutions tailored for businesses of all sizes.
                        </p>
                    </motion.div>
                </div>

                <Link to="/">
                <motion.button
                    className="mt-8 bg-orange-600 text-white py-2 px-6 rounded-full text-lg font-semibold hover:bg-orange-700 transition-all"
                    whileHover={{ scale: 1.1 }}
                >
                    Learn More
                </motion.button>
                </Link>
            </div>
        </section>
    );
};

export default AboutUs;
