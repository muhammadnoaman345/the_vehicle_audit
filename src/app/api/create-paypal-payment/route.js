import { NextResponse } from "next/server";

export const runtime = "nodejs";

const paypal = require("@paypal/checkout-server-sdk");

const environment = new paypal.core.LiveEnvironment(
  process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
  process.env.NEXT_PUBLIC_PAYPAL_SECRET      
);
const client = new paypal.core.PayPalHttpClient(environment);
const temporaryUserDataStore = new Map();

function toCountryCode(label) {
  const map = {
    "United States (US)": "US",
    Canada: "CA",
    "United Kingdom (UK)": "GB",
    Australia: "AU",
    Ireland: "IE",
    Scotland: "GB",       
    Newzealand: "NZ",   
  };
  return map[label] || "US";
}

export async function POST(request) {
  try {
    const { amount, data } = await request.json();

    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      address,      
      country,
      state,
      city,
      postalCode,
      billingAddress,
      ...rest
    } = data || {};

    if (!amount) {
      return NextResponse.json({ error: "Amount is required" }, { status: 400 });
    }

    const orderRequest = new paypal.orders.OrdersCreateRequest();
    orderRequest.prefer("return=representation");
    console.log("Order Amount", amount);
    orderRequest.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: String(amount),
          },
          shipping: {
            name: { full_name: `${firstName || ""} ${lastName || ""}`.trim() },
            address: {
              address_line_1: (address || billingAddress || "").slice(0, 300),
              admin_area_2: city || undefined,
              admin_area_1: state || undefined,
              postal_code: postalCode || undefined,
              country_code: toCountryCode(country),
            },
          },
        },
      ],
      application_context: {
        brand_name: "The Vehicle Audti",
        landing_page: "LOGIN",
        user_action: "PAY_NOW",
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
      },
    });

    const order = await client.execute(orderRequest);
    temporaryUserDataStore.set(order.result.id, data);
    temporaryUserDataStore.set(order.result.id, data);
    console.log("Stored user data for order:", order.result.id);
    if (typeof global.temporaryUserDataStore === 'undefined') {
      global.temporaryUserDataStore = new Map();
    }
    global.temporaryUserDataStore.set(order.result.id, data);

    return NextResponse.json({
      id: order.result.id,
      links: order.result.links, 
    });
  } catch (err) {
    console.error("PayPal Error:", err);
    return NextResponse.json(
      { error: err?.message || "PayPal create order failed" },
      { status: 500 }
    );
  }
}
