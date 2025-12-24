import React from "react";
import Header from "../Components/GuestLayout/Header";
import Footer from "../Components/GuestLayout/Footer";

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col bg-rakit-100 text-gray-800 font-sans antialiased selection:bg-rakit-500 selection:text-white">
            <Header />
            <main className="flex-grow w-full">{children}</main>
            <Footer />
        </div>
    );
}
