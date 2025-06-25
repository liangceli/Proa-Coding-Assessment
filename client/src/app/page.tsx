import Navbar from "@/components/Navbar";
import SearchPage from "./(dashboard)/search/page";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="h-full w-full">
      <Navbar />
      <main className={`h-full flex w-full flex-col  pt-[64px] p-5`}>
        <SearchPage />
      </main>
      <Footer />
    </div>
  );
}