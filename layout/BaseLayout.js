import Navbar from "../components/Navbar";
import Footer from '../components/Footer'
const BaseLayout = ({ children, page = "" }) => {
  const isHomePage = () => page === "Home";

  return (
    <div className="portfolio-app">
      <Navbar />
      
      <div className="container">{children}</div>
      {/* FOOTER STARTS */}
      <Footer />
      {/* FOOTER ENDS */}

    </div>
  );
};

export default BaseLayout;
