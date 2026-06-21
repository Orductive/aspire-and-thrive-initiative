import AnimatedOutlet from "@/components/animations/AnimatedOutlet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Layout = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <AnimatedOutlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
