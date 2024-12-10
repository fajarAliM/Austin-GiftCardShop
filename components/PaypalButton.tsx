import { FUNDING, PayPalButtons } from '@paypal/react-paypal-js'

interface PaypalButtonProps {
    orderPrice: number;
    handleCardSubmit: () => void;
}

const PaypalButton = ({ orderPrice, handleCardSubmit }: PaypalButtonProps) => {
    return (
        <PayPalButtons
          style={{
            layout: "vertical",
            color: "white",
            shape: "rect",
            label: "buynow",
          }}
          fundingSource={FUNDING.PAYPAL}
          createOrder={(data, actions) => {
            console.log("paypal--->>>", orderPrice);
            return actions.order.create({
                purchase_units: [
                    {
                        amount: {
                            value: orderPrice.toString(), // Ensure the price is a string
                            currency_code: "USD",
                        },
                    },
                ],
                intent: 'CAPTURE'
            });
          }}
        onApprove={(data, actions) => {
            if (actions.order) {
                return actions.order.capture().then((details) => {
                    // Your custom code after successful capture
                    console.log('Capture details:', details);
                    handleCardSubmit();
                    return Promise.resolve();
                });
            } else {
                return Promise.reject(new Error('Order capture failed'));
            }
        }}
        />
    );
};

export default PaypalButton;