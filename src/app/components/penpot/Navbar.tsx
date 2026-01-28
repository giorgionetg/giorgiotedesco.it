import Logo from "../Logo";

export default function Navbar() {

    return (
        <div className="flex flex-row  grid p-[10px] items-center justify-start  top-[252px] left-[246px] w-full h-[61px] bg-white">
            <div className="flex flex-row items-center justify-center w-full h-[82px] self-start">
                <div className="relative mx-[10px] self-center">
                    <Logo className="w-10 h-10" />
                </div>
                <div className="flex flex-row px-[5px] gap-x-[10px] items-center justify-end w-full">
                    <div className="text-black text-sm leading-[1.2] relative">
                        Home
                    </div>
                    <div className="text-black text-sm leading-[1.2] relative">
                        Voce2
                    </div>
                    <div className="text-black text-sm leading-[1.2] relative">
                        Voce3
                    </div>
                </div>
            </div>
        </div>)
}