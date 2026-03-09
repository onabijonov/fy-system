import { Sidebar } from "./components/layout/Sidebar"

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <Sidebar />
      <main className="flex-1 p-[40px]">
        {/* Asosiy kontent shu yerga joylashadi */}
        <h1 className="text-3xl font-bold">Asosiy panel (Dashboard)</h1>
      </main>
    </div>
  )
}

export default App
