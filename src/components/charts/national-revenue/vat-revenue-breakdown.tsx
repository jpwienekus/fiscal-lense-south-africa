import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
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
import { vatRevenueBreakdown } from '@/data/parsed/detailed-revenue-breakdown.json'
import { useEffect, useState } from "react"
import { formatNumber } from "@/components/charts/tooltips/format-number"

const chartConfig = {
  domestic_vat: {
    label: "Domestic",
    color: "var(--chart-1)"
  },
  import_vat: {
    label: "Import",
    color: "var(--chart-2)"
  },
  refunds: {
    label: "Refunds",
    color: "var(--chart-3)"
  },
} satisfies ChartConfig

type MappedChartData = {
  category: string;
  value: number;
  fill: string;
}

type VatRevenueBreakdownChartProps = {
  dataSourcedYear: string,
  selectedYear: string
}

export function VatRevenueBreakdownChart({
  dataSourcedYear,
  selectedYear
}: VatRevenueBreakdownChartProps) {
  const [data, setData] = useState<MappedChartData[]>([])

  useEffect(() => {
    const currentYear = vatRevenueBreakdown.find(e => e.category === selectedYear)

    if (!currentYear) {
      setData([])
      return
    }

    const keysToSum = Object.keys(currentYear).slice(1)

    const mapped = keysToSum.map(e => {
      const chartKey = e as keyof typeof chartConfig;
      return {
        category: e,
        value: currentYear[chartKey],
        fill: `var(--color-${e})`
      }
    })

    setData(mapped)
  }, [selectedYear])
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <span className="flex">
            VAT
          </span>
        </CardTitle>
        <CardDescription>Revenue generated through VAT</CardDescription>
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
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <YAxis
              tickCount={10}
              tickLine={false}
              axisLine={false}
              tickMargin={10}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideLabel
                  formatter={formatNumber}
                />}
            />

            <Bar
              key="value"
              dataKey="value"
            />
            <ChartLegend content={<ChartLegendContent className="flex flex-row justify-center items-center gap-4 pt-6" />} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <CardDescription>
          Compiled from table 3 of the national budget speech timeseries data ({dataSourcedYear})
        </CardDescription>
      </CardFooter>
    </Card>
  )
}

