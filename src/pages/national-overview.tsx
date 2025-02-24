import { BorrowingRequirementChart } from "@/components/charts/borrowing-requirement";
import { ExpenseBreakdownChart } from "@/components/charts/expense-breakdown";
import { RevenueBreakdownChart } from "@/components/charts/revenue-breakdown";
import { RevenueExpensesChart } from "@/components/charts/revenue-expenses";
import { FilterBar } from "@/components/filter-bar";
import { useState } from "react";

export function NationalOverview() {
  const [selectedYears, setSelectedYears] = useState(10)
  const [selectedTopN, setSelectedTopN] = useState(5)

  const handleYearChange = (value: string) => {
    setSelectedYears(Number(value))
  }
  const handleTopNChange = (value: string) => {
    setSelectedTopN(Number(value))
  }
  return (
    <div className="container flex-1 py-1">
      <FilterBar selectedYears={selectedYears} selectedTopN={selectedTopN} onYearChange={handleYearChange} onTopNChange={handleTopNChange} />
      <div className="grid grid-cols-2 gap-4">
        <RevenueExpensesChart years={selectedYears} topN={selectedTopN}/>
        <BorrowingRequirementChart years={selectedYears} topN={selectedTopN}/>
        <RevenueBreakdownChart years={selectedYears} topN={selectedTopN}/>
        <ExpenseBreakdownChart years={selectedYears} topN={selectedTopN}/>
      </div>
    </div>
  )
}
