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
import { taxesOnGoodsOrPermissionToUseRevenueBreakdown } from '@/data/parsed/detailed-revenue-breakdown.json'

const numberOfYears = 10
const chartData = taxesOnGoodsOrPermissionToUseRevenueBreakdown.slice(numberOfYears * -1)
const latestYear = chartData[chartData.length - 1]
const firstYear = chartData[0].category
const lastYear = latestYear.category

const chartConfig = {
  air_departure_tax: {
    label: "Air departure tax",
    color: "var(--chart-1)"
  },
  plastic_bag_levy: {
    label: "Plastic bag levy",
    color: "var(--chart-2)"
  },
  electricity_levy: {
    label: "Electricity levy",
    color: "var(--chart-3)"
  },
  incandescent_light_bulb_levy: {
    label: "Incandescent light bulb levy",
    color: "var(--chart-4)"
  },
  co2_tax___motor_vehicle_emissions: {
    label: "CO2 tax motor vehicle emissions",
    color: "var(--chart-5)"
  },
  tyre_levy: {
    label: "Tyre levy",
    color: "var(--chart-6)"
  },
  international_oil_pollution_compensation_fund: {
    label: "International oil pollution compensation fund",
    color: "var(--chart-7)"
  },
  carbon_tax: {
    label: "Carbon tax",
    color: "var(--chart-8)"
  },
  turnover_tax_for_micro_businesses: {
    label: "Turnover tax forf micro businesses",
    color: "var(--chart-8)"
  },
} satisfies ChartConfig

export function TaxesOnGoodsOrPermissionToUseRevenueBreakdownChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <span className="flex">
            Taxes On Goods Or Permission To Use Revenue Breakdown
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

