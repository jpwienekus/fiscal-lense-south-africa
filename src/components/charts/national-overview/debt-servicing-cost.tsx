import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from "recharts"
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
import jsonData from '@/data/parsed/debt-service-cost.json'
import { formatTotalTooltip } from "@/components/charts/tooltips/total-tooltip"
import { useEffect, useState } from "react"
import { formatNumberBasic } from "../tooltips/format-number"

const chartConfig = {
  of_which__debt_service_costs: {
    label: "Main budget balance",
    color: "var(--chart-1)"
  },
} satisfies ChartConfig

type BorrowingRequirementChartProps = {
  dataSourcedYear: string,
  selectedYear: string
  years: number,
  topN: number
}

type ChartData = {
  category: string;
  of_which__debt_service_costs: number;
}

export function DebtServiceCost({
  dataSourcedYear,
  selectedYear,
  years,
}: BorrowingRequirementChartProps) {
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
        <CardTitle>Debt Servicing Cost</CardTitle>
        <CardDescription>Annual debt servicing cost</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={data}
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
              tickLine={false}
            <YAxis
              axisLine={false}
              tickMargin={10}
              tickFormatter={formatNumberBasic}
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

            <ChartLegend content={<ChartLegendContent className="flex flex-row justify-center items-center gap-4 pt-6" />} />
          </BarChart>
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

