import handler from './util/handler';
import Stripe from 'stripe';
import {calculateCost} from './util/cost';

export const main = handler(async (event) => {
	const {storage, source} = JSON.parse(event.body);

	const amount = calculateCost(storage);
	const description = 'Scratch charge';

	// load secret from env
	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

	await stripe.charges.create({
		source, amount, description, currency: 'usd'
	})

	return {status: true}
})