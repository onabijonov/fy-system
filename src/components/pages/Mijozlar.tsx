import {
    UsersIcon
} from "@heroicons/react/24/outline"

export function Mijozlar() {
    return (
        <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Bo'sh holat placeholderi */}
            <div className="flex-1 border-2 border-dashed border-[#F0F0F0] rounded-[32px] flex items-center justify-center p-12 bg-[#FBFBFB]">
                <div className="text-center flex flex-col items-center gap-4">
                    <div className="w-16 h-16 bg-white border border-[#F0F0F0] rounded-2xl flex items-center justify-center shadow-sm">
                        <UsersIcon className="w-8 h-8 text-[#999999]" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <h3 className="font-bold text-[#141414] text-[18px]">Mijozlar ro'yxati bo'sh</h3>
                        <p className="text-[14px] text-[#999999]">Hozircha tizimda hech qanday mijoz ma'lumoti mavjud emas.</p>
                    </div>
                    <button className="mt-4 bg-[#141414] text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-[#222] transition-colors">
                        Yangi mijoz qo'shish
                    </button>
                </div>
            </div>
        </div>
    )
}
