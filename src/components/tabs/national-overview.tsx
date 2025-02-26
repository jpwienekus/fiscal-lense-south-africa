import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import revenueExpenses from '@/data/parsed/revenue-expenses.json'
import borrowingRequirementData from '@/data/parsed/borrowing-requirement.json'
import { useEffect, useState } from "react"
import { TabsContent } from "../ui/tabs"
import { RevenueExpensesChart } from "@/components/charts/national-overview/revenue-expenses"
import { BorrowingRequirementChart } from "@/components/charts/national-overview/borrowing-requirement"
import { RevenueBreakdownChart } from "@/components/charts/national-overview/revenue-breakdown";
import { ExpenseByFunctionalClassificationChart } from "../charts/national-overview/expenses-by-functional-classification"
import { TaxRevenueKpi } from "../kpi-cards/revenue/national/tax-revenue"

type NationalOverviewTabProps = {
  selectedYear: string
}

export const NationalOverviewTab = ({
  selectedYear
}: NationalOverviewTabProps) => {

  const [expenses, setExpenses] = useState('')
  const [expensesState, setExpensesState] = useState('')
  const [netPosition, setNetPosition] = useState('')
  const [netState, setNetState] = useState('')
  const [borrowingRequirement, setBorrowingRequirement] = useState('')
  const [borrowingRequirementState, setBorrowingRequirementState] = useState('')
  const dataSourcedYear = '2024'


  const calculatePosition = (cPosition: number, pPosition: number) => {
    return (((cPosition - pPosition) / pPosition) * 100).toFixed(2)
  }

  useEffect(() => {
    const formatter = new Intl.NumberFormat('en-US', {
      notation: 'compact',
      compactDisplay: 'long',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })

    const currentYearIndex = revenueExpenses.findIndex(e => e.category === selectedYear)
    const currentYear = revenueExpenses[currentYearIndex]
    const previousYear = revenueExpenses[currentYearIndex - 1]
    const currentYearBorrowingRequirementIndex = borrowingRequirementData.findIndex(e => e.category === selectedYear)
    const currentYearBorrowingRequirement = borrowingRequirementData[currentYearBorrowingRequirementIndex]
    const previousYearBorrowingRequirement = borrowingRequirementData[currentYearBorrowingRequirementIndex - 1]

    setExpenses(formatter.format(currentYear.expenses).toString())
    setExpensesState(calculatePosition(currentYear.expenses, previousYear.expenses))

    const currentYearPosition = currentYear.revenue - currentYear.expenses
    const previousYearPosition = previousYear.revenue - previousYear.expenses
    setNetPosition(formatter.format(currentYearPosition).toString())
    setNetState(calculatePosition(currentYearPosition, previousYearPosition))

    if (currentYearBorrowingRequirement) {
      const currentYearBorrowingRequirementTotal = currentYearBorrowingRequirement.foreign_loans + currentYearBorrowingRequirement.gfecra_settlement + currentYearBorrowingRequirement.main_budget_balance + currentYearBorrowingRequirement.domestic_long_term_loans + currentYearBorrowingRequirement.eskom_debt_relief_arrangement
      const previousYearBorrowingRequirementTotal = previousYearBorrowingRequirement.foreign_loans + previousYearBorrowingRequirement.gfecra_settlement + previousYearBorrowingRequirement.main_budget_balance + previousYearBorrowingRequirement.domestic_long_term_loans + previousYearBorrowingRequirement.eskom_debt_relief_arrangement
      setBorrowingRequirement(formatter.format(currentYearBorrowingRequirementTotal).toString())
      setBorrowingRequirementState(calculatePosition(currentYearBorrowingRequirementTotal, previousYearBorrowingRequirementTotal))
    }

  }, [selectedYear])

  return (
    <TabsContent value="overview" className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <TaxRevenueKpi selectedYear={selectedYear} />
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <CardContent className="px-0">
              <div className="text-2xl font-bold">R{expenses}</div>
              <p className={`text-xs ${+expensesState > 0 ? 'text-red-500' : 'text-green-500'}`}>{+expensesState > 0 ? '+' : ''}{expensesState}% {+expensesState > 0 ? 'up' : 'down'}</p>
            </CardContent>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Net Position</CardTitle>
            <CardContent className="px-0">
              <div className="text-2xl font-bold">R{netPosition}</div>
              <p className={`text-xs ${+netState > 0 ? 'text-red-500' : 'text-green-500'}`}>{+netState > 0 ? '+' : ''}{netState}% {+netState > 0 ? 'up' : 'down'}</p>
            </CardContent>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Borrowing Requirement</CardTitle>
            <CardContent className="px-0">
              <div className="text-2xl font-bold">R{borrowingRequirement}</div>
              <p className={`text-xs ${+borrowingRequirementState > 0 ? 'text-red-500' : 'text-green-500'}`}>{+borrowingRequirementState > 0 ? '+' : ''}{borrowingRequirementState}% {+borrowingRequirementState > 0 ? 'up' : 'down'}</p>
            </CardContent>
          </CardHeader>
        </Card>
      </div>

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
