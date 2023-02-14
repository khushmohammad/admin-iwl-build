import Link from "next/link";
import React from "react";

const CustomToggle = React.forwardRef(({ children, variant, onClick }, ref) => (
  <Link
    href="/"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    className={variant}
  >
    {children}
  </Link>
));
export default CustomToggle;
