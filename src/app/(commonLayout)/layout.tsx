import Footer from "@/components/Layout/Footer";
import { Navbar } from "@/components/Layout/Navbar";

export default function CommonLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="w-[85%] mx-auto">
            <Navbar />
            {children}
            <Footer />
        </div>
    );
}
