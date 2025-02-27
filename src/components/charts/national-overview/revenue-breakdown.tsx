import { CartesianGrid, Line, LineChart, Pie, PieChart, XAxis, YAxis } from "recharts"
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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useEffect, useState } from "react"
import { formatNumber } from "../tooltips/format-number"
import { taxRevenueBreakdown } from '@/data/parsed/detailed-revenue-breakdown.json'

const chartConfig = {
  taxes_on_income_and_profits: {
    label: "Income and profits",
    color: "var(--chart-1)"
  },
  taxes_on_payroll_and_workforce: {
    label: "Payroll and workforce",
    color: "var(--chart-2)"
  },
  taxes_on_property: {
    label: "Property",
    color: "var(--chart-3)"
  },
  domestic_taxes_on_goods_and_services: {
    label: "Goods and services",
    color: "var(--chart-4)"
  },
  taxes_on_international_trade_and_transactions: {
    label: "International trade and transactions",
    color: "var(--chart-5)"
  },
  other_taxes: {
    label: "Other",
    color: "var(--chart-6)"
  },
  state_miscellaneous_revenue: {
    label: "State miscellaneous revenue",
    color: "var(--chart-7)"
  },
} satisfies ChartConfig

type RevenueBreakdownChartProps = {
  dataSourcedYear: string,
  selectedYear: string,
  years: number,
  topN: number
}

type ChartData = {
    category: string;
    taxes_on_income_and_profits: number;
    taxes_on_payroll_and_workforce: number;
    taxes_on_property: number;
    domestic_taxes_on_goods_and_services: number;
    taxes_on_international_trade_and_transactions: number;
    other_taxes: number;
    state_miscellaneous_revenue: number;
}

type MappedChartData = {
  category: string;
  total: number;
  fill: string;
}

export function RevenueBreakdownChart({
  dataSourcedYear,
  selectedYear,
  years,
}: RevenueBreakdownChartProps) {
  const [data, setData] = useState<MappedChartData[]>([])

  useEffect(() => {
    const currentYear = taxRevenueBreakdown.find(e => e.category === selectedYear)

    if (!currentYear) {
      setData([])
      return
    }

    const mapped = Object.keys(currentYear).filter(e => e !== 'state_miscellaneous_revenue').slice(1)
      .map(e => {
        return {
          category: e,
          total: Number((+currentYear[e as keyof ChartData])),
          fill: `var(--color-${e})`
        }
      })

    setData(mapped)
  }, [selectedYear, years])

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <span className="flex">
            Tax Revenue Sources
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideLabel
                  formatter={formatNumber}
                />}
            />
            <Pie
              data={data}
              dataKey="total"
              nameKey="category"
              innerRadius={80}
              label={({ name, percent }) => {
                const chartKey = name as keyof typeof chartConfig;
                return `${chartConfig[chartKey].label}: ${(percent * 100).toFixed(2)}%`
              }}
            >
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <CardDescription>
          Data source: South african National Treasury (Table 3 - {dataSourcedYear})
        </CardDescription>
      </CardFooter>
    </Card>
  )
}

