import {
    UsersIcon
} from "@heroicons/react/24/outline"

export function Mijozlar() {
    return (
        <div className="flex flex-col items-center justify-center h-full gap-4 animate-in fade-in duration-700 text-[#999999]">
            <div className="w-16 h-16 bg-[#F5F5F5] rounded-full flex items-center justify-center">
                <UsersIcon className="w-8 h-8 opacity-20" />
            </div>
            <h1 className="text-xl font-medium text-[#141414]">Mijozlar ro'yxati bo'sh</h1>
            <p className="text-sm">Hozircha tizimda hech qanday mijoz mavjud emas.</p>
        </div>
    )
}
