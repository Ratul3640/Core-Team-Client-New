import { motion } from "framer-motion";

const WhyChooseUs = () => {
    const features = [
        {
            id: 1,
            title: "Streamlined HR Processes",
            description:
                "Reduce administrative burdens with automated workflows and efficient tools designed for modern HR needs.",
            icon: "🚀",
        },
        {
            id: 2,
            title: "Secure & Reliable",
            description:
                "Our platform is built with state-of-the-art security protocols, ensuring your data is always safe and protected.",
            icon: "🔒",
        },
        {
            id: 3,
            title: "Customizable Solutions",
            description:
                "Tailor our platform to fit your organization’s specific requirements for better flexibility and scalability.",
            icon: "⚙️",
        },
        {
            id: 4,
            title: "24/7 Support",
            description:
                "Get round-the-clock assistance from our dedicated support team, ensuring your operations run smoothly.",
            icon: "📞",
        },
    ];

    return (
        <motion.div
            className="py-12 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            <div className="container mx-auto px-4 text-center">
                {/* Heading */}
                <motion.h2
                    className="text-4xl font-bold text-orange-600 mb-8"
                    initial={{ y: -30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    Why Choose Us?
                </motion.h2>

                {/* Description */}
                <motion.p
                    className="text-lg text-gray-600 mb-12"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    Discover how we help organizations like yours achieve seamless employee management.
                </motion.p>

                {/* Feature Cards */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.3 },
                        },
                    }}
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.id}
                            className="bg-gray-100 p-6 rounded-lg shadow-lg hover:bg-[#8b46d0] hover:text-white transition-all"
                            variants={{
                                hidden: { y: 30, opacity: 0 },
                                visible: { y: 0, opacity: 1 },
                            }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            whileHover={{
                                scale: 1.05,
                                rotate: [0, 2, -2, 0], // Subtle shake effect
                                transition: { duration: 0.3 },
                            }}
                        >
                            <motion.div
                                className="text-4xl mb-4"
                                initial={{ scale: 0.5 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                            >
                                {feature.icon}
                            </motion.div>
                            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                                {feature.title}
                            </h3>
                            <motion.p
                                className="text-gray-600"
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                            >
                                {feature.description}
                            </motion.p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.div>
    );
};

export default WhyChooseUs;
