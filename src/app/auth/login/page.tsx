import Image from "next/image";
import AvaraLogo from "@/../public/img/avara-logo.png";
import LoginForm from "./components/LoginForm";
import TestimonialSlider from "./components/TestimonialSlider";

export default async function LoginPage() {

  return (
    <main className="h-screen flex flex-row justify-center bg-gray-100">
      <div className="flex items-center justify-center w-1/2 bg-[#ECF5FF] ">
        <section className="flex flex-row top-0 absolute left-0 z-10 mt-2 ml-2 align-middle justify-center items-center">
          <Image
            src={AvaraLogo}
            alt="avara-logo"
            width={50}
            height={15}
            priority
          />
          <span className="font-bold text-xl">AVARA</span>
        </section>
        <TestimonialSlider />
      </div>
      <div className="flex items-center justify-center p-8 bg-white w-1/2 rounded shadow-md ">
        <LoginForm />
      </div>
    </main>
  );
}
