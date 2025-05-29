import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ContactUs = () => {
  return (
    <section className="bg-gradient-to-r from-[#3E007C] via-[#6A0DAD] to-[#9A4DFF] text-white min-h-screen flex items-center justify-center px-6 py-12">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">
        {/* Heading */}
        <motion.h2
          className="text-5xl font-extrabold text-center text-orange-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Contact Us
        </motion.h2>
        <motion.p
          className="text-center text-white mt-4 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          We’re here to help. Reach out to us and we’ll get back to you as soon as possible.
        </motion.p>

        {/* Contact Form */}
        <motion.form
          action="#"
          method="POST"
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Name */}
            <motion.div whileHover={{ scale: 1.05 }}>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                className="w-full px-4 py-2 mt-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Your full name"
              />
            </motion.div>

            {/* Email */}
            <motion.div whileHover={{ scale: 1.05 }}>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="w-full px-4 py-2 mt-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Your email address"
              />
            </motion.div>
          </div>

          {/* Message */}
          <motion.div whileHover={{ scale: 1.05 }}>
            <label htmlFor="message" className="block text-sm font-semibold text-gray-700">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              required
              className="w-full px-4 py-2 mt-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Your message"
            ></textarea>
          </motion.div>

          {/* Submit Button */}
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link to="/">
              <button
                type="submit"
                className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition duration-200"
              >
                Send Message
              </button>
            </Link>
          </motion.div>
        </motion.form>

        {/* Address & Map */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <p className="text-xl font-semibold text-gray-800">Visit Us:</p>
          <p className="text-lg text-gray-600">Tajhat, Station Road, Rangpur, Bangladesh</p>

          <motion.div className="mt-6 rounded-lg overflow-hidden" whileHover={{ scale: 1.02 }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.900681963545!2d90.3562746!3d23.8101664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b81c5bb2e4a7%3A0x8a22833a7b5c3421!2sDhaka!5e0!3m2!1sen!2sbd!4v1614262329352!5m2!1sen!2sbd"
              width="100%"
              height="350"
              style={{ border: "0" }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactUs;
