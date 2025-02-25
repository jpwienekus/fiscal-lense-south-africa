import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { nonTaxRevenueBreakdown } from '@/data/parsed/detailed-revenue-breakdown.json'
import { useEffect, useState } from "react"
import { formatNumber, formatNumberBasic } from "@/components/charts/tooltips/format-number"

const chartConfig = {
  sales_of_goods_and_services_other_than_capital_assets: {
    label: "Sales of goods and services other than capital assets",
    color: "var(--chart-1)"
  },
  transfers_received: {
    label: "Transfers received",
    color: "var(--chart-2)"
  },
  fines_penalties_and_forfeits: {
    label: "Fines, penalties and forfeits",
    color: "var(--chart-3)"
  },
  interest_dividends_and_rent_on_land: {
    label: "Interest, dividends and rent on land",
    color: "var(--chart-4)"
  },
  icasa: {
    label: "Icasa",
    color: "var(--chart-5)"
  },
  competition_commission: {
    label: "Sales of capital assets",
    color: "var(--chart-6)"
  },
} satisfies ChartConfig

type MappedChartData = {
  category: string;
  value: number;
  fill: string;
}

type NonTaxRevenueBreakdownChartProps = {
  dataSourcedYear: string,
  selectedYear: string
}

export function NonTaxRevenueBreakdownChart({
  dataSourcedYear,
  selectedYear
}: NonTaxRevenueBreakdownChartProps) {
  const [data, setData] = useState<MappedChartData[]>([])

  useEffect(() => {
    const currentYear = nonTaxRevenueBreakdown.find(e => e.category === selectedYear)

    if (!currentYear) {
      setData([])
      return
    }

    const keysToSum = Object.keys(currentYear).slice(1)

    const mapped = keysToSum.map(e => {
      const chartKey = e as keyof typeof chartConfig;
      return {
        category: e,
        value: currentYear[chartKey],
        fill: `var(--color-${e})`
      }
    })

    setData(mapped)
  }, [selectedYear])
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <span className="flex">
            Non Tax Revenue Breakdown
          </span>
        </CardTitle>
        <CardDescription>Non tax revenue sources</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="category"
              tickLine={false}
              axisLine={false}
              interval={0}
              angle={-45}
              textAnchor="end"
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <YAxis
              tickCount={10}
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickFormatter={formatNumberBasic}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideLabel
                  formatter={formatNumber}
                />}
            />

            <Bar
              key="value"
              dataKey="value"
            />
            <ChartLegend content={<ChartLegendContent className="flex flex-row justify-center items-center gap-4 pt-6" />} />
          </BarChart>
        </ChartContainer>
        <CardFooter>
          <CardDescription>
            Compiled from table 3 of the national budget speech timeseries data ({dataSourcedYear})
          </CardDescription>
        </CardFooter>
      </CardContent>
    </Card>
  )
}

