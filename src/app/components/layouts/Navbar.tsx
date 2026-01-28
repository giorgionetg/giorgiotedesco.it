import Logo from "@/app/components/Logo";

export default function Navbar() {
    return (
        <div className="flex sticky top-0 items-center justify-between w-full bg-white dark:bg-primary p-4">
            <Logo className="w-15 h-15" />
            <ul className="flex flex-row items-center justify-center gap-x-5">
                <li className="text-primary dark:text-white"><a href="/">Home</a></li>
                <li className="text-primary dark:text-white"><a href="/about-me">About Me</a></li>
                <li className="text-primary dark:text-white"><a href="/digital-garden">Digital Garden</a></li>
                <li className="text-primary dark:text-white"><a href="/solutions">Solutions</a></li>
                <li className="text-primary dark:text-white"><a href="/contact-me">Contact Me</a></li>
            </ul>
        </div>
    );
}