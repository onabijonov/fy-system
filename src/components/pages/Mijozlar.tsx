import { MagnifyingGlassIcon, PlusIcon, FunnelIcon, EllipsisHorizontalIcon } from "@heroicons/react/24/outline"

export function Mijozlar() {
    const customers = [
        { name: "Ali Valiev", company: "Artel", phone: "+998 90 123 45 67", status: "Active", date: "2024-03-01" },
        { name: "Omina Karimova", company: "Korzinka", phone: "+998 91 222 33 44", status: "Active", date: "2024-03-05" },
        { name: "Nuriddin Mo'sojonov", company: "EVOS", phone: "+998 93 456 78 90", status: "Inactive", date: "2024-03-10" },
        { name: "Jamshid Tuychiev", company: "Havas", phone: "+998 97 789 01 22", status: "Active", date: "2024-03-12" },
    ]

    return (
        <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <header className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                    <h1 className="text-[32px] font-bold text-[#141414]">Mijozlar</h1>
                    <p className="text-[#999999]">Sizning barcha mijozlaringiz ro'yxati va ular haqida ma'lumot.</p>
                </div>
                <button className="bg-[#141414] text-white apple-sq-10 px-6 py-3 font-bold text-sm hover:scale-105 transition-transform flex items-center gap-2">
                    <PlusIcon className="w-5 h-5" />
                    Yangi mijoz
                </button>
            </header>

            <div className="bg-white border border-[#D0D0D0] apple-sq-12 p-6 flex flex-col gap-6">
                <div className="flex items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-[400px]">
                        <input
                            type="text"
                            placeholder="Mijozni qidirish..."
                            className="w-full bg-[#F5F5F5] border-none apple-sq-10 px-12 py-3 text-sm placeholder:text-[#999999] outline-none"
                        />
                        <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" />
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-3 bg-[#F5F5F5] apple-sq-10 text-sm font-medium text-[#141414] hover:bg-[#EAEAEA] transition-colors">
                            <FunnelIcon className="w-4 h-4" />
                            Filter
                        </button>
                        <button className="px-4 py-3 bg-[#F5F5F5] apple-sq-10 text-[#141414] hover:bg-[#EAEAEA] transition-colors">
                            <EllipsisHorizontalIcon className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="w-full overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="text-[#999999] font-medium border-b border-[#F5F5F5]">
                            <tr>
                                <th className="pb-4">F.I.SH</th>
                                <th className="pb-4">Kompaniya</th>
                                <th className="pb-4">Telefon</th>
                                <th className="pb-4">Status</th>
                                <th className="pb-4">Sana</th>
                                <th className="pb-4"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#F5F5F5]">
                            {customers.map((c, i) => (
                                <tr key={i} className="hover:bg-[#F9F9F9] transition-colors group">
                                    <td className="py-5 font-medium text-[#141414]">{c.name}</td>
                                    <td className="py-5 text-[#999999]">{c.company}</td>
                                    <td className="py-5 text-[#141414]">{c.phone}</td>
                                    <td className="py-5">
                                        <span className={`px-3 py-1 apple-sq-10 text-xs font-bold ${c.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                            {c.status}
                                        </span>
                                    </td>
                                    <td className="py-5 text-[#999999]">{c.date}</td>
                                    <td className="py-5 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-2 hover:bg-[#EAEAEA] apple-sq-10">
                                            <EllipsisHorizontalIcon className="w-5 h-5 text-[#141414]" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
