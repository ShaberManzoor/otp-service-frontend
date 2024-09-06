"use client";

import { useState } from "react";
import { ProfileForm } from "@/components/ProfileForm";
import VerifyForm from "@/components/VerifyForm";

export default function Home() {
  const [email, setEmail] = useState<string>("");
  const [generated, setGenerated] = useState<boolean>(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-800">
      <div className="bg-gray-950 shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">
          OTP Service
        </h1>

        {!generated ? (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-white">
              Generate OTP
            </h2>
            <ProfileForm setGenerated={setGenerated} setEmail={setEmail} />
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-white">
              Verify OTP
            </h2>
            <VerifyForm email={email} setGenerated={setGenerated} />
          </div>
        )}
      </div>
    </div>
  );
}
