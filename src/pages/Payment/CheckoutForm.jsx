import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const CheckoutForm = ({
  userData,
  totalBill,
  selectMn,
  today,
  userClassData,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [clientsecret, setClientsecret] = useState("");
  const [errormessage, setErromessage] = useState("");
  const navigate = useNavigate();
  console.log("user-data", userData);
  console.log("mon", selectMn);
  console.log("mon", totalBill);
  console.log("classdata", userClassData);

  useEffect(() => {
    if (totalBill !== undefined && totalBill >=1) {
      fetch("http://localhost:5000/create-payment-intent", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ totalBill }),
      })
        .then((res) => res.json())
        .then((data) => {
          setClientsecret(data.clientSecret);
          console.log("client", data.clientSecret);
        });
    }
  }, [totalBill]);

  const handleSubmitPayment = async (e) => {
    console.log("first")
    e.preventDefault();
    setLoading(true);
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    console.log("second");

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setErromessage(error.message);
      // message.error(error.message);
      console.log("error message", error);
    } else {
      console.log("payment method", paymentMethod);
      setErromessage("");
      console.log(card);
      // navigate("/validation", {state:{ paymentMethod: paymentMethod , passInfo: state.passInfo, train:state.train, userData: state.userData}})
    }

    const { paymentIntent, error: errorConfirm } =
      await stripe.confirmCardPayment(clientsecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: userData.first_name,
            email: userData.email,
          },
        },
      });

    if (errorConfirm) {
      // message.error(errorConfirm.message);
      setErromessage(error.message);
    } else {
      console.log(paymentIntent);
      setErromessage("");

      let strMonth = "";
      selectMn.forEach((item) => {
        if (strMonth === "") {
          strMonth = item;
        } else {
          strMonth = strMonth + "," + item;
        }
      });

      const studentPaymentData = {
        class: userClassData.class_name,
        section: userClassData.section,
        firstName: userData.first_name,
        lastName: userData.last_name,
        username: userData.username,
        email: userData.email,
        months: strMonth,
        bill: totalBill,
        date: today,
      };

      fetch("http://localhost:5000/student-payment", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(studentPaymentData),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res) {
            // setSearchResult(res);
          }
          console.log("payment result", res);
        });

      
        navigate("/payment/success");
      //   navigate("/validation", {
      //     state: {
      //       paymentMethod: paymentMethod,
      //       passInfo: state.passInfo,
      //       train: state.train,
      //       userData: state.userData,
      //       sitResult: state.sitResult,
      //     },
      //   });
      //   setLoading(false);
    }
  };

  return (
    <div className="w-full flex items-center flex-col">
      <div className="p-2 rounded-md border w-full">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </div>
      <button
        onClick={handleSubmitPayment}
        className="color-secendary px-6 py-1.5 shadow-sm rounded font-semibold mt-4"
        type="submit"
      >
        Checkout
      </button>
    </div>
  );
};

export default CheckoutForm;
