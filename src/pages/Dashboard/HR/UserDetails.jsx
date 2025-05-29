// import { useQuery } from "@tanstack/react-query";
// import { useContext } from "react";
// import UseAxiosPublic from "../../../hook/useAxiosPublic";
// import { AuthContext } from "../../../providers/AuthProvider";

const UserDetails = () => {
    // const { user } = useContext(AuthContext); // ✅ Correct way to use context
    // const axiosPublic = UseAxiosPublic();

    // Fetch user details only when user is available
    // const { data: userData, isLoading, isError, error } = useQuery({
    //     queryKey: ["userDetails", user?.email], // ✅ Query is based on email
    //     queryFn: async () => {
    //         if (!user?.email) return null; // ✅ Prevent API call if no email
    //         const res = await axiosPublic.get(`/user/${user.email}`); // ✅ Correct API endpoint
    //         return res.data;
    //     },
    //     enabled: !!user?.email, // ✅ Only fetch data if email exists
    // });

    // if (isLoading) return <p>Loading...</p>;
    // if (isError) return <p className="text-red-500">Error: {error.message}</p>;

    return (<>
        {/* <div className="max-w-lg mx-auto bg-white p-6 shadow-lg rounded-lg mt-8"> */}
            {/* User Info */}
            {/* <div className="flex items-center space-x-6">
                <img
                    src={userData?.photoURL}
                    alt={userData?.name}
                    className="w-24 h-24 rounded-full shadow-md border"
                />
                <div>
                    <h1 className="text-2xl font-bold">{userData?.name || "No Name Found"}</h1>
                    <p className="text-gray-600">{userData?.designation || "No Designation"}</p>
                </div>
            </div> */}
        {/* </div> */}
        </>

    );
};

export default UserDetails;
