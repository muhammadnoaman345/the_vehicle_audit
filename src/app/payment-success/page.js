import { CheckCircle } from "lucide-react";

export default function Page() {
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
