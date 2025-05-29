import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Autoplay } from "swiper/modules";

const Testimonials = () => {
    const testimonials = [
        {
            id: 1,
            name: "John Doe",
            role: "CEO, Tech Innovations",
            feedback:
                "This company has revolutionized the way we manage our employees. Their platform is intuitive, efficient, and has saved us countless hours!",
            image: "https://i.pravatar.cc/150?img=1",
        },
        {
            id: 2,
            name: "Jane Smith",
            role: "HR Manager, Green Solutions",
            feedback:
                "I can't recommend them enough! Their payroll management and attendance tracking tools are a game-changer.",
            image: "https://i.pravatar.cc/150?img=2",
        },
        {
            id: 3,
            name: "Michael Brown",
            role: "Team Lead, Creative Studio",
            feedback:
                "The performance review features have helped us identify key areas of improvement and foster employee growth. Fantastic service!",
            image: "https://i.pravatar.cc/150?img=3",
        },
    ];

    return (
        <motion.div
            className="py-16 bg-gradient-to-r from-[#3E007C] via-[#6A0DAD] to-[#9A4DFF] text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
        >
            <div className="container mx-auto px-6 text-center text-orange-600 max-w-4xl">
                {/* Section Heading */}
                <motion.h2
                    className="text-4xl font-bold mb-6"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    What Our Clients Say
                </motion.h2>

                {/* Description */}
                <motion.p
                    className="text-lg text-gray-200 mb-10"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    Hear from our satisfied clients and see how we’ve transformed their businesses.
                </motion.p>

                {/* Swiper Carousel */}
                <Swiper
                    modules={[Pagination, Autoplay]}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    spaceBetween={30}
                    slidesPerView={1}
                    className="w-full"
                >
                    {testimonials.map((testimonial, index) => (
                        <SwiperSlide key={testimonial.id}>
                            <motion.div
                                className="bg-white p-8 rounded-xl shadow-md border border-gray-200 max-w-3xl mx-auto text-gray-800"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                            >
                                {/* Client Image */}
                                <motion.img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-gray-300"
                                    initial={{ scale: 0.8 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.5 }}
                                />

                                {/* Client Name & Role */}
                                <h3 className="text-2xl font-semibold">
                                    {testimonial.name}
                                </h3>
                                <p className="text-gray-500 text-sm mb-4">
                                    {testimonial.role}
                                </p>

                                {/* Client Feedback */}
                                <motion.p
                                    className="text-gray-700 text-lg leading-relaxed"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                >
                                    &quot;{testimonial.feedback}&quot;
                                </motion.p>
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </motion.div>
    );
};

export default Testimonials;
