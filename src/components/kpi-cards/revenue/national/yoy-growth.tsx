import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import revenueExpenses from '@/data/parsed/revenue-expenses.json'
import { formatNumberTwoDecimals } from "@/components/charts/tooltips/format-number"

type YoyGrowthKpiProps = {
  selectedYear: string
}

export const YoyGrowthKpi = ({
  selectedYear
}: YoyGrowthKpiProps) => {
  const [yoyGrowth, setYoyGrowth] = useState(0)
  const [growth, setGrowth] = useState(0)

  useEffect(() => {
    const currentYearRevenueIndex = revenueExpenses.findIndex(e => e.category === selectedYear)
    const latestYearRevenue = revenueExpenses[currentYearRevenueIndex]
    const previousYearRevenue = revenueExpenses[currentYearRevenueIndex - 1]

    setYoyGrowth(((latestYearRevenue.revenue / previousYearRevenue.revenue) - 1) * 100)
    setGrowth(latestYearRevenue.revenue - previousYearRevenue.revenue)

  }, [selectedYear])

  return (

    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Year Over Year Growth</CardTitle>
        <CardContent className="px-0">
          <div className="text-2xl font-bold">{yoyGrowth.toFixed(2)}%</div>
          <p className={`text-xs ${+growth > 0 ? 'text-green-500' : 'text-red-500'}`}>
            {+growth > 0 ? '+' : ''}
            {formatNumberTwoDecimals(growth)}
            &nbsp;
            {+growth > 0 ? 'up' : 'down'}
            <span className="text-xs text-muted-foreground"> vs. previous year</span>
          </p>
          {/* no need to render -, its already being done since the number is negative */}
        </CardContent>
      </CardHeader>
    </Card>
  )
}
