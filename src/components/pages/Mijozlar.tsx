import {
    UsersIcon,
    UserPlusIcon,
    TicketIcon,
    ArrowUpRightIcon,
    ListBulletIcon,
    Squares2X2Icon,
    FunnelIcon,
    ArrowUpTrayIcon,
    PlusIcon,
    EllipsisHorizontalIcon,
    PencilIcon,
    TrashIcon,
    ArrowDownTrayIcon
} from "@heroicons/react/24/outline"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

export function Mijozlar() {
    const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')
    const [selectedMijozlar, setSelectedMijozlar] = useState<number[]>([])

    const stats = [
        {
            title: "Jami Mijozlar soni",
            value: "1,284",
            growth: "+12.5%",
            icon: UsersIcon,
            color: "text-[#141414]",
            bg: "bg-[#F5F5F5]"
        },
        {
            title: "Yangi mijozlar (30 kun)",
            value: "156",
            growth: "+8.2%",
            icon: UserPlusIcon,
            color: "text-[#141414]",
            bg: "bg-[#F5F5F5]"
        },
        {
            title: "Joy band qilgan mijozlar",
            value: "428",
            growth: "+24.0%",
            icon: TicketIcon,
            color: "text-[#141414]",
            bg: "bg-[#F5F5F5]"
        }
    ];

    const customers = [
        { id: 1, name: "Aziz Rahimov", email: "aziz.r@gmail.com", phone: "+998 90 123 45 67", activity: "Yess! Coffee - kofeynerlar tarmog‘i asoschisi", eventsCount: 12, status: "Faol", joinDate: "12 Okt, 2023", image: "AR" },
        { id: 2, name: "Malika Shoraxmedova", email: "malika.sh@mail.ru", phone: "+998 93 456 78 90", activity: "Dizayner", eventsCount: 5, status: "Nofaol", joinDate: "15 Okt, 2023", image: "MS" },
        { id: 3, name: "Jasur Abdullaev", email: "jasur.a@outlook.com", phone: "+998 94 789 12 34", activity: "IT Mutaxassis", eventsCount: 8, status: "Faol", joinDate: "20 Okt, 2023", image: "JA" },
        { id: 4, name: "Dilnoza Karimova", email: "dili.k@gmail.com", phone: "+998 99 321 65 43", activity: "Marketolog", eventsCount: 2, status: "Nofaol", joinDate: "22 Okt, 2023", image: "DK" },
        { id: 5, name: "Otabek Mahmudov", email: "otabek.m@gmail.com", phone: "+998 90 987 65 43", activity: "Menejer", eventsCount: 15, status: "Faol", joinDate: "25 Okt, 2023", image: "OM" },
    ];

    const toggleSelectAll = () => {
        if (selectedMijozlar.length === customers.length) {
            setSelectedMijozlar([])
        } else {
            setSelectedMijozlar(customers.map(c => c.id))
        }
    }

    const toggleSelect = (id: number) => {
        if (selectedMijozlar.includes(id)) {
            setSelectedMijozlar(selectedMijozlar.filter(i => i !== id))
        } else {
            setSelectedMijozlar([...selectedMijozlar, id])
        }
    }

    const tableVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08
            }
        }
    };

    const rowVariants = {
        hidden: { opacity: 0, y: 15, scale: 0.98 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring" as const,
                bounce: 0,
                duration: 0.5
            }
        }
    };

    return (
        <div className="flex flex-col gap-6 h-full animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                        className="bg-white border border-[#F0F0F0] rounded-[8px] p-5 flex flex-col gap-4 border-b-2 hover:border-b-[#141414] transition-colors cursor-default"
                    >
                        <div className="flex items-center justify-between">
                            <div className={`w-12 h-12 ${stat.bg} rounded-[10px] flex items-center justify-center`}>
                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                            <motion.div
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.5 + (index * 0.1) }}
                                className="flex items-center gap-1.5 bg-white border border-[#141414] px-3 py-1 rounded-[6px]"
                            >
                                <ArrowUpRightIcon className="w-3.5 h-3.5 text-[#141414] stroke-[3px]" />
                                <span className="text-[13px] font-bold text-[#141414]">{stat.growth}</span>
                            </motion.div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[13px] font-medium text-[#999999]">{stat.title}</span>
                            <span className="text-[24px] font-bold text-[#141414]">{stat.value}</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Toolbar & Table Container */}
            <div className="bg-white border border-[#F0F0F0] rounded-[12px] flex flex-col overflow-hidden">
                {/* Toolbar */}
                <div className="p-4 border-b border-[#F0F0F0] flex flex-wrap items-center justify-between gap-4 bg-white relative">
                    <div className="flex items-center gap-4">
                        {/* View Switcher */}
                        <div className="bg-[#F5F5F5] p-1 rounded-[10px] flex items-center gap-1">
                            <button
                                onClick={() => setViewMode('list')}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-[6px] text-[13px] font-bold transition-all ${viewMode === 'list' ? 'bg-white text-[#141414]' : 'text-[#999999] hover:text-[#141414]'
                                    }`}
                            >
                                <ListBulletIcon className="w-4 h-4" />
                                Ro'yxat
                            </button>
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-[6px] text-[13px] font-bold transition-all ${viewMode === 'grid' ? 'bg-white text-[#141414]' : 'text-[#999999] hover:text-[#141414]'
                                    }`}
                            >
                                <Squares2X2Icon className="w-4 h-4" />
                                Setka
                            </button>
                        </div>

                        {/* Selection Actions (Floating style) */}
                        <AnimatePresence>
                            {selectedMijozlar.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="flex items-center gap-2 pl-4 border-l border-[#F0F0F0]"
                                >
                                    <span className="text-[13px] font-medium text-[#999999] mr-2">
                                        {selectedMijozlar.length} ta tanlandi
                                    </span>
                                    {selectedMijozlar.length === 1 && (
                                        <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-[#E0E0E0] text-[#141414] rounded-[8px] text-[12px] font-bold hover:bg-[#F9F9F8] transition-colors">
                                            <PencilIcon className="w-4 h-4" />
                                            Tahrirlash
                                        </button>
                                    )}
                                    <button className="flex items-center gap-2 px-3 py-1.5 bg-red-50 text-red-600 rounded-[8px] text-[12px] font-bold hover:bg-red-100 transition-colors">
                                        <TrashIcon className="w-4 h-4" />
                                        O'chirish
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E0E0E0] rounded-[10px] text-[13px] font-bold text-[#141414] hover:bg-[#F9F9F8] transition-colors">
                            <FunnelIcon className="w-4 h-4" />
                            Filtr
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E0E0E0] rounded-[10px] text-[13px] font-bold text-[#141414] hover:bg-[#F9F9F8] transition-colors">
                            <ArrowUpTrayIcon className="w-4 h-4" />
                            Eksport
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-[#141414] border border-[#141414] rounded-[10px] text-[13px] font-bold text-white hover:bg-[#222] transition-colors active:scale-95">
                            <PlusIcon className="w-4 h-4" />
                            Yangi mijoz
                        </button>
                    </div>
                </div>

                {/* View Content */}
                <div className="overflow-x-auto no-scrollbar">
                    <AnimatePresence mode="wait">
                        {viewMode === 'list' ? (
                            <motion.table
                                key="list-view"
                                className="w-full border-collapse"
                                initial="hidden"
                                animate="visible"
                                exit={{ opacity: 0, y: 10 }}
                                variants={tableVariants}
                            >
                                <thead>
                                    <tr className="bg-[#FBFBFB] border-b border-[#F0F0F0]">
                                        <th className="p-4 text-left w-12">
                                            <input
                                                type="checkbox"
                                                checked={selectedMijozlar.length === customers.length && customers.length > 0}
                                                onChange={toggleSelectAll}
                                                className="w-4 h-4 rounded border-[#D0D0D0] text-[#141414] focus:ring-0 cursor-pointer"
                                            />
                                        </th>
                                        <th className="p-4 text-[14px] font-semibold text-[#141414] text-left">Mijoz</th>
                                        <th className="p-4 text-[14px] font-semibold text-[#141414] text-left">Kontakt</th>
                                        <th className="p-4 text-[14px] font-semibold text-[#141414] text-left">Faoliyati</th>
                                        <th className="p-4 text-[14px] font-semibold text-[#141414] text-left">Tadbirlar</th>
                                        <th className="p-4 text-[14px] font-semibold text-[#141414] text-left">Statusi</th>
                                        <th className="p-4 text-[14px] font-semibold text-[#141414] text-left">A'zo bo'lgan vaqti</th>
                                        <th className="p-4 text-[14px] font-semibold text-[#141414] text-right pr-6">Amallar</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#F0F0F0]">
                                    {customers.map((customer) => (
                                        <motion.tr
                                            key={customer.id}
                                            variants={rowVariants}
                                            className={`hover:bg-[#FBFBFB] transition-colors group ${selectedMijozlar.includes(customer.id) ? 'bg-[#F9F9F8]' : ''}`}
                                        >
                                            <td className="p-4">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedMijozlar.includes(customer.id)}
                                                    onChange={() => toggleSelect(customer.id)}
                                                    className="w-4 h-4 rounded border-[#D0D0D0] text-[#141414] focus:ring-0 cursor-pointer"
                                                />
                                            </td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="relative group/avatar w-10 h-10 rounded-full bg-[#F5F5F5] border border-[#E0E0E0] flex items-center justify-center text-[13px] font-bold text-[#141414] overflow-hidden flex-shrink-0">
                                                        {customer.image}
                                                        <div
                                                            className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity cursor-pointer text-white"
                                                            title="Rasmni yuklab olish"
                                                        >
                                                            <ArrowDownTrayIcon className="w-4 h-4" />
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-[14px] font-bold text-[#141414]">{customer.name}</span>
                                                        <span className="text-[11px] text-[#999999]">{customer.email}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <span className="text-[13px] text-[#141414]">{customer.phone}</span>
                                            </td>
                                            <td className="p-4">
                                                <div className="max-w-[150px] 2xl:max-w-[200px] truncate" title={customer.activity}>
                                                    <span className="text-[13px] text-[#141414] font-medium">{customer.activity}</span>
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <span className="text-[13px] text-[#141414] font-medium">{customer.eventsCount} ta</span>
                                            </td>
                                            <td className="p-4">
                                                <span className={`inline-flex px-2.5 py-1 rounded-[6px] text-[11px] font-bold ${customer.status === 'Faol' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                                                    }`}>
                                                    {customer.status}
                                                </span>
                                            </td>
                                            <td className="p-4">
                                                <span className="text-[13px] text-[#999999]">{customer.joinDate}</span>
                                            </td>
                                            <td className="p-4 text-right pr-6">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button className="p-2 hover:bg-[#F5F5F5] hover:text-[#141414] rounded-[6px] transition-colors text-[#999999]" title="Tahrirlash">
                                                        <PencilIcon className="w-4.5 h-4.5" />
                                                    </button>
                                                    <button className="p-2 hover:bg-red-50 hover:text-red-600 rounded-[6px] transition-colors text-[#999999]" title="O'chirish">
                                                        <TrashIcon className="w-4.5 h-4.5" />
                                                    </button>
                                                    <button className="p-2 hover:bg-[#F3F2F0] rounded-[6px] transition-colors text-[#999999]">
                                                        <EllipsisHorizontalIcon className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </motion.table>
                        ) : (
                            <motion.div
                                key="grid-view"
                                initial="hidden"
                                animate="visible"
                                exit={{ opacity: 0, scale: 0.95 }}
                                variants={tableVariants}
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4"
                            >
                                {customers.map((customer) => (
                                    <motion.div
                                        key={customer.id}
                                        variants={rowVariants}
                                        className={`bg-white border border-[#F0F0F0] rounded-[10px] p-4 flex flex-col gap-4 relative group transition-all hover:border-[#141414] ${selectedMijozlar.includes(customer.id) ? 'bg-[#F9F9F8] border-[#141414]' : ''
                                            }`}
                                    >
                                        <div className="absolute top-3 left-3">
                                            <input
                                                type="checkbox"
                                                checked={selectedMijozlar.includes(customer.id)}
                                                onChange={() => toggleSelect(customer.id)}
                                                className={`w-4 h-4 rounded border-[#D0D0D0] text-[#141414] focus:ring-0 cursor-pointer ${selectedMijozlar.includes(customer.id) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                                                    } transition-opacity`}
                                            />
                                        </div>

                                        <div className="flex items-center justify-between mt-2">
                                            <div className="flex items-center gap-3">
                                                <div className="relative group/avatar w-12 h-12 rounded-full bg-[#F5F5F5] border border-[#E0E0E0] flex items-center justify-center text-[14px] font-bold text-[#141414] overflow-hidden flex-shrink-0">
                                                    {customer.image}
                                                    <div
                                                        className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity cursor-pointer text-white"
                                                        title="Rasmni yuklab olish"
                                                    >
                                                        <ArrowDownTrayIcon className="w-4 h-4" />
                                                    </div>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[15px] font-bold text-[#141414]">{customer.name}</span>
                                                    <span className="text-[12px] text-[#999999]">{customer.email}</span>
                                                </div>
                                            </div>
                                            <button className="p-2 hover:bg-[#F5F5F5] rounded-[6px] transition-colors text-[#999999]">
                                                <EllipsisHorizontalIcon className="w-5 h-5" />
                                            </button>
                                        </div>

                                        <div className="flex flex-col gap-2 pt-2 border-t border-[#F5F5F5]">
                                            <div className="flex justify-between items-center text-[13px]">
                                                <span className="text-[#999999]">Telefon</span>
                                                <span className="text-[#141414] font-medium">{customer.phone}</span>
                                            </div>
                                            <div className="flex justify-between items-center text-[13px] gap-2">
                                                <span className="text-[#999999] flex-shrink-0">Faoliyati</span>
                                                <span className="text-[#141414] font-medium truncate text-right" title={customer.activity}>{customer.activity}</span>
                                            </div>
                                            <div className="flex justify-between items-center text-[13px]">
                                                <span className="text-[#999999]">Tadbirlar</span>
                                                <span className="text-[#141414] font-medium">{customer.eventsCount} ta</span>
                                            </div>
                                            <div className="flex justify-between items-center text-[13px]">
                                                <span className="text-[#999999]">Status</span>
                                                <span className={`px-2 py-0.5 rounded-[4px] text-[11px] font-bold ${customer.status === 'Faol' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                                                    }`}>
                                                    {customer.status}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 mt-auto pt-2">
                                            <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-white border border-[#E0E0E0] rounded-[6px] text-[12px] font-bold text-[#141414] hover:bg-[#F9F9F8] transition-colors">
                                                <PencilIcon className="w-3.5 h-3.5" />
                                                Tahrirlash
                                            </button>
                                            <button className="w-10 h-9 flex items-center justify-center bg-red-50 rounded-[6px] text-red-600 hover:bg-red-100 transition-colors">
                                                <TrashIcon className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}
