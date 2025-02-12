import CardItems from "@/components/CardItems";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-grow">
        <div className="w-full max-w-screen-2xl mx-auto px-4 md:px-2">
          <CardItems />
        </div>
      </main>
      <Footer />
    </>
  );
}
