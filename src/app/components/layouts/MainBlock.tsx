import Navbar from "./Navbar";

export default function MainBlock({ children }: { children: React.ReactNode }) {
    return (
        <><div className="aspect-square w-[61.8%] bg-gray-500">

            <div className="w-full h-full bg-gray-800 flex flex-col">
                {/* NAVBAR TEORICA */}
                <Navbar />

                <div className="flex flex-col flex-1 items-center justify-center p-2 gap-y-2 overflow-auto">
                    {children}
                </div>
            </div>
        </div></>
    );
}