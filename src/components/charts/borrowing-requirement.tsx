import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from "recharts"
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
import jsonData from '@/data/parsed/borrowing-requirement.json'
import { formatTotalTooltip } from "./tooltips/total-tooltip"

const numberOfYears = -10

const chartData = jsonData.slice(numberOfYears)
const latestYear = chartData[chartData.length - 1]
const firstYear = chartData[0].category
const lastYear = latestYear.category

const chartConfig = {
  main_budget_balance: {
    label: "Main budget balance",
    color: "var(--chart-1)"
  },
  domestic_long_term_loans: {
    label: "Domestic long term loans",
    color: "var(--chart-2)"
  },
  foreign_loans: {
    label: "Foreign loans",
    color: "var(--chart-3)"
  },
  eskom_debt_relief_arrangement: {
    label: "Eskom debt relief arrancement",
    color: "var(--chart-4)"
  },
  gfecra_settlement: {
    label: "GFECRA settlement",
    color: "var(--chart-5)"
  },
} satisfies ChartConfig

export function BorrowingRequirementChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gross Borrowing Requirement</CardTitle>
        <CardDescription>{firstYear} - {lastYear}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
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
              <Bar
                key={key}
                dataKey={key}
                radius={4}
                fill={`var(--color-${key})`}
              />
            ))}

            <ChartLegend content={<ChartLegendContent className="flex flex-row justify-center items-center gap-4 pt-6"/>} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

