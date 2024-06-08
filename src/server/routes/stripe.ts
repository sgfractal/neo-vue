import express, { Request, Response } from 'express';
import Stripe from 'stripe';

const router = express.Router();
const stripe = new Stripe('your_stripe_secret_key', {
  apiVersion: '2024-04-10',
});

interface CreateCustomerRequest extends Request {
  body: {
    email: string;
  };
}

interface CreateSubscriptionRequest extends Request {
  body: {
    customerId: string;
    priceId: string;
  };
}

// Create a new customer
router.post('/create-customer', async (req: CreateCustomerRequest, res: Response) => {
  const { email } = req.body;
  try {
    const customer = await stripe.customers.create({ email });
    res.json({ customerId: customer.id });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send('An unknown error occurred');
    }
  }
});

// Create a subscription
router.post('/create-subscription', async (req: CreateSubscriptionRequest, res: Response) => {
  const { customerId, priceId } = req.body;
  try {
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
    });
    res.json(subscription);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    } else {
      res.status(500).send('An unknown error occurred');
    }
  }
});

export default router;
