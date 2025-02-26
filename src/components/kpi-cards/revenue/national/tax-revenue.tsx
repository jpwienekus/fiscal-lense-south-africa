import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { calculateDifferencePercentage } from '@/components/kpi-cards/utils'
import { formatNumberTwoDecimals } from "@/components/charts/tooltips/format-number"
import revenueExpenses from '@/data/parsed/revenue-expenses.json'

type TaxRevenueKpiProps = {
  selectedYear: string
}

export const TaxRevenueKpi = ({
  selectedYear
}: TaxRevenueKpiProps) => {
  const [taxRevenue, setTaxRevenue] = useState(0)
  const [taxDifference, setTaxDifference] = useState(0)

  useEffect(() => {
    const currentYearRevenueIndex = revenueExpenses.findIndex(e => e.category === selectedYear)
    const latestYearRevenue = revenueExpenses[currentYearRevenueIndex]
    const previousYearRevenue = revenueExpenses[currentYearRevenueIndex - 1]
    const totalTaxDifference = calculateDifferencePercentage(latestYearRevenue.revenue, previousYearRevenue.revenue)

    setTaxRevenue(latestYearRevenue.revenue)
    setTaxDifference(totalTaxDifference)

  }, [selectedYear])

  return (

    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
        <CardContent className="px-0">
          <div className="text-2xl font-bold">{formatNumberTwoDecimals(taxRevenue)}</div>
          <p className={`text-xs ${+taxDifference > 0 ? 'text-green-500' : 'text-red-500'}`}>
            {+taxDifference > 0 ? '+' : ''}
            {taxDifference.toFixed(2)}%
            &nbsp;
            {+taxDifference > 0 ? 'up' : 'down'}
            &nbsp;
            <span className="text-xs text-muted-foreground">vs. previous year</span> </p>
        </CardContent>
      </CardHeader>
    </Card>
  )
}
