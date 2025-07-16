"use client";

import Loading from "@/components/Loading/Loading";
import { redirect, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { CheckCircle } from "lucide-react";
import { app } from "../page";

function Page() {
  const searchParams = useSearchParams();
  const id = searchParams.get("doc-id");
  const db = getFirestore();

  useEffect(() => {
    async function updatePaymentStatus() {
      if (id) {
        await updateDoc(doc(db, "sales", id), {
          paymentStatus: "paid",
        });
        redirect("/");
      }
    }
    updatePaymentStatus();
  }, [id]);

  return (
    <div className="w-screen h-[50dvh] flex items-center justify-center !text-white">
      <div className="bg-primary rounded-2xl shadow-xl p-8 flex flex-col items-center">
        <CheckCircle className="w-16 h-16 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
        <p className="text-center mb-4">
          Thank you for your purchase.
          <br />
          Your payment was processed successfully.
          <br />
          You will soon recieve your report.
        </p>
      </div>
    </div>
  );
}

export default function PageWithSuspense() {
  return (
    <Suspense fallback={<Loading />}>
      <Page />
    </Suspense>
  );
}
