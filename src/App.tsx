import { useState } from "react"
import { Sidebar } from "./components/layout/Sidebar"
import { Dashboard } from "./components/pages/Dashboard"
import { Mijozlar } from "./components/pages/Mijozlar"

function App() {
  const [activeItem, setActiveItem] = useState("Dashboard")

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
          <header className="px-[16px] pt-[15px] flex-shrink-0">
            <div className="h-[54px] bg-white border border-[#D0D0D0] apple-sq-12 px-[12px] flex items-center">
              {/* Top Bar Content */}
              <div className="text-[18px] font-semibold text-[#141414]">{activeItem}</div>
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
