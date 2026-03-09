import {
    UsersIcon,
    UserPlusIcon,
    TicketIcon,
    ArrowUpRightIcon
} from "@heroicons/react/24/outline"

export function Mijozlar() {
    const stats = [
        {
            title: "Jami Mijozlar soni",
            value: "1,284",
            growth: "+12.5%",
            icon: UsersIcon,
            color: "text-blue-600",
            bg: "bg-blue-50"
        },
        {
            title: "Yangi mijozlar (30 kun)",
            value: "156",
            growth: "+8.2%",
            icon: UserPlusIcon,
            color: "text-green-600",
            bg: "bg-green-50"
        },
        {
            title: "Joy band qilgan mijozlar",
            value: "428",
            growth: "+24.0%",
            icon: TicketIcon,
            color: "text-purple-600",
            bg: "bg-purple-50"
        }
    ];

    return (
        <div className="flex flex-col gap-6 h-full animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white border border-[#F0F0F0] apple-sq-16 p-5 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center`}>
                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                            <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-full">
                                <ArrowUpRightIcon className="w-3 h-3 text-green-600" />
                                <span className="text-[11px] font-bold text-green-600">{stat.growth}</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[13px] font-medium text-[#999999]">{stat.title}</span>
                            <span className="text-[24px] font-bold text-[#141414]">{stat.value}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bo'sh holat placeholderi */}
            <div className="flex-1 border-2 border-dashed border-[#F0F0F0] rounded-[32px] flex items-center justify-center p-12 bg-[#FBFBFB]">
                <div className="text-center flex flex-col items-center gap-4 text-[#999999]">
                    <div className="w-16 h-16 bg-white border border-[#F0F0F0] rounded-2xl flex items-center justify-center shadow-sm">
                        <UsersIcon className="w-8 h-8 opacity-20" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <h3 className="font-bold text-[#141414] text-[18px]">Mijozlar ro'yxati bo'sh</h3>
                        <p className="text-[14px]">Hozircha tizimda hech qanday mijoz ma'lumoti mavjud emas.</p>
                    </div>
                    <button className="mt-4 bg-[#141414] text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-[#222] transition-colors">
                        Yangi mijoz qo'shish
                    </button>
                </div>
            </div>
        </div>
    )
}
