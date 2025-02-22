import { TrendingUp, TrendingDown } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
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

const chartData = jsonData.revenueVsExpenses

const latestYear = chartData[chartData.length - 1]
const trend = Number(((latestYear.revenue - latestYear.expenses) / latestYear.expenses * 100).toFixed(2))
const firstYear = chartData[0].category
const lastYear = latestYear.category

const chartConfig = {
  revenue: {
    label: "Revenue",
  },
  expenses: {
    label: "Expenses",
  },
  shortfall: {
    label: "Shortfall"
  }
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
          <LineChart
            accessibilityLayer
            data={chartData}
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
              tickMargin={10}
            />
            <YAxis 
              tickLine={false}
              axisLine={false}
              tickMargin={10}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="revenue"
              type="natural"
              fill="var(--chart-1)"
              fillOpacity={0.4}
              stroke="var(--chart-1)"
            />
            <Line
              dataKey="expenses"
              type="natural"
              fill="var(--chart-2)"
              fillOpacity={0.4}
              stroke="var(--chart-2)"
            />
            <Line
              dataKey="shortfall"
              type="natural"
              fill="var(--chart-3)"
              fillOpacity={0.4}
              stroke="var(--chart-3)"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending {trend > 0 ? 'up' : 'down'} by {Math.abs(trend)}% this year 
          {trend > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
        </div>
      </CardFooter>
    </Card>
  )
}

