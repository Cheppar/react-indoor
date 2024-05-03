import React from "react";
import Header from "./_components/Header";

const Provider = ({ children }) => {
  return (
    <div>
     
        <Header/>
      <div className="mt-10 items-center">{children}</div>
    </div>
  );
};

export default Provider;
