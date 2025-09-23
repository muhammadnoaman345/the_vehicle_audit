const res = await fetch("/api/create-payment-intent", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    amount,
    data: userData, // 👈 backend expects "data", not "formData"
  }),
});

const { clientSecret, error } = await res.json();

if (error) {
  alert("Failed to start payment. Try again.");
  return;
}

// Use Stripe.js to confirm the payment
const result = await stripe.confirmCardPayment(clientSecret, {
  payment_method: {
    card: elements.getElement(CardElement),
    billing_details: {
      name: `${userData.firstName} ${userData.lastName}`,
      email: userData.email,
      phone: userData.phoneNumber,
      address: {
        line1: userData.billingAddress,
        city: userData.city,
        state: userData.state,
        postal_code: userData.postalCode,
        country: userData.country,
      },
    },
  },
});

if (result.error) {
  alert(result.error.message);
} else if (result.paymentIntent.status === "succeeded") {
  alert("Payment successful 🎉");
}
