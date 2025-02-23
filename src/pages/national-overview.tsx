import { BorrowingRequirementChart } from "@/components/charts/borrowing-requirement";
import { ExpenseBreakdownChart } from "@/components/charts/expense-breakdown";
import { RevenueBreakdownChart } from "@/components/charts/revenue-breakdown";
import { RevenueExpensesChart } from "@/components/charts/revenue-expenses";

export function NationalOverview(){
  return (
    <div className="container flex-1 py-1">
      <div className="grid grid-cols-2 gap-4">
        <RevenueExpensesChart />
        <BorrowingRequirementChart />
        <RevenueBreakdownChart />
        <ExpenseBreakdownChart />
      </div>
    </div>
  )
}
