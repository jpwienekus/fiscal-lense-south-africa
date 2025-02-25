import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
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
import { formatTotalTooltip } from "./tooltips/total-tooltip"
import jsonData from '@/data/parsed/detailed-revenue-breakdown.json'

const numberOfYears = 10
const chartData = jsonData.revenueBreakdown.slice(numberOfYears * -1)
const latestYear = chartData[chartData.length - 1]
const firstYear = chartData[0].category
const lastYear = latestYear.category

const chartConfig = {
  total_tax_revenue__gross_: {
    label: "Tax revenue (gross)",
    color: "var(--chart-1)"
  },
  less__sacu_payments: {
    label: "Less: SACU payments",
    color: "var(--chart-2)"
  },
  non_tax_revenue__departmental_receipts_: {
    label: "Non-tax revenue (departmental receipts)",
    color: "var(--chart-3)"
  },
  financial_transactions_in_assets_and_liabilities: {
    label: "Financial transactions in assets and liabilities",
    color: "var(--chart-4)"
  },
  sales_of_capital_assets: {
    label: "Sales of capital assets",
    color: "var(--chart-5)"
  },
} satisfies ChartConfig

export function RevenueBreakdownChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <span className="flex">
            Revenue Breakdown
          </span>
        </CardTitle>
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
                  formatter={(value, name, item, index) => formatTotalTooltip(value, name, item, index, chartConfig)}
                />
              }
            />

            {Object.keys(chartConfig).map((key) => (
              <Line
                key={key}
                dataKey={key}
                type="natural"
                fill={`var(--color-${key})`}
                fillOpacity={0.4}
                stroke={`var(--color-${key})`}
              />
            ))}

            <ChartLegend content={<ChartLegendContent className="flex flex-row justify-center items-center gap-6 pt-4" />} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

