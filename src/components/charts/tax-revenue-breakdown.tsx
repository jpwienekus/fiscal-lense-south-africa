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
import { taxRevenueBreakdown } from '@/data/parsed/detailed-revenue-breakdown.json'

const numberOfYears = 10
const chartData = taxRevenueBreakdown.slice(numberOfYears * -1)
const latestYear = chartData[chartData.length - 1]
const firstYear = chartData[0].category
const lastYear = latestYear.category

const chartConfig = {
  taxes_on_income_and_profits: {
    label: "Taxes on income and profits",
    color: "var(--chart-1)"
  },
  taxes_on_payroll_and_workforce: {
    label: "Taxes on payroll and workforce",
    color: "var(--chart-2)"
  },
  taxes_on_property: {
    label: "Taxes on property",
    color: "var(--chart-3)"
  },
  domestic_taxes_on_goods_and_services: {
    label: "Domestic taxes on goods and services",
    color: "var(--chart-4)"
  },
  taxes_on_international_trade_and_transactions: {
    label: "Taxes on international trade and transations",
    color: "var(--chart-5)"
  },
  other_taxes: {
    label: "Sales of capital assets",
    color: "var(--chart-6)"
  },
  state_miscellaneous_revenue: {
    label: "Sales of capital assets",
    color: "var(--chart-7)"
  },
} satisfies ChartConfig

export function TaxRevenueBreakdownChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <span className="flex">
            Tax Revenue Breakdown
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

