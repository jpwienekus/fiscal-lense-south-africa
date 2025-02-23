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
import { exciseDutyRevenueBreakdown } from '@/data/parsed/detailed-revenue-breakdown.json'

const numberOfYears = 10
const chartData = exciseDutyRevenueBreakdown.slice(numberOfYears * -1)
const latestYear = chartData[chartData.length - 1]
const firstYear = chartData[0].category
const lastYear = latestYear.category

const chartConfig = {
  beer: {
    label: "Beer",
    color: "var(--chart-1)"
  },
  sorghum_beer_and_sorghum_flour: {
    label: "Sorghum beer and sorghum flour",
    color: "var(--chart-2)"
  },
  wine_and_other_fermented_beverages: {
    label: "Wine and other fermented beverages",
    color: "var(--chart-3)"
  },
  spirits: {
    label: "Spirits",
    color: "var(--chart-4)"
  },
  cigarettes_and_cigarette_tobacco: {
    label: "Cigarettes and cigarette tobacco",
    color: "var(--chart-5)"
  },
  pipe_tobacco_and_cigars: {
    label: "Pipe tobacco and cigars",
    color: "var(--chart-6)"
  },
  petroleum_products: {
    label: "Petroleum producst",
    color: "var(--chart-7)"
  },
  revenue_from_neighbouring_countries: {
    label: "Revenue from neighbouring countries",
    color: "var(--chart-8)"
  },
} satisfies ChartConfig

export function ExciseDutyRevenueBreakdownChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <span className="flex">
            Excise Duty Revenue Breakdown
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

