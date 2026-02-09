import Link from "next/link";

const layout = ({
    admin,
    user,
}: {
    admin: React.ReactNode;
    user: React.ReactNode;
}) => {
    const userInfo = {
        role: "admin",
    };
    return (
        <div>
            <nav className="my-6 space-x-6">
                <Link href="/admin">Admin</Link>
                <Link href="/user">User</Link>
            </nav>
            {userInfo.role === "admin" ? admin : user}
        </div>
    );
};

export default layout;
