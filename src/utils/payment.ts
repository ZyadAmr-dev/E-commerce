import Stripe from 'stripe';
import dotenv from 'dotenv';
import paypal from '@paypal/checkout-server-sdk';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

interface PaymentStrategy {
    pay(amount: number): Promise<void>;
}

export class CreditCardPayment implements PaymentStrategy {
    public async pay(amount: number): Promise<void> {
        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount, 
                currency: 'usd', 
                payment_method_types: ['card'], 
            });
            
            console.log(`Payment initiated with client secret: ${paymentIntent.client_secret}`);
        } catch (err) {
            console.error(`Error during payment: ${err.message}`);
        }
    }
}

const environment = new paypal.core.SandboxEnvironment(
    process.env.PAYPAL_CLIENT_ID as string,
    process.env.PAYPAL_CLIENT_SECRET as string
);
const paypalClient = new paypal.core.PayPalHttpClient(environment);


export class PayPalPayment implements PaymentStrategy {
    public async pay(amount: number): Promise<void> {
        const request = new paypal.orders.OrdersCreateRequest();

        request.prefer("return=representation");

        request.requestBody({
            intent: "CAPTURE",
            purchase_units: [{
                amount: {
                    currency_code: "USD",
                    value: (amount / 100).toFixed(2),
                }
            }]
        });

        try {
            const order = await paypalClient.execute(request);
            console.log(`Order created with ID: ${order.result.id}`);
        } catch (err) {
            console.error(`Error during PayPal payment: ${err.message}`);
        }
    }
}