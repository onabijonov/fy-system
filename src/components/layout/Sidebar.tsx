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
    ChevronRightIcon,
    ChevronDownIcon,
    UserPlusIcon,
    ChartBarIcon,
    PlusCircleIcon,
    ListBulletIcon
} from "@heroicons/react/24/outline"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const navigationSections = [
    {
        title: "Asosiy",
        items: [
            { name: "Dashboard", icon: HomeIcon, active: true },
            { name: "Mijozlar", icon: UsersIcon, active: false },
            {
                name: "Sotuv bo'limi",
                icon: CreditCardIcon,
                active: false,
                subItems: [
                    { name: "Lidlar", icon: UserPlusIcon },
                    { name: "Pipline", icon: ChartBarIcon }
                ]
            },
            { name: "IP Telefoniya", icon: PhoneIcon, active: false },
            {
                name: "Tadbirlar",
                icon: CalendarDaysIcon,
                active: false,
                subItems: [
                    { name: "Yangi Tadbir", icon: PlusCircleIcon },
                    { name: "Mavjud tadbirlar", icon: ListBulletIcon }
                ]
            },
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
            { name: "Hodimlar", icon: UsersIcon, active: false },
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
    const [expandedItems, setExpandedItems] = useState<string[]>(["Sotuv bo'limi"])

    const toggleExpand = (name: string) => {
        setExpandedItems(prev =>
            prev.includes(name)
                ? prev.filter(i => i !== name)
                : [...prev, name]
        )
    }

    const filteredSections = navigationSections.map(section => ({
        ...section,
        items: section.items.filter(item =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
    })).filter(section => section.items.length > 0)

    return (
        <motion.aside
            initial={false}
            animate={{ width: isCollapsed ? 80 : 340 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="h-screen bg-background flex flex-col border-r border-[#D0D0D0] overflow-hidden relative sticky top-0 flex-shrink-0 z-50 shadow-[4px_0_24px_rgba(0,0,0,0.02)]"
            style={{ padding: "40px 20px" }}
        >
            <div className="flex items-center justify-between h-8 mb-[20px] px-1">
                <AnimatePresence mode="wait">
                    {!isCollapsed ? (
                        <motion.img
                            key="logo"
                            src="/Sidebar/Logo.svg"
                            alt="Biznes Klub Logo"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="w-auto h-8"
                        />
                    ) : (
                        <div key="spacer" className="w-0 h-8" />
                    )}
                </AnimatePresence>
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-2 hover:bg-[#E7E6E4] rounded-md transition-colors group flex items-center justify-center flex-shrink-0"
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
                        className="relative mb-[20px]"
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

            <nav className="flex-1 flex flex-col gap-[12px] overflow-y-hidden hover:overflow-y-auto no-scrollbar transition-all">
                {filteredSections.map((section, index) => (
                    <motion.div key={section.title} layout className="flex flex-col gap-[12px]">
                        <div className="flex flex-col gap-[8px]">
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
                                    const isActive = activeItem === item.name || item.subItems?.some(sub => activeItem === sub.name)
                                    const hasSubItems = item.subItems && item.subItems.length > 0
                                    const isExpanded = expandedItems.includes(item.name)

                                    return (
                                        <div key={item.name} className="flex flex-col">
                                            <motion.div
                                                onClick={() => {
                                                    if (hasSubItems && !isCollapsed) {
                                                        toggleExpand(item.name)
                                                    } else {
                                                        onNavigate(item.name)
                                                    }
                                                }}
                                                layout
                                                className={`flex items-center apple-sq-12 cursor-pointer transition-all duration-200 group relative overflow-hidden ${isActive
                                                    ? "bg-white border border-[#D0D0D0] text-[#141414]"
                                                    : "text-[#999999] border border-transparent hover:bg-[#E7E6E4]/50"
                                                    } ${isCollapsed ? "w-11 h-11" : "px-4 py-2 w-full"}`}
                                                title={isCollapsed ? item.name : ""}
                                            >
                                                <div className={`flex-shrink-0 flex items-center justify-center ${isCollapsed ? "w-11 h-11" : "w-5 h-5 mr-3"}`}>
                                                    <item.icon className="w-5 h-5 transition-all" strokeWidth={isActive ? 2.5 : 2} />
                                                </div>
                                                <AnimatePresence>
                                                    {!isCollapsed && (
                                                        <motion.div
                                                            initial={{ opacity: 0, x: -5 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            exit={{ opacity: 0, x: -5 }}
                                                            className="flex-1 flex items-center justify-between"
                                                        >
                                                            <span className="text-[16px] font-normal whitespace-nowrap">
                                                                {item.name}
                                                            </span>
                                                            {hasSubItems && (
                                                                <motion.div
                                                                    animate={{ rotate: isExpanded ? 180 : 0 }}
                                                                    transition={{ duration: 0.2 }}
                                                                >
                                                                    <ChevronDownIcon className="w-4 h-4 text-[#999999]" />
                                                                </motion.div>
                                                            )}
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                                {isActive && !isCollapsed && (
                                                    <motion.div
                                                        layoutId="active-indicator"
                                                        className="absolute left-0 w-1 h-6 bg-[#141414] rounded-r-full"
                                                    />
                                                )}
                                            </motion.div>

                                            <AnimatePresence>
                                                {hasSubItems && isExpanded && !isCollapsed && (
                                                    <motion.div
                                                        initial={{ opacity: 0, height: 0 }}
                                                        animate={{ opacity: 1, height: "auto" }}
                                                        exit={{ opacity: 0, height: 0 }}
                                                        className="overflow-hidden flex flex-col mt-1"
                                                    >
                                                        {item.subItems?.map((subItem) => {
                                                            const isSubActive = activeItem === subItem.name
                                                            return (
                                                                <motion.div
                                                                    key={subItem.name}
                                                                    onClick={() => onNavigate(subItem.name)}
                                                                    className={`flex items-center pl-12 pr-4 py-2 cursor-pointer transition-all duration-200 apple-sq-10 group ${isSubActive ? "text-[#141414] font-medium" : "text-[#999999] hover:text-[#141414]"}`}
                                                                >
                                                                    <subItem.icon className={`w-4 h-4 mr-3 transition-colors ${isSubActive ? "text-[#141414]" : "text-[#999999] group-hover:text-[#141414]"}`} strokeWidth={isSubActive ? 2.5 : 2} />
                                                                    <span className="text-[15px]">{subItem.name}</span>
                                                                </motion.div>
                                                            )
                                                        })}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        {index < filteredSections.length - 1 && (
                            <div className="h-[1px] bg-[#E0E0E0] mx-4" />
                        )}
                    </motion.div>
                ))}
            </nav>

            <motion.div
                layout
                className={`mt-auto w-full transition-all duration-300 ${isCollapsed ? "bg-transparent border-none p-0 h-auto flex flex-col items-center" : "h-[60px] bg-white border border-[#D0D0D0] apple-sq-12 px-4 py-[10px] flex items-center gap-3"}`}
            >
                <motion.div
                    layout
                    className={`bg-[#141414] apple-sq-10 flex items-center justify-center flex-shrink-0 ${isCollapsed ? "w-11 h-11" : "w-10 h-10"}`}
                >
                    <UserIcon className="w-5 h-5 text-white" />
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
                    <ArrowLeftOnRectangleIcon className="ml-auto w-5 h-5 text-[#999999] cursor-pointer hover:text-[#141414] transition-colors flex-shrink-0" strokeWidth={2} />
                )}
            </motion.div>
        </motion.aside>
    )
}
