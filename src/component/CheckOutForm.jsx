/* eslint-disable react/prop-types */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";

const CheckOutForm = ({ data }) => {
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false); // To show processing status
  const [paymentError, setPaymentError] = useState(null); // To handle errors
  const { user } = useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements();
  // console.log(data);

  useEffect(() => {
    if (data) {
      axios
        .post("https://core-team-server.vercel.app/stripe-payment", { price: data.salary })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        })
        .catch((err) => {
          console.error("Error generating client secret:", err);
        });
    }
  // eslint-disable-next-line react/prop-types
  }, [data, data.salary]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setPaymentError(null);

    if (!stripe || !elements) {
      console.error("Stripe has not loaded yet.");
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      console.error("CardElement not found.");
      return;
    }

    setProcessing(true);

    // Create Payment Method
    const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
      billing_details: {
        email: user?.email || "default@example.com",
        name: user?.displayName || "Anonymous",
      },
    });

    if (paymentMethodError) {
      console.error("Error creating payment method:", paymentMethodError);
      setPaymentError(paymentMethodError.message);
      setProcessing(false);
      return;
    }

    // Confirm Payment
    const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethod.id,
    });

    if (confirmError) {
      console.error("Error confirming payment:", confirmError);
      setPaymentError(confirmError.message);
    } else {
      console.log("Payment successful:", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        // Payment succeeded
        console.log("Payment succeeded! Payment ID:", paymentIntent.id);

        // TODO: Perform any post-payment actions, such as saving payment details to the server
        try {
          await axios.post("https://core-team-server.vercel.app/payment", {
            paymentIntentId: paymentIntent.id,
            // paymentDetails: payment,
            userId: data._id,
            email:data.email,
            name:data.name,
            ammount:data.salary,
            year:data.year,
            month:data.month,
            status:'succeeded'
          });
          console.log("Payment details saved successfully!");
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Payment Send Successfully",
            showConfirmButton: false,
            timer: 1500
          });
        } catch (err) {
          console.error("Error saving payment details:", err);
        }
      }
    }

    setProcessing(false);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6">Payment Information</h2>
      {paymentError && <p className="text-red-500 mb-4">{paymentError}</p>}
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label htmlFor="card" className="block text-gray-700 font-medium">
            Credit Card Information
          </label>
          <CardElement
            id="card"
            options={{
              style: {
                base: {
                  iconColor: "#666EE8",
                  color: "#31325F",
                  fontWeight: 400,
                  fontSize: "16px",
                  fontSmoothing: "antialiased",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  iconColor: "#e85746",
                  color: "#e85746",
                },
              },
            }}
          />
        </div>

        <div className="mb-4">
          <button
            type="submit"
            className={`w-full py-3 bg-blue-500 text-white font-semibold rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 ${
              processing ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!stripe || !clientSecret || processing}
          >
            {processing ? "Processing..." : "Pay Now"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckOutForm;
