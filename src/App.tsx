import { ThemeProvider } from "./components/theme-provider"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs"
import { NationalOverviewTab } from "./components/tabs/national-overview"
import { ThemeToggle } from "./components/theme-toggle"
import { NationalRevenueTab } from "./components/tabs/national-revenue"

function App() {
  const [selectedYear, setSelectedYear] = useState('2023/24')

  return (
    <>
      <ThemeProvider defaultTheme="dark">
        <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">
              South African Budget Analytics
            </h1>
            <div className="flex items-center space-x-2"> {/* Added a wrapper for alignment */}
              <ThemeToggle />
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 container mx-auto">
          <Tabs defaultValue="national-overview" className="space-y-4">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="national-overview">National Overview</TabsTrigger>
                <TabsTrigger value="provincial-overview">Provincial Overview</TabsTrigger>
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
            <NationalRevenueTab selectedYear={selectedYear}/>
            <TabsContent value="expenses">test 2</TabsContent>
          </Tabs>
        </main>
      </ThemeProvider>
    </>
  )

}

export default App
