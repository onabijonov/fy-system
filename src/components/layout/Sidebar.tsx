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
import { motion, AnimatePresence } from "framer-motion"

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
        <motion.aside
            initial={false}
            animate={{
                width: isCollapsed ? 80 : 340,
                padding: isCollapsed ? "16px" : "40px 20px"
            }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            className="h-screen bg-background flex flex-col gap-[30px] border-r border-[#D0D0D0] overflow-hidden relative"
        >
            <div className={`flex items-center ${isCollapsed ? "justify-center" : "justify-between"} mb-2`}>
                <AnimatePresence mode="wait">
                    {!isCollapsed && (
                        <motion.img
                            key="logo"
                            src="/Sidebar/Logo.svg"
                            alt="Biznes Klub Logo"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="w-auto h-8"
                        />
                    )}
                </AnimatePresence>
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className={`p-2 hover:bg-[#E7E6E4] rounded-md transition-colors group ${isCollapsed ? "w-10 h-10 flex items-center justify-center" : ""}`}
                >
                    {isCollapsed ? (
                        <ChevronRightIcon className="w-5 h-5 text-[#999999] group-hover:text-[#141414]" strokeWidth={2} />
                    ) : (
                        <ChevronLeftIcon className="w-5 h-5 text-[#999999] group-hover:text-[#141414]" strokeWidth={2} />
                    )}
                </button>
            </div>

            <AnimatePresence>
                {!isCollapsed && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="relative"
                    >
                        <input
                            type="text"
                            placeholder="Qidiruv..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-[52px] bg-white border border-[#D0D0D0] apple-sq-12 pl-4 pr-12 text-[16px] outline-none focus:border-[#141414] transition-colors"
                        />
                        <MagnifyingGlassIcon className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D0D0D0]" strokeWidth={2} />
                    </motion.div>
                )}
            </AnimatePresence>

            <nav className="flex-1 flex flex-col gap-[20px] overflow-y-hidden hover:overflow-y-auto no-scrollbar transition-all">
                {filteredSections.map((section) => (
                    <div key={section.title} className="flex flex-col gap-[11px]">
                        <AnimatePresence>
                            {!isCollapsed && (
                                <motion.h3
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    className="text-[12px] font-medium text-[#999999] uppercase tracking-wider px-4"
                                >
                                    {section.title}
                                </motion.h3>
                            )}
                        </AnimatePresence>
                        <div className="flex flex-col gap-1">
                            {section.items.map((item) => {
                                const isActive = activeItem === item.name
                                return (
                                    <motion.div
                                        key={item.name}
                                        onClick={() => onNavigate(item.name)}
                                        layout
                                        className={`flex items-center gap-3 apple-sq-12 cursor-pointer transition-all duration-200 group relative ${isActive
                                            ? "bg-white border border-[#D0D0D0] text-[#141414]"
                                            : "text-[#999999] border border-transparent hover:bg-[#E7E6E4]/50"
                                            } ${isCollapsed ? "justify-center p-2 h-11 w-11 mx-auto" : "px-4 py-2"}`}
                                        title={isCollapsed ? item.name : ""}
                                    >
                                        <item.icon className={`transition-all ${isCollapsed ? "w-5 h-5" : "w-5 h-5"} ${isActive ? "text-[#141414]" : "text-[#999999] group-hover:text-[#141414]"}`} strokeWidth={isActive ? 2.5 : 2} />
                                        <AnimatePresence>
                                            {!isCollapsed && (
                                                <motion.span
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -10 }}
                                                    className="text-[16px] font-normal whitespace-nowrap"
                                                >
                                                    {item.name}
                                                </motion.span>
                                            )}
                                        </AnimatePresence>
                                        {isActive && !isCollapsed && (
                                            <motion.div
                                                layoutId="active-indicator"
                                                className="absolute left-0 w-1 h-6 bg-[#141414] rounded-r-full"
                                            />
                                        )}
                                    </motion.div>
                                )
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            <motion.div
                layout
                className={`mt-auto w-full transition-all duration-300 ${isCollapsed ? "bg-transparent border-none p-0 h-auto flex flex-col items-center" : "h-[60px] bg-white border border-[#D0D0D0] apple-sq-12 px-4 py-[10px] flex items-center gap-3"}`}
            >
                <motion.div
                    layout
                    className={`bg-[#141414] apple-sq-10 flex items-center justify-center flex-shrink-0 ${isCollapsed ? "w-11 h-11 cursor-pointer hover:scale-105 transition-transform" : "w-10 h-10"}`}
                >
                    <UserIcon className={`${isCollapsed ? "w-5 h-5" : "w-6 h-6"} text-white`} />
                </motion.div>
                <AnimatePresence>
                    {!isCollapsed && (
                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="flex flex-col gap-0 min-w-0"
                        >
                            <span className="text-[16px] font-semibold text-[#141414] truncate leading-tight">Ali Valiev</span>
                            <span className="text-[14px] text-[#999999] truncate leading-tight">Administrator</span>
                        </motion.div>
                    )}
                </AnimatePresence>
                {!isCollapsed && (
                    <ArrowLeftOnRectangleIcon className="w-5 h-5 text-[#999999] cursor-pointer hover:text-[#141414] transition-colors flex-shrink-0" strokeWidth={2} />
                )}
            </motion.div>
        </motion.aside>
    )
}
