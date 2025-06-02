// api/create-checkout-session.js
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'jpy',
            product_data: {
              name: 'プレミアム恋愛診断',
            },
            unit_amount: 500,
          },
          quantity: 1,
        },
      ],
      success_url: `${req.headers.origin}/chat`,
      cancel_url: `${req.headers.origin}/result`,
    });

    // ✅ URLで返す（ここが重要）
    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('Stripe error:', err);
    res.status(500).json({ error: 'Stripe session error' });
  }
}
