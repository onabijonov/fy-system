import {
    UsersIcon,
    UserPlusIcon,
    TicketIcon,
    ArrowUpRightIcon,
    FunnelIcon,
    ArrowUpTrayIcon,
    PlusIcon,
    PencilIcon,
    TrashIcon,
    ArrowDownTrayIcon,
    EyeIcon,
    XMarkIcon,
    EnvelopeIcon,
    PhoneIcon,
    BriefcaseIcon,
    CalendarIcon,
    BanknotesIcon,
    PhotoIcon,
    CameraIcon
} from "@heroicons/react/24/solid"
import { StarIcon as StarSolidIcon } from "@heroicons/react/24/solid"
import { StarIcon as StarOutlineIcon } from "@heroicons/react/24/outline"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useMemo, useEffect, useCallback } from "react"
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getSortedRowModel,
    getFilteredRowModel,
    type SortingState,
} from '@tanstack/react-table'

interface EventHistory {
    id: number;
    eventName: string;
    date: string;
    status: string;
}

interface Customer {
    id: string;
    name: string;
    email: string;
    phone: string;
    activity: string;
    eventsCount: number;
    status: string;
    joinDate: string;
    image: string;
    totalSpent: string;
    history: EventHistory[];
    industry: string;
}

export function Mijozlar() {
    const [selectedMijozlar, setSelectedMijozlar] = useState<string[]>([])
    const [sorting, setSorting] = useState<SortingState>([])
    const [globalFilter, setGlobalFilter] = useState('')
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
    const [showFullHistory, setShowFullHistory] = useState(false)
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [customerToDelete, setCustomerToDelete] = useState<Customer | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Data State
    const [customers, setCustomers] = useState<Customer[]>([]);

    const fetchCustomers = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)
            const { getClients } = await import("@/lib/supabase/queries/clients")
            const rows = await getClients()
            setCustomers(rows.map(row => ({
                id: row.id,
                name: row.full_name,
                email: row.email ?? '',
                phone: row.phone ?? '',
                activity: row.activity ?? '',
                industry: row.industry ?? '',
                eventsCount: row.events_count,
                status: row.status,
                joinDate: row.join_date ?? '',
                image: row.image ?? '',
                totalSpent: `${Number(row.total_spent).toLocaleString("uz-UZ")} UZS`,
                history: [],
            })))
        } catch (err) {
            setError(err instanceof Error ? err.message : "Ma'lumotlarni yuklashda xatolik")
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchCustomers()
    }, [fetchCustomers]);

    // New Customer Form State
    const [newCustomer, setNewCustomer] = useState({
        name: '',
        activity: '',
        industry: '',
        phone: '+998 ',
        email: '',
        joinDate: new Date().toISOString().split('T')[0],
        image: ''
    });

    useEffect(() => {
        setShowFullHistory(false)
    }, [selectedCustomer])

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        
        // Always start with +998
        if (!value.startsWith('+998 ')) {
            value = '+998 ' + value.replace(/^\+998\s*/, '');
        }

        // Get only the numeric part after +998
        const digits = value.slice(5).replace(/\D/g, '').slice(0, 9);
        
        // Format: +998 90 123 45 67
        let formatted = '+998 ';
        if (digits.length > 0) {
            formatted += digits.substring(0, 2);
            if (digits.length > 2) {
                formatted += ' ' + digits.substring(2, 5);
                if (digits.length > 5) {
                    formatted += ' ' + digits.substring(5, 7);
                    if (digits.length > 7) {
                        formatted += ' ' + digits.substring(7, 9);
                    }
                }
            }
        }
        
        setNewCustomer(prev => ({ ...prev, phone: formatted }));
    };

    const stats = [
        {
            title: "Jami Mijozlar soni",
            value: customers.length.toString(),
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

    const columnHelper = createColumnHelper<Customer>()

    const columns = [
        columnHelper.display({
            id: 'select',
            header: ({ table }) => (
                <input
                    type="checkbox"
                    checked={table.getIsAllPageRowsSelected()}
                    onChange={table.getToggleAllPageRowsSelectedHandler()}
                    className="w-4 h-4 rounded-[4px] border-[#D0D0D0] text-[#141414] focus:ring-0 cursor-pointer"
                />
            ),
            cell: ({ row }) => (
                <input
                    type="checkbox"
                    checked={row.getIsSelected()}
                    onChange={row.getToggleSelectedHandler()}
                    onClick={(e) => e.stopPropagation()}
                    className="w-4 h-4 rounded-[4px] border-[#D0D0D0] text-[#141414] focus:ring-0 cursor-pointer"
                />
            ),
        }),
        columnHelper.accessor('name', {
            header: 'Mijoz',
            cell: info => (
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-[6px] bg-[#F5F5F5] border border-[#E0E0E0] overflow-hidden flex-shrink-0">
                        {info.row.original.image ? (
                            <img src={info.row.original.image} alt="" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-[#F0F0F0] text-[#999999]">
                                <UsersIcon className="w-5 h-5" />
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[14px] font-bold text-[#141414]">{info.getValue()}</span>
                        <span className="text-[11px] text-[#999999] font-medium">{info.row.original.email || 'Email kiritilmagan'}</span>
                    </div>
                </div>
            ),
        }),
        columnHelper.accessor('phone', {
            header: 'Kontakt',
            cell: info => <span className="text-[13px] text-[#141414] font-medium">{info.getValue()}</span>,
        }),
        columnHelper.accessor('activity', {
            header: 'Faoliyati',
            cell: info => <div className="text-[13px] text-[#141414] font-medium leading-tight line-clamp-1">{info.getValue()}</div>,
        }),
        columnHelper.accessor('status', {
            header: 'Statusi',
            cell: info => (
                <span className={`inline-flex px-2 py-0.5 rounded-[4px] text-[11px] font-bold ${info.getValue() === 'Faol' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                    {info.getValue()}
                </span>
            ),
        }),
        columnHelper.display({
            id: 'actions',
            header: () => <div className="text-right pr-6">Amallar</div>,
            cell: (info) => (
                <div className="flex items-center justify-end gap-1 pr-2">
                    <button 
                        className="p-1.5 hover:bg-[#F3F2F0] rounded-[6px] transition-colors text-[#999999] hover:text-[#141414]" 
                        title="Ko'rish"
                        onClick={(e) => {
                            e.stopPropagation()
                            setSelectedCustomer(info.row.original)
                        }}
                    >
                        <EyeIcon className="w-5 h-5" />
                    </button>
                    <button 
                        className="p-1.5 hover:bg-red-50 rounded-[6px] transition-colors text-[#999999] hover:text-red-600" 
                        title="O'chirish" 
                        onClick={(e) => {
                            e.stopPropagation();
                            setCustomerToDelete(info.row.original);
                        }}
                    >
                        <TrashIcon className="w-4.5 h-4.5" />
                    </button>
                </div>
            ),
        }),
    ]

    const table = useReactTable({
        data: customers,
        columns,
        state: {
            sorting,
            globalFilter,
            rowSelection: selectedMijozlar.reduce((acc, id) => {
                const idx = customers.findIndex(c => c.id === id);
                if (idx !== -1) acc[idx] = true;
                return acc;
            }, {} as Record<string, boolean>),
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange: (updater) => {
            const newSelection = typeof updater === 'function' ? updater(table.getState().rowSelection) : updater;
            const selectedIds = Object.keys(newSelection)
                .filter(key => newSelection[Number(key)])
                .map(key => customers[Number(key)].id);
            setSelectedMijozlar(selectedIds);
        },
    })

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNewCustomer(prev => ({ ...prev, image: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddCustomer = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { createClient } = await import("@/lib/supabase/queries/clients")
            const row = await createClient({
                full_name: newCustomer.name,
                email: newCustomer.email || null,
                phone: newCustomer.phone || null,
                activity: newCustomer.activity || null,
                industry: newCustomer.industry || null,
                image: newCustomer.image || null,
                join_date: newCustomer.joinDate,
                status: 'Faol',
            })
            const newEntry: Customer = {
                id: row.id,
                name: row.full_name,
                email: row.email ?? '',
                phone: row.phone ?? '',
                activity: row.activity ?? '',
                industry: row.industry ?? '',
                eventsCount: row.events_count,
                status: row.status,
                joinDate: row.join_date ?? '',
                image: row.image || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=256&h=256&fit=crop',
                totalSpent: '0 UZS',
                history: [],
            }
            setCustomers(prev => [newEntry, ...prev]);
            setIsAddModalOpen(false);
            setNewCustomer({
                name: '',
                activity: '',
                industry: '',
                phone: '+998 ',
                email: '',
                joinDate: new Date().toISOString().split('T')[0],
                image: ''
            });
        } catch (err) {
            console.error('Mijoz qo\'shishda xatolik:', err)
        }
    };

    const rating = selectedCustomer ? Math.min(5, Math.ceil(selectedCustomer.eventsCount / 4)) : 0;

    return (
        <div className="flex flex-col gap-6 h-full animate-in fade-in slide-in-from-bottom-4 duration-700 relative">
            {loading && (
                <div className="flex items-center justify-center py-20">
                    <div className="w-6 h-6 border-2 border-[#141414] border-t-transparent rounded-full animate-spin" />
                </div>
            )}
            {error && !loading && (
                <div className="flex flex-col items-center justify-center py-20 gap-2">
                    <span className="text-[14px] text-red-500 font-medium">{error}</span>
                    <button onClick={fetchCustomers} className="text-[13px] text-[#141414] font-bold underline">Qayta urinish</button>
                </div>
            )}
            {!loading && !error && <>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white border border-[#F0F0F0] rounded-[8px] p-5 flex flex-col gap-3 transition-all">
                        <div className="flex items-center justify-between">
                            <span className="text-[13px] font-medium text-[#999999]">{stat.title}</span>
                            <div className="flex items-center gap-1 text-green-600 text-[12px] font-bold">
                                <ArrowUpRightIcon className="w-3 h-3" />
                                {stat.growth}
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                             <div className={`w-10 h-10 ${stat.bg} rounded-[6px] flex items-center justify-center`}>
                                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                            </div>
                            <span className="text-[24px] font-bold text-[#141414]">{stat.value}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Table Area */}
            <div className="bg-white border border-[#F0F0F0] rounded-[8px] flex flex-col overflow-hidden shadow-xs">
                {/* Search & Actions */}
                <div className="p-4 border-b border-[#F0F0F0] flex items-center justify-between bg-white">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <input 
                                type="text" 
                                value={globalFilter ?? ''}
                                onChange={e => setGlobalFilter(e.target.value)}
                                placeholder="Ism, telefon yoki faoliyat bo'yicha qidirish..." 
                                className="pl-9 pr-4 py-2 bg-[#F5F5F5] border-transparent focus:bg-white focus:border-[#141414]/10 rounded-[8px] text-[13px] w-80 transition-all outline-hidden font-medium"
                            />
                            <UsersIcon className="w-4 h-4 text-[#999999] absolute left-3 top-1/2 -translate-y-1/2" />
                        </div>
                        {selectedMijozlar.length > 0 && (
                            <div className="flex items-center gap-2 pl-4 border-l border-[#F0F0F0]">
                                <span className="text-[13px] font-bold text-[#141414]">{selectedMijozlar.length} ta tanlandi</span>
                                <button
                                    onClick={async () => {
                                        try {
                                            const { deleteClients } = await import("@/lib/supabase/queries/clients")
                                            await deleteClients(selectedMijozlar)
                                            setCustomers(prev => prev.filter(c => !selectedMijozlar.includes(c.id)));
                                            setSelectedMijozlar([]);
                                        } catch (err) {
                                            console.error("O'chirishda xatolik:", err)
                                        }
                                    }}
                                    className="p-1.5 hover:bg-red-50 text-red-600 rounded-[6px] transition-colors"
                                >
                                    <TrashIcon className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 px-3 py-2 hover:bg-[#F5F5F5] rounded-[8px] text-[13px] font-bold text-[#141414] transition-colors">
                            <FunnelIcon className="w-4 h-4" />
                            Filtrlar
                        </button>
                        <button className="flex items-center gap-2 px-3 py-2 hover:bg-[#F5F5F5] rounded-[8px] text-[13px] font-bold text-[#141414] transition-colors">
                            <ArrowUpTrayIcon className="w-4 h-4" />
                            Eksport
                        </button>
                        <button 
                            onClick={() => setIsAddModalOpen(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-[#141414] text-white rounded-[8px] text-[13px] font-bold hover:bg-black transition-all active:scale-95"
                        >
                            <PlusIcon className="w-4 h-4" />
                            Yangi mijoz
                        </button>
                    </div>
                </div>

                {/* Table Data */}
                <div className="overflow-x-auto no-scrollbar">
                    <table className="w-full border-collapse">
                        <thead>
                            {table.getHeaderGroups().map(headerGroup => (
                                <tr key={headerGroup.id} className="bg-[#FBFBFB] border-b border-[#F0F0F0]">
                                    {headerGroup.headers.map(header => (
                                        <th key={header.id} className="p-4 text-[13px] font-bold text-[#999999] text-left uppercase tracking-tight">
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody className="divide-y divide-[#F0F0F0]">
                            {table.getRowModel().rows.length > 0 ? (
                                table.getRowModel().rows.map(row => (
                                    <tr
                                        key={row.id}
                                        onClick={() => setSelectedCustomer(row.original)}
                                        className={`hover:bg-[#FBFBFB] transition-colors group cursor-pointer ${row.getIsSelected() ? 'bg-[#F9F9F8]' : ''}`}
                                    >
                                        {row.getVisibleCells().map(cell => (
                                            <td key={cell.id} className="p-4">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={columns.length} className="p-12 text-center text-[#999999] text-[14px]">
                                        Ma'lumot topilmadi
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Sidebar Overlay */}
            <AnimatePresence>
                {selectedCustomer && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedCustomer(null)}
                        className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-40"
                    />
                )}
            </AnimatePresence>

            {/* Details Sidebar */}
            <AnimatePresence>
                {selectedCustomer && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className="fixed top-0 right-0 w-[480px] h-full bg-white z-50 flex flex-col border-l border-[#E0E0E0] shadow-sm"
                    >
                        <div className="flex items-center justify-between px-6 py-4 border-b border-[#F0F0F0] bg-white sticky top-0 z-10">
                            <h2 className="text-[16px] font-bold text-[#141414]">Mijoz profili</h2>
                            <div className="flex items-center gap-2">
                                <button className="p-2 hover:bg-[#F5F5F5] rounded-[8px] transition-colors text-[#999999] hover:text-[#141414]">
                                    <PencilIcon className="w-5 h-5" />
                                </button>
                                <button 
                                    onClick={() => setSelectedCustomer(null)}
                                    className="p-2 hover:bg-[#F5F5F5] rounded-[8px] transition-colors text-[#999999]"
                                >
                                    <XMarkIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto no-scrollbar">
                            <div className="relative h-64 w-full group">
                                <img src={selectedCustomer.image} alt="" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all" />
                                <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between">
                                    <div className="flex gap-2">
                                        <button className="px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-[6px] text-white text-[12px] font-bold hover:bg-white/20 transition-all flex items-center gap-1.5">
                                            <PhotoIcon className="w-3.5 h-3.5" />
                                            Update
                                        </button>
                                        <button className="px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-[6px] text-white text-[12px] font-bold hover:bg-white/20 transition-all flex items-center gap-1.5">
                                            <ArrowDownTrayIcon className="w-3.5 h-3.5" />
                                            Save
                                        </button>
                                    </div>
                                    <span className={`px-2.5 py-1 rounded-[4px] text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border ${selectedCustomer.status === 'Faol' ? 'bg-green-500/20 text-green-100 border-green-500/30' : 'bg-red-500/20 text-red-100 border-red-500/30'}`}>
                                        {selectedCustomer.status}
                                    </span>
                                </div>
                            </div>

                            <div className="p-8 flex flex-col gap-8 text-left">
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center justify-between group">
                                        <h1 className="text-[28px] font-bold text-[#141414] leading-tight">{selectedCustomer.name}</h1>
                                        <PencilIcon className="w-4 h-4 text-[#999999] opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity" />
                                    </div>
                                    <div className="flex items-center gap-2 mt-2 group">
                                        <BriefcaseIcon className="w-4 h-4 text-[#999999]" />
                                        <span className="text-[15px] font-medium text-[#141414]">{selectedCustomer.activity}</span>
                                        <PencilIcon className="w-3.5 h-3.5 text-[#999999] opacity-0 group-hover:opacity-100 cursor-pointer" />
                                    </div>
                                    <div className="inline-flex mt-2">
                                        <span className="bg-[#F5F5F5] text-[#777777] text-[12px] font-bold px-2 py-0.5 rounded-[4px]">
                                            Soha: {selectedCustomer.industry}
                                        </span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-[#FBFBFB] border border-[#F0F0F0] rounded-[8px] group">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-[11px] font-bold text-[#999999] uppercase">Telefon</span>
                                            <PencilIcon className="w-3 h-3 text-[#999999] opacity-0 group-hover:opacity-100 cursor-pointer" />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <PhoneIcon className="w-3.5 h-3.5 text-[#141414]" />
                                            <span className="text-[14px] font-bold text-[#141414]">{selectedCustomer.phone}</span>
                                        </div>
                                    </div>
                                    <div className="p-4 bg-[#FBFBFB] border border-[#F0F0F0] rounded-[8px] group">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-[11px] font-bold text-[#999999] uppercase">Email</span>
                                            <PencilIcon className="w-3 h-3 text-[#999999] opacity-0 group-hover:opacity-100 cursor-pointer" />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <EnvelopeIcon className="w-3.5 h-3.5 text-[#141414]" />
                                            <span className="text-[13px] font-bold text-[#141414] truncate">{selectedCustomer.email || '-'}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 border border-[#F0F0F0] rounded-[8px]">
                                        <div className="flex flex-col gap-0.5">
                                            <span className="text-[11px] font-bold text-[#999999] uppercase">Aktivlik</span>
                                            <div className="flex gap-1 mt-1">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <span key={star}>
                                                        {star <= rating ? (
                                                            <StarSolidIcon className="w-4 h-4 text-orange-400" />
                                                        ) : (
                                                            <StarOutlineIcon className="w-4 h-4 text-[#E0E0E0]" />
                                                        )}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-[11px] font-bold text-[#999999] uppercase">Tadbirlar</span>
                                            <div className="text-[18px] font-bold text-[#141414]">{selectedCustomer.eventsCount} ta</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-[14px] font-bold text-[#141414]">Tadbirlar tarixi</h3>
                                        <button 
                                            onClick={() => setShowFullHistory(!showFullHistory)}
                                            className="text-[12px] font-bold text-[#999999] hover:text-[#141414] transition-colors"
                                        >
                                            {showFullHistory ? 'Hide' : 'Show All'}
                                        </button>
                                    </div>
                                    
                                    {selectedCustomer.history.length > 0 ? (
                                        <div className="border-l-2 border-[#F0F0F0] ml-2 space-y-6">
                                            {(showFullHistory ? selectedCustomer.history : selectedCustomer.history.slice(0, 3)).map((event) => (
                                                <div key={event.id} className="relative pl-6">
                                                    <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-[#141414] border-2 border-white" />
                                                    <div className="flex flex-col">
                                                        <span className="text-[14px] font-bold text-[#141414]">{event.eventName}</span>
                                                        <div className="flex items-center gap-3 mt-1 text-[12px] text-[#999999] font-medium">
                                                            <span className="flex items-center gap-1">
                                                                <CalendarIcon className="w-3.5 h-3.5" />
                                                                {event.date}
                                                            </span>
                                                            <span className="px-1.5 py-0.5 bg-green-50 text-green-600 rounded-[4px] text-[10px] font-bold">
                                                                {event.status}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-[13px] text-[#999999] italic">Tarix mavjud emas</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-auto border-t border-[#F0F0F0] bg-[#FBFBFB] p-6 grid grid-cols-2 gap-6">
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-bold text-[#999999] uppercase">Klubga qo'shilgan</span>
                                <div className="flex items-center gap-2">
                                    <CalendarIcon className="w-4 h-4 text-[#141414]" />
                                    <span className="text-[14px] font-bold text-[#141414]">{selectedCustomer.joinDate}</span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-1 text-right">
                                <span className="text-[10px] font-bold text-[#999999] uppercase">Jami xarajat</span>
                                <div className="flex items-center justify-end gap-2">
                                    <BanknotesIcon className="w-4 h-4 text-green-600" />
                                    <span className="text-[16px] font-bold text-green-600">{selectedCustomer.totalSpent}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Add Customer Modal */}
            <AnimatePresence>
                {isAddModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsAddModalOpen(false)}
                            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="bg-white rounded-[12px] shadow-2xl w-full max-w-xl relative overflow-hidden flex flex-col"
                        >
                            <div className="p-6 border-b border-[#F0F0F0] flex items-center justify-between bg-white">
                                <h3 className="text-[18px] font-bold text-[#141414]">Yangi mijoz qo'shish</h3>
                                <button 
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="p-1 hover:bg-[#F5F5F5] rounded-full transition-all"
                                >
                                    <XMarkIcon className="w-6 h-6 text-[#999999]" />
                                </button>
                            </div>

                            <form onSubmit={handleAddCustomer} className="p-6 overflow-y-auto max-h-[80vh] no-scrollbar">
                                <div className="grid grid-cols-1 gap-6">
                                    {/* Image Upload */}
                                    <div className="flex flex-col items-center gap-4">
                                        <div 
                                            onClick={() => document.getElementById('image-upload')?.click()}
                                            className="w-28 h-28 rounded-[12px] border-2 border-dashed border-[#E0E0E0] bg-[#F9F9F9] flex flex-col items-center justify-center text-[#999999] relative overflow-hidden group hover:border-[#141414] hover:bg-white transition-all cursor-pointer"
                                        >
                                            {newCustomer.image ? (
                                                <>
                                                    <img src={newCustomer.image} alt="" className="w-full h-full object-cover" />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                                        <CameraIcon className="w-6 h-6 text-white" />
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="flex flex-col items-center gap-1">
                                                    <CameraIcon className="w-8 h-8 opacity-30" />
                                                    <span className="text-[11px] font-bold">RASM YUKLASH</span>
                                                </div>
                                            )}
                                        </div>
                                        <input 
                                            id="image-upload"
                                            type="file" 
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="hidden"
                                        />
                                        <p className="text-[11px] text-[#999999] font-medium text-center">
                                            Tavsiya etiladi: Kvadrat rasm, max 2MB
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-[12px] font-bold text-[#141414]">ISM FAMILYASI *</label>
                                            <input 
                                                required
                                                type="text" 
                                                value={newCustomer.name}
                                                onChange={e => setNewCustomer({...newCustomer, name: e.target.value})}
                                                placeholder="Masalan: Aziz Rahimov" 
                                                className="w-full px-4 py-2 bg-[#F5F5F5] border-transparent rounded-[8px] text-[13px] outline-hidden focus:bg-white focus:ring-1 focus:ring-[#141414]/10"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-[12px] font-bold text-[#141414]">SOHA *</label>
                                            <input 
                                                required
                                                type="text" 
                                                value={newCustomer.industry}
                                                onChange={e => setNewCustomer({...newCustomer, industry: e.target.value})}
                                                placeholder="Masalan: IT, Marketing" 
                                                className="w-full px-4 py-2 bg-[#F5F5F5] border-transparent rounded-[8px] text-[13px] outline-hidden focus:bg-white focus:ring-1 focus:ring-[#141414]/10"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[12px] font-bold text-[#141414]">BIZNES FAOLIYATI *</label>
                                        <textarea 
                                            required
                                            rows={2}
                                            value={newCustomer.activity}
                                            onChange={e => setNewCustomer({...newCustomer, activity: e.target.value})}
                                            placeholder="Kompaniya nomi yoki loyiha haqida..." 
                                            className="w-full px-4 py-2 bg-[#F5F5F5] border-transparent rounded-[8px] text-[13px] outline-hidden focus:bg-white focus:ring-1 focus:ring-[#141414]/10 resize-none"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-[12px] font-bold text-[#141414]">TELEFON RAQAMI *</label>
                                            <input 
                                                required
                                                type="text" 
                                                value={newCustomer.phone}
                                                onChange={handlePhoneChange}
                                                placeholder="+998 90 123 45 67" 
                                                className="w-full px-4 py-2 bg-[#F5F5F5] border-transparent rounded-[8px] text-[13px] outline-hidden focus:bg-white focus:ring-1 focus:ring-[#141414]/10 transition-all font-bold tracking-wide"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1.5">
                                            <label className="text-[12px] font-bold text-[#141414]">EMAIL (IXTIYORIY)</label>
                                            <input 
                                                type="email" 
                                                value={newCustomer.email}
                                                onChange={e => setNewCustomer({...newCustomer, email: e.target.value})}
                                                placeholder="example@mail.uz" 
                                                className="w-full px-4 py-2 bg-[#F5F5F5] border-transparent rounded-[8px] text-[13px] outline-hidden focus:bg-white focus:ring-1 focus:ring-[#141414]/10"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[12px] font-bold text-[#141414]">KLUBGA QO'SHILGAN VAQT</label>
                                        <input 
                                            type="date" 
                                            value={newCustomer.joinDate}
                                            onChange={e => setNewCustomer({...newCustomer, joinDate: e.target.value})}
                                            className="w-full px-4 py-2 bg-[#F5F5F5] border-transparent rounded-[8px] text-[13px] outline-hidden focus:bg-white focus:ring-1 focus:ring-[#141414]/10"
                                        />
                                    </div>
                                </div>

                                <div className="mt-8 flex gap-3">
                                    <button 
                                        type="button"
                                        onClick={() => setIsAddModalOpen(false)}
                                        className="flex-1 px-4 py-2.5 bg-[#F5F5F5] text-[#141414] rounded-[8px] text-[13px] font-bold hover:bg-[#EAEAEA] transition-all"
                                    >
                                        Bekor qilish
                                    </button>
                                    <button 
                                        type="submit"
                                        className="flex-1 px-4 py-2.5 bg-[#141414] text-white rounded-[8px] text-[13px] font-bold hover:bg-black transition-all shadow-md active:scale-95"
                                    >
                                        Saqlash
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
            {/* Delete Confirmation Modal */}
            <AnimatePresence>
                {customerToDelete && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setCustomerToDelete(null)}
                            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="bg-white rounded-[16px] shadow-2xl w-full max-w-[400px] relative overflow-hidden p-6 flex flex-col items-center text-center gap-4"
                        >
                            <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center">
                                <TrashIcon className="w-7 h-7 text-red-600" />
                            </div>
                            
                            <div className="flex flex-col gap-1">
                                <h3 className="text-[18px] font-bold text-[#141414]">Mijozni o'chirish</h3>
                                <p className="text-[14px] text-[#999999] font-medium leading-relaxed">
                                    Siz rostdan ham <span className="text-[#141414] font-bold">{customerToDelete.name}</span>ni tizimdan o'chirmoqchimisiz? Bu amalni ortga qaytarib bo'lmaydi.
                                </p>
                            </div>

                            <div className="flex gap-3 w-full mt-2">
                                <button 
                                    onClick={() => setCustomerToDelete(null)}
                                    className="flex-1 px-4 py-2.5 bg-[#F5F5F5] text-[#141414] rounded-[10px] text-[13px] font-bold hover:bg-[#EAEAEA] transition-all"
                                >
                                    Bekor qilish
                                </button>
                                <button
                                    onClick={async () => {
                                        try {
                                            const { deleteClient } = await import("@/lib/supabase/queries/clients")
                                            await deleteClient(customerToDelete.id)
                                            setCustomers(prev => prev.filter(c => c.id !== customerToDelete.id));
                                            setCustomerToDelete(null);
                                        } catch (err) {
                                            console.error("O'chirishda xatolik:", err)
                                        }
                                    }}
                                    className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-[10px] text-[13px] font-bold hover:bg-red-700 transition-all shadow-md shadow-red-200 active:scale-95"
                                >
                                    O'chirish
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
            </>}
        </div>
    )
}
