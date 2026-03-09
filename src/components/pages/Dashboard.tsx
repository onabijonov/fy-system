import {
    ArrowUpIcon,
    ArrowDownIcon,
    UsersIcon,
    BanknotesIcon,
    CalendarIcon,
    ChatBubbleLeftRightIcon
} from "@heroicons/react/24/outline"

export function Dashboard() {
    const stats = [
        {
            name: "Jami tushum",
            value: "148,000,000 so'm",
            change: "+12.5%",
            trend: "up",
            icon: BanknotesIcon,
            color: "text-green-600",
            bg: "bg-green-50"
        },
        {
            name: "Yangi mijozlar",
            value: "2,420 ta",
            change: "+18.2%",
            trend: "up",
            icon: UsersIcon,
            color: "text-blue-600",
            bg: "bg-blue-50"
        },
        {
            name: "Faol vazifalar",
            value: "128 ta",
            change: "-4.1%",
            trend: "down",
            icon: CalendarIcon,
            color: "text-orange-600",
            bg: "bg-orange-50"
        },
        {
            name: "Suhbatlar",
            value: "450 ta",
            change: "+2.4%",
            trend: "up",
            icon: ChatBubbleLeftRightIcon,
            color: "text-purple-600",
            bg: "bg-purple-50"
        }
    ]

    return (
        <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="flex flex-col gap-1">
                <h1 className="text-[32px] font-bold text-[#141414]">Asosiy panel</h1>
                <p className="text-[#999999]">Xush kelibsiz, biznesingizdagi bugungi holat bilan tanishing.</p>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.name} className="bg-white border border-[#D0D0D0] apple-sq-12 p-6 flex flex-col gap-4 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-center justify-between">
                            <div className={`p-3 ${stat.bg} ${stat.color} apple-sq-10`}>
                                <stat.icon className="w-6 h-6" strokeWidth={2} />
                            </div>
                            <span className={`flex items-center text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                                {stat.change}
                                {stat.trend === 'up' ? <ArrowUpIcon className="w-3 h-3 ml-1" /> : <ArrowDownIcon className="w-3 h-3 ml-1" />}
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm text-[#999999]">{stat.name}</span>
                            <span className="text-2xl font-bold text-[#141414]">{stat.value}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Section Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white border border-[#D0D0D0] apple-sq-12 p-8 flex flex-col gap-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-[#141414]">Tushum statistikasi</h2>
                        <select className="bg-[#F5F5F5] border-none text-sm apple-sq-10 px-4 py-2 outline-none">
                            <option>Oxirgi 7 kun</option>
                            <option>Oxirgi 30 kun</option>
                        </select>
                    </div>
                    {/* Visual Mock-up of a Chart */}
                    <div className="h-[250px] w-full flex items-end justify-between gap-2 pt-4">
                        {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                                <div
                                    className="w-full bg-[#141414] apple-sq-10 opacity-80 group-hover:opacity-100 transition-all duration-500"
                                    style={{ height: `${h}%` }}
                                />
                                <span className="text-[10px] text-[#999999]">Du-Yak[i]</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-[#141414] apple-sq-12 p-8 flex flex-col gap-6 text-white relative overflow-hidden">
                    <div className="relative z-10 flex flex-col h-full justify-between">
                        <div className="flex flex-col gap-4">
                            <h2 className="text-xl font-bold">Maqsad sari qadam</h2>
                            <p className="text-white/60 text-sm">Oylik reja bo'yicha kutilayotgan natijaning 75% i bajarildi.</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between text-sm">
                                <span>Progress</span>
                                <span>75%</span>
                            </div>
                            <div className="w-full h-2 bg-white/20 apple-sq-10 overflow-hidden">
                                <div className="h-full bg-white w-3/4 rounded-full" />
                            </div>
                        </div>
                        <button className="w-full bg-white text-[#141414] apple-sq-10 py-3 font-bold text-sm hover:bg-gray-200 transition-colors">
                            Batafsil ma'lumot
                        </button>
                    </div>
                    {/* Abstract background blobs for premium feel */}
                    <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 blur-[80px]" />
                    <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-white/5 blur-[80px]" />
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white border border-[#D0D0D0] apple-sq-12 overflow-hidden">
                <div className="p-6 border-b border-[#F5F5F5] flex items-center justify-between">
                    <h2 className="text-xl font-bold text-[#141414]">Oxirgi faolliklar</h2>
                    <button className="text-sm text-[#999999] hover:text-[#141414] transition-colors">Barchasi</button>
                </div>
                <div className="flex flex-col">
                    {[
                        { user: "Ali Valiev", action: "yangi mijoz qo'shdi", time: "2 daqiqa oldin" },
                        { user: "Omina Karimova", action: "vazifani yakunladi", time: "1 soat oldin" },
                        { user: "Nuriddin Mo'sojonov", action: "hisobotni yukladi", time: "3 soat oldin" },
                    ].map((item, i) => (
                        <div key={i} className="px-6 py-4 flex items-center justify-between border-b border-[#F5F5F5] last:border-0 hover:bg-[#F9F9F9] transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#141414] flex items-center justify-center text-xs text-white font-medium">
                                    {item.user.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-[#141414]">{item.user}</span>
                                    <span className="text-xs text-[#999999]">{item.action}</span>
                                </div>
                            </div>
                            <span className="text-xs text-[#999999]">{item.time}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
