import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import axios from 'axios';

interface PaypalButtonProps {
    orderPrice: number;
    handleCardSubmit: () => void;
}

const PaypalButton = ({ orderPrice, handleCardSubmit }: PaypalButtonProps) => {
    const paypalCreateOrder = async () => {
        try {
            const response = await axios.post('/api/paypal/createorder', {
                user_id: `sb-9a2ay34748160 ${Date.now()}`,
                order_price: orderPrice
            })
            console.log('Order Response >>>', response);
            return response.data.data.result.id;
        } catch (err) {
            // Your custom code to show an error like showing a toast:
            // toast.error('Some Error Occured')
            console.log('Error after create order >>>', err);
        }
    }

    const paypalCaptureOrder = async (orderID: string) => {
        try {
            const response = await axios.post('/api/paypal/captureorder', {
                orderID
            });

            if (response.data.success) {
                // Order is successful
                // Your custom code

                // Like showing a success toast:
                // toast.success('Amount Added to Wallet')

                // And/Or Adding Balance to Redux Wallet
                // dispatch(setWalletBalance({ balance: response.data.data.wallet.balance }))
                return response.data;
            }
        } catch (err) {
            // Order is not successful
            // Your custom code

            // Like showing an error toast
            // toast.error('Some Error Occured')
            console.log('Error after Order >>>', err)
        }
    }

    return (
        <PayPalScriptProvider
            options={{
                clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '',
                currency: 'USD',
                intent: 'capture'
            }}
        >
            <PayPalButtons
                style={{
                    color: 'white',
                    shape: 'rect',
                    label: 'buynow',
                    height: 50
                }}
                fundingSource="paypal"
                createOrder={async () => {
                    console.log('inside createOrder ->>>', orderPrice);
                    const order_id = await paypalCreateOrder()
                    return order_id + '';
                }}
                onApprove={async (data) => {
                    const response = await paypalCaptureOrder(data.orderID)
                    console.log('OnApproved >>>', response);
                    handleCardSubmit();
                }}
            />
        </PayPalScriptProvider>
    );
};

export default PaypalButton;