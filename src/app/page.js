import Banner from "@/components/homepage/Banner";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import Image from "next/image";



export default function Home() {
  return (
    <div>
      <ProtectedRoute>
        <Banner />
      </ProtectedRoute>
    </div>
  )
}
