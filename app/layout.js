import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "./Provider";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Kejani Real Estate",
  description: "House Listings",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className={inter.className}>
        <Provider> 
        {children}
        </Provider>
      </body>
    </html>
    </ClerkProvider>
  );
}
