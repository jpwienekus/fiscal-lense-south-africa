import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
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
import { formatTotalTooltip } from "./tooltips/total-tooltip"

const chartData = jsonData.slice(-10)

const latestYear = chartData[chartData.length - 1]
const firstYear = chartData[0].category
const lastYear = latestYear.category

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

export function RevenueExpensesChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue vs Expenses</CardTitle>
        <CardDescription>{firstYear} - {lastYear}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>

          <AreaChart
            accessibilityLayer
            data={chartData}
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
            <ChartLegend content={<ChartLegendContent className="flex flex-row justify-center items-center gap-4 pt-6"/>} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

