// server.js
require('dotenv').config();
const express = require('express');
const app = express();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'jpy',
            product_data: {
              name: 'プレミア診断プラン',
            },
            unit_amount: 500, // 500円
          },
          quantity: 1,
        },
      ],
      success_url: 'http://localhost:5173/premium',
      cancel_url: 'http://localhost:5173/',
    });

    res.json({ url: session.url });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to create session' });
  }
});

app.listen(4242, () => console.log('Stripe server running on http://localhost:4242'));
