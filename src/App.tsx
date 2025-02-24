import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ThemeProvider } from "./components/theme-provider"
import { RevenueBreakdown } from "./pages/revenue-breakdown"
import { Header } from "./components/header"
import { NationalOverview } from "./pages/national-overview"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs"
import { NationalOverviewTab } from "./components/tabs/national-overview"
import { ThemeToggle } from "./components/theme-toggle"

function App() {
  const [selectedYear, setSelectedYear] = useState('2023/24')

  return (
    <>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark">
          <div className="p-6 space-y-6 min-h-screen">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">South African Budget Analytics</h1>
              <div className="flex">
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="w-32 me-1">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 10 }, (_, i) => (
                      <SelectItem key={`20${14 + i}/${14 + i + 1}`} value={`20${14 + i}/${14 + i + 1}`}>{`20${14 + i}/${14 + i + 1}`}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <ThemeToggle />
              </div>
            </div>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="revenue">Revenue Details</TabsTrigger>
                <TabsTrigger value="expenses">Expenses Details</TabsTrigger>
              </TabsList>

              <NationalOverviewTab selectedYear={selectedYear} />
              <TabsContent value="revenue">test 1</TabsContent>
              <TabsContent value="expenses">test 2</TabsContent>
            </Tabs>


          </div>
          {/*<div className="relative flex min-h-svh flex-col bg-background">
            <div data-wrapper="" className="border-grid flex flex-1 flex-col">
              <Header />

              <main className="">
                <div className="container-wrapper">
                  <Routes>
                    <Route path="/" element={<NationalOverview />} />
                    <Route path="/national-revenue-breakdown" element={<RevenueBreakdown />} />
                  </Routes>
                </div>
              </main>
            </div>
          </div> */}


        </ThemeProvider>
      </BrowserRouter>
    </>
  )

}

export default App
