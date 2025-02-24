import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ThemeProvider } from "./components/theme-provider"
import { RevenueBreakdown } from "./pages/revenue-breakdown"
import { Header } from "./components/header"
import { NationalOverview } from "./pages/national-overview"
import { FilterBar } from "./components/filter-bar"

function App() {
  const [selectedYears, setSelectedYears] = useState(10)
  const [selectedTopN, setSelectedTopN] = useState(5)

  const handleYearChange = (value: string) => {
    setSelectedYears(Number(value))
  }
  const handleTopNChange = (value: string) => {
    setSelectedTopN(Number(value))
  }

  return (
    <>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark">
          <div className="relative flex min-h-svh flex-col bg-background">
            <div data-wrapper="" className="border-grid flex flex-1 flex-col">
              <Header />

              <main className="">
                <div className="container-wrapper">
                  <FilterBar selectedYears={selectedYears} selectedTopN={selectedTopN} onYearChange={handleYearChange} onTopNChange={handleTopNChange} />
                  <Routes>
                    <Route path="/" element={<NationalOverview />} />
                    <Route path="/national-revenue-breakdown" element={<RevenueBreakdown />} />
                  </Routes>
                </div>
              </main>
            </div>
          </div>

        </ThemeProvider>

      </BrowserRouter>
    </>
  )

}

export default App
