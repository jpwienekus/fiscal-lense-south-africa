import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import revenueExpenses from '@/data/parsed/revenue-expenses.json'
import { vatRevenueBreakdown } from '@/data/parsed/detailed-revenue-breakdown.json'
import { calculateGrowth } from "../../utils"

type DomesticVatKpiProps = {
  selectedYear: string
}

export const DomesticVatKpi = ({
  selectedYear
}: DomesticVatKpiProps) => {
  const [vatRevenue, setVatRevenue] = useState(0)
  const [growth, setGrowth] = useState(0)

  useEffect(() => {
    const currentYearRevenueIndex = revenueExpenses.findIndex(e => e.category === selectedYear)
    const latestYearRevenue = revenueExpenses[currentYearRevenueIndex]
    const previousYearRevenue = revenueExpenses[currentYearRevenueIndex - 1]

    const latestYearTaxRevenueIndex = vatRevenueBreakdown.findIndex(e => e.category === selectedYear)
    const latestYearTaxRevenue = vatRevenueBreakdown[latestYearTaxRevenueIndex]
    const previousYearTaxRevenue = vatRevenueBreakdown[latestYearTaxRevenueIndex - 1]

    const latestYearPercent = latestYearTaxRevenue.domestic_vat / latestYearRevenue.revenue
    const previousYearPercent = previousYearTaxRevenue.domestic_vat / previousYearRevenue.revenue

    setVatRevenue(latestYearPercent * 100)
    setGrowth(calculateGrowth(latestYearPercent, previousYearPercent))

  }, [selectedYear])

  return (

    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Domestic VAT Share</CardTitle>
        <CardContent className="px-0">
          <div className="text-2xl font-bold">{vatRevenue.toFixed(2)}%</div>
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
