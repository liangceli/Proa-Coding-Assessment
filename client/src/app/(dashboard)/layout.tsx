import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

// app/(dashboard)/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
        <Navbar/>
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
      {children}
      <Footer/>
    </div>
  );
}