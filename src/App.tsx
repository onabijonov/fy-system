import { useState } from "react"
import { Sidebar } from "./components/layout/Sidebar"
import { Dashboard } from "./components/pages/Dashboard"
import { Mijozlar } from "./components/pages/Mijozlar"
import { motion, AnimatePresence } from "framer-motion"
import {
  BellIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  Cog6ToothIcon
} from "@heroicons/react/24/outline"

function App() {
  const [activeItem, setActiveItem] = useState("Dashboard")
  const [currentLang, setCurrentLang] = useState("uz")
  const [isLangOpen, setIsLangOpen] = useState(false)

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
      <div className="flex-1 flex flex-col h-screen bg-white overflow-hidden rounded-tl-[26px]">
        {/* Kontent bo'limi (Child container) */}
        <div className="flex-1 flex flex-col relative min-h-0">
          <header className="px-[24px] pt-[15px] flex-shrink-0">
            <div className="h-[54px] bg-white apple-sq-12 flex items-center justify-between px-[16px]">
              {/* Chap taraf: Bo'lim nomi */}
              <div className="text-[20px] font-bold text-[#141414]">{activeItem}</div>

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
                <button className="relative p-2 hover:bg-[#F3F2F0] rounded-xl transition-colors group">
                  <BellIcon className="w-6 h-6 text-[#141414]" />
                  <span className="absolute top-[8px] right-[8px] w-[10px] h-[10px] bg-[#FF3B30] border-2 border-white rounded-full"></span>
                </button>

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
