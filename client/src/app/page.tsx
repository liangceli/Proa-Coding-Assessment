import Navbar from "@/components/Navbar";
import SearchPage from "./(dashboard)/search/page";
import Footer from "@/components/Footer";
import Landing from "./landing/page";

export default function Home() {
  return (
    <div className="h-full w-full">
      <Navbar />
      <main className={`h-full flex w-full flex-col`}>
        {/* <SearchPage /> */}
        <Landing />
      </main>
      <Footer />
    </div>
  );
}