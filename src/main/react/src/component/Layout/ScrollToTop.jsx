import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ScrollToTop = () => {
  const location = useLocation();
  const topRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const scrollToTop = () => {
      if (topRef.current) {
        topRef.current.scrollIntoView({ behavior: "smooth" });
      }
    };
    // if (topRef.current) {
    //   topRef.current.scrollIntoView({ behavior: "smooth" });
    // }
    scrollToTop();

    // const delay = 500; // milliseconds
    // const timeoutId = setTimeout(() => {
    //   navigate(location.pathname);
    // }, delay);

    // // Cleanup the timeout to avoid navigating after unmounting
    // return () => clearTimeout(timeoutId);
  }, [location, navigate]);

  return <div ref={topRef} tabIndex="-1" />;
};
export default ScrollToTop;
