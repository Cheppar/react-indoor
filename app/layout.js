import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "./Provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";


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
         <Toaster position="top-center"/>
        {children}
        </Provider>
      </body>
    </html>
    </ClerkProvider>
  );
}
