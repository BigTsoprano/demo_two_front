import { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { useSelector } from "react-redux";

import { loadStripe } from "@stripe/stripe-js";

const KEY = import.meta.env.VITE_APP_STRIPE;

function Payment() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    setStripePromise(loadStripe(KEY));
  }, []);

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const rawResponse = await fetch(
          "http://localhost:5000/api/checkout/create-payment-intent",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ amount: cart.total * 100 }),
          }
        ).then(async (result) => {
          var { clientSecret } = await result.json();
          setClientSecret(clientSecret);
          console.log(rawResponse);
        });
      } catch (err) {
        console.log(err);
      }
    };
    makeRequest();
    // const content = await rawResponse.json();

    // console.log(content);
    // fetch("http://localhost:5000/api/checkout/create-payment-intent", {
    //   method: "POST",
    //   body: JSON.stringify({ amount: cart.total * 100 }),
    // }).then(async (result) => {
    //   var { clientSecret } = await result.json();
    //   setClientSecret(clientSecret);
    // });
  }, []);
  console.log(clientSecret);
  console.log(stripePromise);
  return (
    <>
      <h1>React Stripe and the Payment Element</h1>
      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}

export default Payment;
