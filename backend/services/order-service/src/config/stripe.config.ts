import stripe from 'stripe'
import { env } from "../config/env";
import { ApiError } from '../utils';

if (!env.STRIPE_SK) {
    throw new ApiError(404, 'Stripe SK not found')
}

export const stripeClient = new stripe(env.STRIPE_SK , {apiVersion: "2025-06-30.basil"});