import { useState } from "react"
import { Sidebar } from "./components/layout/Sidebar"
import { Dashboard } from "./components/pages/Dashboard"
import { Mijozlar } from "./components/pages/Mijozlar"
import { motion, AnimatePresence } from "framer-motion"
import {
  BellIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  CalendarDaysIcon,
  WalletIcon
} from "@heroicons/react/24/outline"

function App() {
  const [activeItem, setActiveItem] = useState("Dashboard")
  const [currentLang, setCurrentLang] = useState("uz")
  const [isLangOpen, setIsLangOpen] = useState(false)
  const [isNotifOpen, setIsNotifOpen] = useState(false)

  const notifications = [
    { id: 1, title: "Yangi tadbir", desc: "Biznes nonushta tadbiri yakunlandi.", time: "2 daqiqa oldin", type: "event", unread: true },
    { id: 2, title: "To'lov tasdiqlandi", desc: "Mijoz #4412 tomonidan to'lov amalga oshirildi.", time: "1 soat oldin", type: "payment", unread: true },
    { id: 3, title: "Tizim yangilanishi", desc: "Yangi versiya 2.4.0 muvaffaqiyatli o'rnatildi.", time: "3 soat oldin", type: "system", unread: false },
  ]

  const getPageDescription = () => {
    switch (activeItem) {
      case "Dashboard":
        return "Tizimdagi barcha asosiy ko'rsatkichlar va statistika."
      case "Mijozlar":
        return "Barcha mijozlar bazasi va ular bilan ishlash bo'limi."
      case "Sotuv bo'limi":
        return "Savdo jarayonlari, lidlar va pipline tahlili."
      case "Tadbirlar":
        return "Klub doirasidagi barcha tadbirlar va uchrashuvlar."
      case "Bildirishnomalar":
        return "Xabarnomalar, bot va SMS bildirishnomalar boshqaruvi."
      case "Cash Flow":
        return "Pul oqimi va moliyaviy tranzaksiyalar monitoringi."
      case "To'lovlar":
        return "Mijozlar tomonidan amalga oshirilgan barcha to'lovlar."
      case "Hodimlar":
        return "Jamoa a'zolari va ularning ruxsatnomalarini boshqarish."
      case "Sozlamalar":
        return "Tizim sozlamalari va shaxsiy ma'lumotlarni tahrirlash."
      case "Podkast":
        return "Audio kontentlar va podkastlar ro'yxati."
      default:
        return "Ushbu bo'lim haqida ma'lumot yaqin orada qo'shiladi."
    }
  }

  const renderContent = () => {
    switch (activeItem) {
      case "Dashboard":
        return <Dashboard />
      case "Mijozlar":
        return <Mijozlar />
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full gap-4 text-[#999999] opacity-50">
            <h1 className="text-4xl font-bold">{activeItem}</h1>
            <p>Ushbu sahifa yaqin orada qo'shiladi.</p>
          </div>
        )
    }
  }

  return (
    <div className="h-screen bg-[#F5F5F5] text-foreground flex overflow-hidden">
      <Sidebar activeItem={activeItem} onNavigate={setActiveItem} />
      <div className="flex-1 flex flex-col h-screen bg-white overflow-hidden rounded-tl-[26px] relative z-10 shadow-[-6px_0_24px_rgba(0,0,0,0.03)]">
        {/* Kontent bo'limi (Child container) */}
        <div className="flex-1 flex flex-col relative min-h-0">
          <header className="px-[24px] pt-[15px] pb-[15px] flex-shrink-0 border-b border-[#E0E0E0]">
            <div className="h-[54px] bg-white apple-sq-12 flex items-center justify-between px-[16px]">
              {/* Chap taraf: Bo'lim nomi va Izoh */}
              <div className="flex flex-col gap-[4px]">
                <div className="text-[20px] font-bold text-[#141414] leading-tight">{activeItem}</div>
                <div className="text-[12px] font-medium text-[#999999] leading-tight">{getPageDescription()}</div>
              </div>

              {/* O'ng taraf: Qidiruv, Bildirishnoma, Til, Sozlamalar */}
              <div className="flex items-center gap-[12px]">
                {/* Qidiruv (Uzun search placeholder) */}
                <div className="relative w-[320px]">
                  <MagnifyingGlassIcon className="absolute left-[12px] top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" />
                  <input
                    type="text"
                    placeholder="Tizim bo'ylab qidirish..."
                    className="w-full bg-[#F3F2F0] border-none rounded-xl py-[10px] pl-[40px] pr-[16px] text-sm text-[#141414] placeholder:text-[#999999] focus:ring-0 outline-none"
                  />
                </div>

                {/* Bildirishnoma */}
                <div className="relative">
                  <button
                    onClick={() => setIsNotifOpen(!isNotifOpen)}
                    className={`relative p-2 rounded-xl transition-colors group ${isNotifOpen ? 'bg-[#F3F2F0]' : 'hover:bg-[#F3F2F0]'}`}
                  >
                    <BellIcon className="w-6 h-6 text-[#141414]" />
                    <span className="absolute top-[8px] right-[8px] w-[10px] h-[10px] bg-[#FF3B30] border-2 border-white rounded-full"></span>
                  </button>

                  <AnimatePresence>
                    {isNotifOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute top-full right-0 mt-2 w-[360px] bg-white border border-[#D0D0D0] rounded-2xl shadow-xl overflow-hidden z-50 origin-top-right"
                      >
                        <div className="px-4 py-3 border-b border-[#F0F0F0] flex items-center justify-between bg-white sticky top-0">
                          <span className="text-sm font-bold text-[#141414]">Bildirishnomalar</span>
                          <span className="text-[11px] font-bold text-white bg-[#FF3B30] px-1.5 py-0.5 rounded-full">3 ta yangi</span>
                        </div>

                        <div className="max-h-[400px] overflow-y-auto no-scrollbar">
                          {notifications.map((notif) => (
                            <div
                              key={notif.id}
                              className={`px-4 py-3 flex gap-3 hover:bg-[#F9F9F8] transition-colors cursor-pointer border-b border-[#F5F5F5] last:border-none relative ${notif.unread ? 'bg-[#FBFBFB]' : ''}`}
                            >
                              {notif.unread && <div className="absolute left-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full" />}
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${notif.type === 'event' ? 'bg-blue-50 text-blue-600' :
                                notif.type === 'payment' ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-600'
                                }`}>
                                {notif.type === 'event' ? <CalendarDaysIcon className="w-5 h-5" /> :
                                  notif.type === 'payment' ? <WalletIcon className="w-5 h-5" /> : <BellIcon className="w-5 h-5" />}
                              </div>
                              <div className="flex flex-col gap-0.5 overflow-hidden">
                                <div className="text-[13px] font-bold text-[#141414] truncate">{notif.title}</div>
                                <div className="text-[12px] text-[#666666] line-clamp-2 leading-snug">{notif.desc}</div>
                                <div className="text-[10px] font-medium text-[#999999] mt-1">{notif.time}</div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <button className="w-full py-3 bg-[#F9F9F8] text-[12px] font-bold text-[#141414] hover:bg-[#F3F2F0] transition-colors border-t border-[#F0F0F0]">
                          Barchasini ko'rish
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Til o'zgartirish */}
                <div className="relative">
                  <button
                    onClick={() => setIsLangOpen(!isLangOpen)}
                    className="flex items-center gap-[6px] px-3 py-2 bg-[#F3F2F0] rounded-xl cursor-pointer hover:bg-[#E7E6E4] transition-colors"
                  >
                    <span className="text-sm font-semibold text-[#141414] uppercase">{currentLang}</span>
                    <ChevronDownIcon className={`w-4 h-4 text-[#999999] transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isLangOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full right-0 mt-2 w-[80px] bg-white border border-[#D0D0D0] rounded-xl shadow-lg overflow-hidden z-50"
                      >
                        {['uz', 'ru', 'en'].map((lang) => (
                          <button
                            key={lang}
                            onClick={() => {
                              setCurrentLang(lang);
                              setIsLangOpen(false);
                            }}
                            className={`w-full px-4 py-2 text-sm font-medium hover:bg-[#F3F2F0] transition-colors text-left uppercase ${currentLang === lang ? 'text-primary bg-[#F3F2F0]' : 'text-[#141414]'
                              }`}
                          >
                            {lang}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Sozlamalar */}
                <button className="p-2 hover:bg-[#F3F2F0] rounded-xl transition-colors group">
                  <Cog6ToothIcon className="w-6 h-6 text-[#141414]" />
                </button>
              </div>
            </div>
          </header>
          <main className="flex-1 px-[16px] py-[20px] overflow-y-auto no-scrollbar">
            <div className="max-w-[1400px] mx-auto h-full">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default App
