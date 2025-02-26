import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import revenueExpenses from '@/data/parsed/revenue-expenses.json'
import { taxRevenueBreakdown } from '@/data/parsed/detailed-revenue-breakdown.json'
import { calculateGrowth } from "../../utils"

type IncomeTaxShareKpiProps = {
  selectedYear: string
}

export const IncomeTaxShareKpi = ({
  selectedYear
}: IncomeTaxShareKpiProps) => {
  const [incomeTaxShare, setIncomeTaxShare] = useState(0)
  const [growth, setGrowth] = useState(0)

  useEffect(() => {
    const currentYearRevenueIndex = revenueExpenses.findIndex(e => e.category === selectedYear)
    const latestYearRevenue = revenueExpenses[currentYearRevenueIndex]
    const previousYearRevenue = revenueExpenses[currentYearRevenueIndex - 1]

    const latestYearTaxRevenueIndex = taxRevenueBreakdown.findIndex(e => e.category === selectedYear)
    const latestYearTaxRevenue = taxRevenueBreakdown[latestYearTaxRevenueIndex]
    const previousYearTaxRevenue = taxRevenueBreakdown[latestYearTaxRevenueIndex - 1]

    const latestYearPercent = latestYearTaxRevenue.taxes_on_income_and_profits / latestYearRevenue.revenue
    const previousYearPercent = previousYearTaxRevenue.taxes_on_income_and_profits / previousYearRevenue.revenue

    setIncomeTaxShare(latestYearPercent * 100)
    setGrowth((calculateGrowth(latestYearPercent, previousYearPercent)))

  }, [selectedYear])

  return (

    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Income Tax Share</CardTitle>
        <CardContent className="px-0">
          <div className="text-2xl font-bold">{incomeTaxShare.toFixed(2)}%</div>
          <p className={`text-xs ${+growth > 0 ? 'text-green-500' : 'text-red-500'}`}>
            {+growth > 0 ? '+' : ''}
            {growth.toFixed(2)}%
            &nbsp;
            {+growth > 0 ? 'up' : 'down'}
            &nbsp;
            <span className="text-xs text-muted-foreground">vs. previous year</span>
          </p>
        </CardContent>
      </CardHeader>
    </Card>
  )
}
