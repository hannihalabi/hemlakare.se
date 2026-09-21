-- Byter bokningens Stripe-referens från PaymentIntent till Checkout Session,
-- eftersom betalningsflödet gick från ett inbäddat Payment Element till
-- Stripe Checkout (hostad betalsida, hanterar Klarna/Apple Pay m.fl. utan
-- egen redirect-hantering).

alter table bookings drop constraint if exists bookings_stripe_payment_intent_id_key;
alter table bookings rename column stripe_payment_intent_id to stripe_checkout_session_id;
alter table bookings add constraint bookings_stripe_checkout_session_id_key unique (stripe_checkout_session_id);
