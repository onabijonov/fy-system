import {
    MagnifyingGlassIcon,
    HomeIcon,
    UsersIcon,
    CreditCardIcon,
    PhoneIcon,
    CalendarDaysIcon,
    CheckCircleIcon,
    PresentationChartLineIcon,
    BellIcon,
    ArrowTrendingUpIcon,
    WalletIcon,
    Cog6ToothIcon,
    ArrowLeftOnRectangleIcon,
    UserIcon,
    ChevronLeftIcon,
    ChevronRightIcon
} from "@heroicons/react/24/outline"
import { useState } from "react"

const navigationSections = [
    {
        title: "Asosiy",
        items: [
            { name: "Dashboard", icon: HomeIcon, active: true },
            { name: "Mijozlar", icon: UsersIcon, active: false },
            { name: "Sotuv bo'limi", icon: CreditCardIcon, active: false },
            { name: "IP Telefoniya", icon: PhoneIcon, active: false },
            { name: "Tadbirlar", icon: CalendarDaysIcon, active: false },
            { name: "Vazifalar", icon: CheckCircleIcon, active: false },
            { name: "Analitika", icon: PresentationChartLineIcon, active: false },
            { name: "Bildirishnomalar", icon: BellIcon, active: false },
        ]
    },
    {
        title: "Moliya",
        items: [
            { name: "Cash Flow", icon: ArrowTrendingUpIcon, active: false },
            { name: "To'lovlar", icon: WalletIcon, active: false },
        ]
    },
    {
        title: "Boshqaruv",
        items: [
            { name: "Sozlamalar", icon: Cog6ToothIcon, active: false },
        ]
    }
]

interface SidebarProps {
    activeItem: string;
    onNavigate: (item: string) => void;
}

export function Sidebar({ activeItem, onNavigate }: SidebarProps) {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")

    const filteredSections = navigationSections.map(section => ({
        ...section,
        items: section.items.filter(item =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
    })).filter(section => section.items.length > 0)

    return (
        <aside className={`${isCollapsed ? "w-[80px]" : "w-[340px]"} h-screen bg-background p-[20px] md:p-[40px] flex flex-col gap-[30px] border-r border-[#D0D0D0] transition-all duration-300 ease-in-out ${isCollapsed ? "!p-4" : ""}`}>
            <div className="flex items-center justify-between">
                {!isCollapsed && <img src="/Sidebar/Logo.svg" alt="Biznes Klub Logo" className="w-auto h-8 animate-in fade-in duration-300" />}
                {isCollapsed && <div className="w-8 h-8 bg-[#E7E6E4] apple-sq-10 flex items-center justify-center font-bold text-[#141414]">BK</div>}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-1 hover:bg-[#E7E6E4] rounded-md transition-colors group"
                >
                    {isCollapsed ? (
                        <ChevronRightIcon className="w-5 h-5 text-[#999999] group-hover:text-[#141414]" strokeWidth={2} />
                    ) : (
                        <ChevronLeftIcon className="w-5 h-5 text-[#999999] group-hover:text-[#141414]" strokeWidth={2} />
                    )}
                </button>
            </div>

            <div className={`relative w-full h-[40px] transition-all duration-300 ${isCollapsed ? "opacity-0 invisible h-0" : "opacity-100 visible"}`}>
                <input
                    type="text"
                    placeholder="Qidirish..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-full bg-[#E7E6E4] border border-[#D0D0D0] apple-sq-10 px-5 pr-12 text-[16px] placeholder:text-[#999999] outline-none"
                />
                <MagnifyingGlassIcon className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D0D0D0]" strokeWidth={2} />
            </div>

            <nav className="flex-1 flex flex-col gap-[20px] overflow-y-auto no-scrollbar">
                {filteredSections.map((section) => (
                    <div key={section.title} className="flex flex-col gap-[11px]">
                        {!isCollapsed && (
                            <h3 className="text-[16px] font-normal text-[#999999] animate-in fade-in slide-in-from-left-1 duration-300">
                                {section.title}
                            </h3>
                        )}
                        <div className="flex flex-col gap-[1px]">
                            {section.items.map((item) => {
                                const isActive = activeItem === item.name
                                return (
                                    <div
                                        key={item.name}
                                        onClick={() => onNavigate(item.name)}
                                        className={`flex items-center gap-3 px-4 py-2 apple-sq-12 cursor-pointer transition-all duration-200 group ${isActive
                                            ? "bg-white border border-[#D0D0D0] text-[#141414]"
                                            : "text-[#999999] border border-transparent hover:bg-[#E7E6E4]/50"
                                            } ${isCollapsed ? "justify-center px-2" : ""}`}
                                        title={isCollapsed ? item.name : ""}
                                    >
                                        <item.icon className={`w-5 h-5 transition-colors ${isActive ? "text-[#141414]" : "text-[#999999] group-hover:text-[#141414]"}`} strokeWidth={2} />
                                        {!isCollapsed && (
                                            <span className="text-[16px] font-normal animate-in fade-in slide-in-from-left-2 duration-300">
                                                {item.name}
                                            </span>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            <div className={`mt-auto w-full transition-all duration-300 ${isCollapsed ? "bg-transparent border-none p-0 h-auto" : "h-[60px] bg-white border border-[#D0D0D0] apple-sq-12 px-4 py-[10px] flex items-center gap-3"}`}>
                <div className={`w-10 h-10 bg-[#141414] apple-sq-10 flex items-center justify-center flex-shrink-0 ${isCollapsed ? "mx-auto cursor-pointer hover:scale-105 transition-transform" : ""}`}>
                    <UserIcon className="w-6 h-6 text-white" />
                </div>
                {!isCollapsed && (
                    <>
                        <div className="flex-1 flex flex-col min-w-0 animate-in fade-in duration-300">
                            <span className="text-[16px] font-normal text-[#141414] leading-tight truncate">Nuriddin Mo'sojonov</span>
                            <span className="text-[12px] text-[#999999] leading-tight">Lavozim</span>
                        </div>
                        <ArrowLeftOnRectangleIcon className="w-5 h-5 text-[#999999] cursor-pointer hover:text-[#141414] transition-colors flex-shrink-0" strokeWidth={2} />
                    </>
                )}
            </div>
        </aside>
    )
}
