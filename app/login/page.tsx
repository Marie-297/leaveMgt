import Authentication from "@/components/other/Authentication";
import Image from "next/image";
import animation from '../../public/scan-person.gif'


export default function Home() {
  return (
    <main className="flex">
      <div className="flex flex-col w-1/4">
        <div className="h-1/2 flex flex-col justify-center items-center text-left bg-blue-400 p-2">
          <h1 className="font-bold text-wrap text-4xl font-poppins text-white">Leave Management System</h1>
          <small className="font-montserrat italic font-extrabold text-xl">Your Leave, Your Way – Seamless and Stress-Free.</small>
        </div>
        <Image src={animation} alt="Scan person" className="h-1/2 object-cover w-full p-2" unoptimized />
      </div>
      <Authentication />
    </main>
  )
}
