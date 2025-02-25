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
import { taxRevenueBreakdown } from '@/data/parsed/detailed-revenue-breakdown.json'
import { useEffect, useState } from "react"
import { formatNumber, formatNumberBasic } from "@/components/charts/tooltips/format-number"

type TaxRevenueBreakdownChartProps = {
  dataSourcedYear: string,
  selectedYear: string
}

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
    label: "Other taxes",
    color: "var(--chart-6)"
  },
  state_miscellaneous_revenue: {
    label: "State miscellaneous revenue",
    color: "var(--chart-7)"
  },
} satisfies ChartConfig

type MappedChartData = {
  category: string;
  value: number;
  fill: string;
}

export const TaxRevenueBreakdownChart = ({
  dataSourcedYear,
  selectedYear
}: TaxRevenueBreakdownChartProps) => {
  const [data, setData] = useState<MappedChartData[]>([])

  useEffect(() => {
    const currentYear = taxRevenueBreakdown.find(e => e.category === selectedYear)

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
            Tax Revenue
          </span>
        </CardTitle>
        <CardDescription>Tax revenue sources</CardDescription>
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
                chartConfig[value as keyof typeof chartConfig]?.label.substring(0, 10) + '...'
              }
            />
            <YAxis
              axisLine={false}
              tickMargin={10}
              tickFormatter={formatNumberBasic}
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

