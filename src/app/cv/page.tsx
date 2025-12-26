
const cvUrl = process.env.JSON_RESUME;



export default async function Page() {

    const res = await fetch(cvUrl as string, { cache: 'force-cache'});
    const cv = await res.json();
    console.log(cv);

    return (<>
        <h1>Hello Next.js!</h1>
        <h2 className="text-5xl font-bold text-red-500">ciao</h2>
        </>)
}