import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AnalyticsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <div className="space-x-5">
                <Button asChild>
                    <Link href="/dashboard/analytics/weekly">Weekly</Link>
                </Button>
                <Button asChild>
                    <Link href="/dashboard/analytics/monthly">Monthly</Link>
                </Button>
            </div>
            {children}
        </div>
    );
}
