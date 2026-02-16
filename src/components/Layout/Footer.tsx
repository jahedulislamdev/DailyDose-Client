import Link from "next/link";

const Footer = () => {
    return (
        <footer className="w-full border-t mt-10">
            <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between text-sm text-muted-foreground">
                <span>
                    © {new Date().getFullYear()} DailyDose. All rights reserved.
                </span>
                <a
                    href="https://ai-gen-portfolio.vercel.app/"
                    target="_blank"
                    className="font-mono"
                >
                    Jahedul islam Jishan
                </a>
            </div>
        </footer>
    );
};

export default Footer;
