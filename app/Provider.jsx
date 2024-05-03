"use client";
import React from "react";
import Header from "./_components/Header";
import DrawerSearchField from "./_components/DrawerSearchFiled";

const Provider = ({ children }) => {
  return (
    <div>
      

      <div className="items-center">
      <Header />
      <DrawerSearchField />
        {children}
        </div>
    </div>
  );
};

export default Provider;
