import axios from "axios";

const UseAxiosPublic = () => {

    const axiosPublic = axios.create({
        baseURL: 'https://core-team-server.vercel.app',
    });

    return axiosPublic;
}

export default UseAxiosPublic;
