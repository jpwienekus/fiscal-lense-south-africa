import { BrowserRouter } from "react-router-dom"
import { ThemeProvider } from "./components/theme-provider"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs"
import { NationalOverviewTab } from "./components/tabs/national-overview"

function App() {
  const [selectedYear, setSelectedYear] = useState('2023/24')

  return (
    <>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark">
          <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 py-3">
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold">
                South African Budget Analytics
              </h1>
            </div>
          </header>

          <main className="flex-1 p-4 container mx-auto">
            <Tabs defaultValue="overview" className="space-y-4">
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="revenue">Revenue</TabsTrigger>
                  <TabsTrigger value="expenses">Expenses</TabsTrigger>
                </TabsList>
                <div className="flex items-center gap-2">
                  <span className="text-sm" >Fiscal Years:</span>
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
                </div>
              </div>

              <NationalOverviewTab selectedYear={selectedYear} />
              <TabsContent value="revenue">test 1</TabsContent>
              <TabsContent value="expenses">test 2</TabsContent>
            </Tabs>
          </main>
        </ThemeProvider>
      </BrowserRouter>
    </>
  )

}

export default App
