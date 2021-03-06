import { useEffect, useRef } from "react";
import TagManager from "react-gtm-module";
import Router from "next/router";
const Paypal = ({ titles, totalPrice, potentialOrder }) => {
  const paypal = useRef();
  useEffect(() => {
    window?.paypal
      .Buttons({
        createOrder: (data, actions, error) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: titles,
                amount: {
                  currency_code: "USD",
                  value: totalPrice,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const tagManagerArgs = {
            dataLayer: {
              event: "Purchase",
              PurchaseAmount: totalPrice,
            },
          };
          TagManager.dataLayer(tagManagerArgs);
          potentialOrder();

          return actions.order.capture().then(function (details) {
            alert("Transaction completed by " + details.payer.name.given_name);
            setTimeout(() => {
              Router.push("/Success?paypal=true");
            });
          });
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  }, [potentialOrder, titles, totalPrice]);
  return (
    <div>
      <div ref={paypal}> </div>
    </div>
  );
};

export default Paypal;
