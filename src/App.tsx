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
      <main className="flex-1 p-[40px] overflow-y-auto no-scrollbar bg-[#F5F5F5]">
        <div className="max-w-[1400px] mx-auto h-full">
          {renderContent()}
        </div>
      </main>
    </div>
  )
}

export default App
