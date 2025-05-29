import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const MeetOurTeam = () => {
    const team = [
        {
            id: 1,
            name: "Shahadat Sohel",
            role: "Founder & CEO",
            image: "https://i.ibb.co.com/pxyB2pJ/aedc86fa-f899-432a-9c2a-e0135ce0cc35.jpg",
            bio: "Shahadat has over 15 years of experience in HR and technology, leading the way for innovative employee management solutions.",
        },
        {
            id: 2,
            name: "Ebrahim Hossain",
            role: "CTO",
            image: "https://i.ibb.co.com/4MF19D0/Fiverr-pp.jpg",
            bio: "Ebrahim oversees our tech operations, ensuring our platform remains fast, secure, and scalable.",
        },
        {
            id: 3,
            name: "Emily Davis",
            role: "Head of Customer Success",
            image: "https://i.ibb.co.com/P4ynvw5/20240321-142735.jpg",
            bio: "Emily is dedicated to helping our clients get the most out of our services through world-class support.",
        },
        {
            id: 4,
            name: "Mark Wilson",
            role: "Lead Developer",
            image: "https://i.ibb.co.com/Ch1VZv4/For-CV.jpg",
            bio: "Mark is the mastermind behind our intuitive platform, constantly improving its features and performance.",
        },
    ];

    return (
        <motion.div
            className="py-16 bg-gradient-to-r from-[#3E007C] via-[#6A0DAD] to-[#9A4DFF] text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            <div className="container mx-auto px-4 text-center">
                {/* Heading */}
                <motion.h2
                    className="text-4xl font-bold text-orange-500 mb-8"
                    initial={{ y: -30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    Meet Our Team
                </motion.h2>

                {/* Description */}
                <motion.p
                    className="text-lg text-white mb-12"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    The people behind our platform are dedicated to empowering your organization with the best tools and support.
                </motion.p>

                {/* Swiper Carousel */}
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 3000 }}
                    loop={true} // Enables infinite looping
                    spaceBetween={30}
                    slidesPerView={1}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    className="w-full max-w-5xl mx-auto"
                >
                    {team.map((member, index) => (
                        <SwiperSlide key={member.id}>
                            <motion.div
                                className="bg-white p-6 rounded-lg shadow-lg transition-all flex flex-col items-center justify-between"
                                style={{ height: "320px", width: "280px" }} // Fixed box size
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                            >
                                {/* Image */}
                                <motion.img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-24 h-24 object-cover rounded-full border-4 border-gray-200"
                                    initial={{ scale: 0.5 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                />

                                {/* Name & Role */}
                                <h3 className="text-xl font-semibold text-gray-800 mt-2">
                                    {member.name}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    {member.role}
                                </p>

                                {/* Bio */}
                                <motion.p
                                    className="text-gray-600 text-sm text-center px-2"
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                >
                                    {member.bio}
                                </motion.p>
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </motion.div>
    );
};

export default MeetOurTeam;
