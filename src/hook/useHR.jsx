import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const UseHR = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure()
    const { data: isHR, isPending: isHRLoading } = useQuery({
        queryKey: [user?.email, 'isHR'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/HR/${user.email}`)
            return res.data?.HR
        }
    })
    return [isHR, isHRLoading]
}
export default UseHR;
