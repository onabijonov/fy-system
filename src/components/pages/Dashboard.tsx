import {
    Squares2X2Icon
} from "@heroicons/react/24/outline"

export function Dashboard() {
    return (
        <div className="flex flex-col items-center justify-center h-full gap-4 animate-in fade-in duration-700 text-[#999999]">
            <div className="w-16 h-16 bg-[#F5F5F5] rounded-full flex items-center justify-center">
                <Squares2X2Icon className="w-8 h-8 opacity-20" />
            </div>
            <h1 className="text-xl font-medium text-[#141414]">Dashboard bo'sh</h1>
            <p className="text-sm">Hozircha bu yerda hech qanday ma'lumot yo'q.</p>
        </div>
    )
}
