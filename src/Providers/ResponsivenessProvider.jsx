import PropTypes from "prop-types";
import { useMediaQuery } from "@mui/material";
import { createContext } from "react";

export const ResponsivenessContext = createContext();
const ResponsivenessProvider = ({ children }) => {
  const isMobileView = useMediaQuery(
    "(max-width: 680px)"
  );
  const isLaptopView = useMediaQuery(
    "(min-width: 900px) and (max-width: 1100px)"
  );
  const isDesktopView = useMediaQuery("(min-width: 1024px)");
  const isDesktopView2 = useMediaQuery("(min-width: 1030px)");

  const responsivenessInfo = { isMobileView, isLaptopView, isDesktopView, isDesktopView2 };

  return (
    <ResponsivenessContext.Provider value={responsivenessInfo}>
      {children}
    </ResponsivenessContext.Provider>
  );
};

ResponsivenessProvider.propTypes = {
  children: PropTypes.any,
};

export default ResponsivenessProvider;
