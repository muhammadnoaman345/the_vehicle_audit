"use client";

import { PayPalButtons } from "@paypal/react-paypal-js";
import { useState } from "react";

export default function PayPalSmartButton({ amount, formData }) {
    const [loading, setLoading] = useState(false);

    return (
        <div>
            <PayPalButtons
                style={{ layout: "vertical", shape: "rect" }}
                funding={{
                    disallowed: [window.paypal.FUNDING.PAYLATER],
                }}
                createOrder={async () => {
                    try {
                        setLoading(true);
                        const res = await fetch("/api/create-paypal-payment", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ amount, data: formData }),
                        });
                        const data = await res.json();
                        setLoading(false);
                        return data.id;
                    } catch (err) {
                        console.error("Create order error:", err);
                        setLoading(false);
                    }
                }}
                onApprove={async (data) => {
                    try {
                        setLoading(true);
                        const res = await fetch("/api/capture-paypal-payment", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                token: data.orderID,
                                PayerID: data.payerID,
                            }),
                        });
                        const details = await res.json();
                        setLoading(false);
                        console.log("Details", details);
                        if (details.success) {
                            if (window.confirm("✅ Payment successful! Click OK to return to homepage.")) {
                                window.location.href = "/";
                            }
                        } else {
                            alert("❌ Payment failed: " + details.error);
                        }
                    } catch (err) {
                        console.error("Capture error:", err);
                        setLoading(false);
                    }
                }}
                onError={(err) => {
                    console.error("PayPal button error:", err);
                    alert("PayPal checkout error. Try again.");
                }}
            />
        </div>
    );
}