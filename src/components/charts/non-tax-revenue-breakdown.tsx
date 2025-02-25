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
import { nonTaxRevenueBreakdown } from '@/data/parsed/detailed-revenue-breakdown.json'

const numberOfYears = 10
const chartData = nonTaxRevenueBreakdown.slice(numberOfYears * -1)
const latestYear = chartData[chartData.length - 1]
const firstYear = chartData[0].category
const lastYear = latestYear.category

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

export function NonTaxRevenueBreakdownChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <span className="flex">
            Non Tax Revenue Breakdown
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

