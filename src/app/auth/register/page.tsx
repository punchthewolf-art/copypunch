import { Suspense } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AuthForm from "@/components/auth/AuthForm";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <Suspense>
          <AuthForm mode="register" />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
