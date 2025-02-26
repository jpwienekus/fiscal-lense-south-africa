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
import { formatTotalTooltip } from "../tooltips/total-tooltip"
import { otherInterestingRevenueBreakdown } from '@/data/parsed/detailed-revenue-breakdown.json'

const numberOfYears = 10
const chartData = otherInterestingRevenueBreakdown.slice(numberOfYears * -1)
const latestYear = chartData[chartData.length - 1]
const firstYear = chartData[0].category
const lastYear = latestYear.category

const chartConfig = {
  ad_valorem_excise_duties: {
    label: "Ad valorem excise duties",
    color: "var(--chart-1)"
  },
  fuel_levy: {
    label: "Fuel levy",
    color: "var(--chart-2)"
  },
  customs_duties: {
    label: "Custom duties",
    color: "var(--chart-3)"
  },
} satisfies ChartConfig

export function OtherInterestingRevenueBreakdownChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <span className="flex">
            Other Interesting Revenue Breakdown
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

