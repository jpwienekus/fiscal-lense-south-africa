import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
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
import jsonData from '@/data/parsed/revenue-expenses.json'
import { formatTotalTooltip } from "@/components/charts/tooltips/total-tooltip"
import { useEffect, useState } from "react"
import { formatNumberBasic } from "../tooltips/format-number"

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--chart-1)"
  },
  expenses: {
    label: "Expenses",
    color: "var(--chart-2)"
  },
} satisfies ChartConfig

type RevenueExpensesChartProps = {
  dataSourcedYear: string,
  selectedYear: string
  years: number,
  topN: number
}

type ChartData = {
  category: string;
  revenue: number;
  expenses: number;
}

export function RevenueExpensesChart({
  dataSourcedYear,
  selectedYear,
  years,
}: RevenueExpensesChartProps) {
  const [data, setData] = useState<ChartData[]>([])

  useEffect(() => {
    const currentYearIndex = jsonData.findIndex(e => e.category === selectedYear) + 1

    if (currentYearIndex === -1) {
      setData([])
      return
    }
    
    const parsedData = jsonData.slice(currentYearIndex - years, currentYearIndex)
    setData(parsedData)
  }, [selectedYear, years])

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Revenue vs Expenses ({years} Year Trend)</CardTitle>
        <CardDescription>Annual comparision between revenue and expenses</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>

          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              left: 5,
              right: 5,
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
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickFormatter={formatNumberBasic}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  className="w-[250px]"
                  formatter={(value, name, item, index) => formatTotalTooltip(value, name, item, index, chartConfig, true)}
                />
              }
            />

            <defs>
              <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-revenue)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-revenue)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-expenses)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-expenses)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>

            <Area
              dataKey="revenue"
              type="natural"
              fill="url(#fillRevenue)"
              fillOpacity={0.4}
              stroke="var(--color-revenue)"
            />
            <Area
              dataKey="expenses"
              type="natural"
              fill="url(#fillExpenses)"
              fillOpacity={0.4}
              stroke="var(--color-expenses)"
            />
            <ChartLegend content={<ChartLegendContent className="flex flex-row justify-center items-center gap-4 pt-6" />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <CardDescription>
          Compiled from table 1 of the national budget speech timeseries data ({dataSourcedYear})
        </CardDescription>
      </CardFooter>
    </Card>
  )
}

