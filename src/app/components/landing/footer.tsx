import Logo from "../Logo";


export default async function Footer() {


    return (
        <footer className="footer sm:footer-horizontal bg-base-200 text-base-content px-4 p-10">
            <aside>
                <Logo className="w-22 h-22" />
                <p>
                    <span className="font-bold">Dott. Giorgio Tedesco</span>
                    <br />
                    Senior Full Stack Developer
                </p>
            </aside>
            <nav>
                <h6 className="footer-title">Solutions</h6>
                <a className="link link-hover">for Freelance</a>
                <a className="link link-hover">for small & medium businesses</a>
            </nav>
            <nav>
                <h6 className="footer-title">Company</h6>
                <a className="link link-hover">About me</a>
                <a className="link link-hover">Contact</a>
                <a className="link link-hover">Collaborate</a>
                <a className="link link-hover">Press kit</a>
            </nav>
            <nav>
                <h6 className="footer-title">Legal</h6>
                <a className="link link-hover">Terms of use</a>
                <a className="link link-hover">Privacy policy</a>
                <a className="link link-hover">Cookie policy</a>
            </nav>
        </footer>
    )

}