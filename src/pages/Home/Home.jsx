import Banner from "./Banner";
import MeetOurTeam from "./MeetOurTeam";
import Services from "./Services";
import Testimonials from "./Testimonials";
import WhyChooseUs from "./WhyChose";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Services></Services>
            <Testimonials></Testimonials>
            <WhyChooseUs></WhyChooseUs>
            <MeetOurTeam></MeetOurTeam>
        </div>
    );
}

export default Home;
