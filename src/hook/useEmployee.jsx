import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const UseEmployee = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure()
    const { data: isEmployee, isPending: isEmployeeLoading } = useQuery({
        queryKey: [user?.email, 'isEmployee'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/Employee/${user.email}`)
            return res.data?.Employee
        }
    })
    return [isEmployee, isEmployeeLoading]
}
export default UseEmployee;

