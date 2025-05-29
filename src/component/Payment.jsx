import CheckOutForm from "./CheckOutForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useLoaderData } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PY);

const Payment = () => {
    const data= useLoaderData()
    console.log(data.salary);



    return (
        <div className="p-6 mx-auto bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Payment</h1>
            <Elements stripe={stripePromise}>
                <CheckOutForm data={data} />
            </Elements>
        </div>
    );
};

export default Payment;
