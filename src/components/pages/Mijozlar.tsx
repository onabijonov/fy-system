const activeCustomers = [
    { id: 1, name: "Aziz Rahimov", color: "bg-blue-100 text-blue-600" },
    { id: 2, name: "Malika Shoraxmedova", color: "bg-pink-100 text-pink-600" },
    { id: 3, name: "Jasur Abdullaev", color: "bg-green-100 text-green-600" },
    { id: 4, name: "Dilnoza Karimova", color: "bg-purple-100 text-purple-600" },
    { id: 5, name: "Otabek Mahmudov", color: "bg-orange-100 text-orange-600" },
    { id: 6, name: "Zuhra Ismoilova", color: "bg-red-100 text-red-600" },
    { id: 7, name: "Farhod Ergashev", color: "bg-indigo-100 text-indigo-600" },
    { id: 8, name: "Nigora Aliyeva", color: "bg-teal-100 text-teal-600" },
    { id: 9, name: "Bobur Mirzo", color: "bg-yellow-100 text-yellow-600" },
    { id: 10, name: "Shahlo G'ulomova", color: "bg-cyan-100 text-cyan-600" },
    { id: 11, name: "Sherzod Orifov", color: "bg-emerald-100 text-emerald-600" },
    { id: 12, name: "Madina Tursunova", color: "bg-rose-100 text-rose-600" },
    { id: 13, name: "Rustam Xoliqov", color: "bg-lime-100 text-lime-600" },
    { id: 14, name: "Zaynab Qosimova", color: "bg-violet-100 text-violet-600" },
    { id: 15, name: "Sardor Azimov", color: "bg-amber-100 text-amber-600" },
];

export function Mijozlar() {
    return (
        <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Aktiv Mijozlar Section (Instagram Stories style) */}
            <div className="flex flex-col gap-4">
                <h3 className="text-[14px] font-bold text-[#141414] px-1">Eng aktiv mijozlar</h3>

                <div className="flex gap-5 overflow-x-auto no-scrollbar pb-2 px-1">
                    {activeCustomers.map((customer) => (
                        <div key={customer.id} className="flex flex-col items-center gap-2 group cursor-pointer flex-shrink-0">
                            {/* Avatar with gradient border */}
                            <div className="relative p-[2px] rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] group-hover:scale-105 transition-transform duration-300">
                                <div className="p-0.5 bg-white rounded-full">
                                    <div className={`w-[68px] h-[68px] rounded-full ${customer.color} flex items-center justify-center font-bold text-lg border border-[#F0F0F0]`}>
                                        {customer.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                </div>
                                {/* Online Status Dot */}
                                <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                            </div>

                            {/* Name */}
                            <span className="text-[11px] font-bold text-[#141414] max-w-[80px] text-center truncate leading-tight">
                                {customer.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Placeholder for rest of content */}
            <div className="flex-1 border-2 border-dashed border-[#F0F0F0] rounded-[32px] flex items-center justify-center p-12">
                <div className="text-center flex flex-col items-center gap-3 opacity-30">
                    <div className="w-12 h-12 bg-[#D0D0D0] rounded-2xl" />
                    <p className="font-bold text-[#141414]">Mijozlar ro'yxati yaqin orada qo'shiladi</p>
                </div>
            </div>
        </div>
    )
}
