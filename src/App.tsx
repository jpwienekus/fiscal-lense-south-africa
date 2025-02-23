import { BrowserRouter } from "react-router-dom"
import { ThemeProvider } from "./components/theme-provider"
import { NavBar } from "./components/nav-bar"
import { RevenueExpensesChart } from "./components/charts/revenue-expenses"
import { BorrowingRequirementChart } from "./components/charts/borrowing-requirement"
import { RevenueBreakdownChart } from "./components/charts/revenue-breakdown"
import { ExpenseBreakdownChart} from "./components/charts/expense-breakdown"

function App() {
  return (
    <>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark">
          <div className="relative flex min-h-svh flex-col bg-background">
            <div data-wrapper="" className="border-grid flex flex-1 flex-col">
              <header className="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container-wrapper">
                  <NavBar />
                </div>
              </header>

              <main className="flex flex-1 flex-col">
                <div className="container-wrapper flex flex-1">
                  <div className="container flex-1 py-1">
                    <div className="grid grid-cols-2 gap-4">
                      <RevenueExpensesChart />
                      <BorrowingRequirementChart />
                      <RevenueBreakdownChart />
                      <ExpenseBreakdownChart />
                    </div>
                  </div>
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
