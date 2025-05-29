import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Service = () => {
  const services = [
    {
      id: 1,
      title: "Employee Management",
      description: "Easily manage employee details, roles, and team structures.",
      icon: "👥",
    },
    {
      id: 2,
      title: "Payroll Processing",
      description: "Automate salary calculations, tax deductions, and payments.",
      icon: "💰",
    },
    {
      id: 3,
      title: "Performance Tracking",
      description: "Monitor employee performance and generate insightful reports.",
      icon: "📊",
    },
    {
      id: 4,
      title: "Secure Data Handling",
      description: "Ensure employee data privacy with encrypted storage.",
      icon: "🔒",
    },
  ];

  return (
    <div className="py-16 bg-gradient-to-r from-[#3E007C] via-[#6A0DAD] to-[#9A4DFF] text-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <motion.div
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-extrabold text-orange-600">Our Services</h2>
        <p className="mt-4 text-white text-lg">
          Streamline your HR and team management with our powerful tools.
        </p>
      </motion.div>

      {/* Services Section */}
      <div className="mt-12 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            className="p-6 bg-white rounded-xl shadow-lg flex items-center space-x-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-5xl">{service.icon}</span>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA Section */}
      <motion.div
        className="mt-16 max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-2xl font-bold text-gray-800">Optimize Your Workforce Today!</h3>
        <p className="text-white mt-2">
          Let us help you manage your employees efficiently.
        </p>
        <Link to="/">
          <motion.button

            className="mt-4 px-6 py-3 bg-orange-600 text-white font-semibold rounded-lg hover:bg-indigo-700"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Get Started
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};

export default Service;
