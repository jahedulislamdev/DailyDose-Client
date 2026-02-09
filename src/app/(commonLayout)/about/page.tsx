export default async function about() {
    await new Promise((res) => setTimeout(res, 4000));
    return <div>About Page</div>;
}
