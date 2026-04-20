import type { Metadata } from "next";

import EmailOtpLogin from "@/components/email-otp-login";

export const metadata: Metadata = {
  title: "Email OTP Login",
  description: "Sign in to Fingoh using your email and one-time password.",
};

export default function LoginPage() {
  return <EmailOtpLogin />;
}
