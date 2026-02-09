import Link from "next/link";

const layout = ({
    children,
    development,
    marketing,
    profit,
}: {
    children: React.ReactNode;
    development: React.ReactNode;
    marketing: React.ReactNode;
    profit: React.ReactNode;
}) => {
    return (
        <div>
            <nav className="p-4 space-x-7 text-lg  font-semibold">
                <Link href="/development">development</Link>
                <Link href="/marketing">Marketing</Link>
                <Link href="/sales">Sales</Link>
                <Link href="/profit">Profit</Link>
                <Link href="/production">Production</Link>
            </nav>
            <div className="grid grid-cols-2">
                <div className="h-16 border-2 border-blue-700">
                    {development}
                </div>
                <div className="h-16 border-2 border-green-700">
                    {marketing}
                </div>
                <div className="h-16 border-2 border-green-700">{profit}</div>
            </div>
            <div className="h-52 border-2 border-red-700">{children}</div>
        </div>
    );
};

export default layout;
