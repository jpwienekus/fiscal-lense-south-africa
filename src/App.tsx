import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ThemeProvider } from "./components/theme-provider"
import { RevenueBreakdown } from "./pages/revenue-breakdown"
import { Header } from "./components/header"
import { NationalOverview } from "./pages/national-overview"

function App() {
  return (
    <>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark">
          <div className="relative flex min-h-svh flex-col bg-background">
            <div data-wrapper="" className="border-grid flex flex-1 flex-col">
              <Header />

              <main className="flex flex-1 flex-col">
                <div className="container-wrapper flex flex-1">
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
