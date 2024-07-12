

import { Button } from "@/components/ui/button"

export default function Landing() {
  return (
    <div className="flex flex-col min-h-screen p-4">
      <header className="flex justify-end p-4">
        <span className="text-[#0072C6] font-bold">HEXAWARE</span>
      </header>
      <main className="flex flex-1">
        <nav className="flex flex-col space-y-2 p-4">
          <Button variant="outline" className="w-40">
            About META
          </Button>
          <Button variant="outline" className="w-40">
            Process
          </Button>
          <Button variant="outline" className="w-40">
            Products and Features
          </Button>
        </nav>
        <section className="flex-1 bg-[#0072C6]" />
      </main>
      <footer className="flex justify-between p-4 text-xs text-[#6B7280]">
        <span>© Hexaware Technologies.</span>
     
      </footer>
    </div>
  )
}
