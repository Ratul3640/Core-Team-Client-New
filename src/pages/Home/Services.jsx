import { motion } from "framer-motion";

const Services = () => {
    const services = [
        {
            id: 1,
            title: "Employee Onboarding",
            description:
                "Streamline the onboarding process for new employees with automated workflows, ensuring a smooth start for your team members.",
            icon: "👩‍💻",
        },
        {
            id: 2,
            title: "Payroll Management",
            description:
                "Simplify payroll processing with our platform, ensuring accurate salary calculations, tax compliance, and timely payments.",
            icon: "💰",
        },
        {
            id: 3,
            title: "Attendance Tracking",
            description:
                "Monitor employee attendance and working hours effortlessly with our real-time tracking tools, boosting productivity and accountability.",
            icon: "⏱️",
        },
        {
            id: 4,
            title: "Performance Reviews",
            description:
                "Evaluate employee performance with comprehensive review tools that promote growth and development within your organization.",
            icon: "📊",
        },
        {
            id: 5,
            title: "Employee Benefits Administration",
            description:
                "Manage employee benefits programs like health insurance, retirement plans, and bonuses with ease using our tools.",
            icon: "🎁",
        },
        {
            id: 6,
            title: "HR Reports & Analytics",
            description:
                "Access detailed HR reports and analytics to make data-driven decisions and improve overall employee satisfaction.",
            icon: "📈",
        },
    ];

    return (
        <motion.div 
            className="py-12 bg-gray-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            <div className="container mx-auto px-4">
                {/* Heading */}
                <motion.h1 
                    className="text-4xl font-bold text-center text-orange-600 mb-8"
                    initial={{ y: -30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    Our Services
                </motion.h1>

                <motion.p 
                    className="text-lg text-center text-gray-600 mb-12"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    Empower your organization with our comprehensive employee management services, tailored to meet your HR needs.
                </motion.p>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            className="bg-white p-6 rounded-lg shadow-lg transition-shadow hover:shadow-2xl hover:bg-[#3E007C] hover:text-white"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="flex items-center justify-center mb-4 text-4xl">
                                {service.icon}
                            </div>
                            <h3 className="text-2xl font-semibold mb-2">
                                {service.title}
                            </h3>
                            <p>{service.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default Services;
