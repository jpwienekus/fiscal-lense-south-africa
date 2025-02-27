import { TabsContent } from "../ui/tabs"
import { RevenueExpensesChart } from "@/components/charts/national-overview/revenue-expenses"
import { BorrowingRequirementChart } from "@/components/charts/national-overview/borrowing-requirement"
import { RevenueBreakdownChart } from "@/components/charts/national-overview/revenue-breakdown";
import { ExpenseByFunctionalClassificationChart } from "../charts/national-overview/expenses-by-functional-classification"

type NationalOverviewTabProps = {
  selectedYear: string
}

export const NationalOverviewTab = ({
  selectedYear
}: NationalOverviewTabProps) => {

  const dataSourcedYear = '2024'
  return (
    <TabsContent value="national-overview" className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueExpensesChart dataSourcedYear={dataSourcedYear} selectedYear={selectedYear} years={10} topN={5} />
        <BorrowingRequirementChart dataSourcedYear={dataSourcedYear} selectedYear={selectedYear} years={10} topN={5} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueBreakdownChart dataSourcedYear={dataSourcedYear} selectedYear={selectedYear} years={10} topN={5} />
        <ExpenseByFunctionalClassificationChart dataSourcedYear={dataSourcedYear} selectedYear={selectedYear} />
      </div>
    </TabsContent>
  )
}
