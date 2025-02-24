import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ThemeProvider } from "./components/theme-provider"
import { RevenueBreakdown } from "./pages/revenue-breakdown"
import { Header } from "./components/header"
import { NationalOverview } from "./pages/national-overview"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs"
import { NationalOverviewTab } from "./components/tabs/national-overview"

function App() {
  const [selectedYear, setSelectedYear] = useState('2023/24')

  return (
    <>
      <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">South African Budget Analytics</h1>
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 10 }, (_, i) => (
                <SelectItem key={`20${14 + i}/${14 + i+1}`} value={`20${14 + i}/${14 + i+1}`}>{`20${14 + i}/${14+i+1}`}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="revenue">Revenue Details</TabsTrigger>
            <TabsTrigger value="expenses">Expenses Details</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <NationalOverviewTab selectedYear={selectedYear}/>
          </TabsContent>
          <TabsContent value="revenue">test 1</TabsContent>
          <TabsContent value="expenses">test 2</TabsContent>
        </Tabs>


      </div>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark">
          <div className="relative flex min-h-svh flex-col bg-background">
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
          </div>

        </ThemeProvider>

      </BrowserRouter>
    </>
  )

}

export default App
