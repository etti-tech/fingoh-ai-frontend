import type { Metadata } from "next";

import EmailOtpRegister from "@/components/email-otp-register";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create your Fingoh account using email OTP verification.",
};

export default function RegisterPage() {
  return <EmailOtpRegister />;
}
