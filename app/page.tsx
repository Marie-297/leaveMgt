import Authentication from "@/components/other/Authentication";
import Image from "next/image";
import animation from '../public/scan-person.gif'


export default function Home() {
  return (
    <main className="flex flex-col lg:flex-row h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800 sky">
      <div className="border-0 lg:flex lg:flex-col lg:w-1/4 md:w-1/4 w-full h-1/3 lg:h-full">
        <div className="lg:h-1/2 md:h-1/2 h-full flex flex-col justify-center items-center text-left lg:bg-blue-400 md:bg-blue-400 p-2 bg-transparent">
          <h1 className="font-bold text-wrap text-center text-4xl font-poppins text-white">Leave Management System</h1>
          <small className="font-montserrat italic font-extrabold lg:text-xl md:text-xl text-sm mt-6 text-black">Your Leave, Your Way – Seamless and Stress-Free.</small>
        </div>
        <Image src={animation} alt="Scan person" className="h-1/2 object-cover w-full p-2 hidden lg:block md:block" />
      </div>
      <Authentication />
    </main>
  )
}
