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
import jsonData from '@/data/parsed/revenue-breakdown.json'
import { formatTotalTooltip } from "./tooltips/total-tooltip"
import { Link } from "react-router-dom"
import { SquareArrowOutUpRight } from "lucide-react"
import { useEffect, useState } from "react"

const chartConfig = {
  tax_revenue__gross_: {
    label: "Tax revenue (gross)",
    color: "var(--chart-1)"
  },
  less__sacu_payments: {
    label: "Less: SACU payments",
    color: "var(--chart-2)"
  },
  other_adjustment: {
    label: "Other adjustment",
    color: "var(--chart-3)"
  },
  non_tax_revenue__departmental_receipts_: {
    label: "Non-tax revenue (departmental receipts)",
    color: "var(--chart-4)"
  },
  financial_transactions_in_assets_and_liabilities: {
    label: "Financial transactions in assets and liabilities",
    color: "var(--chart-5)"
  },
  sales_of_capital_assets: {
    label: "Sales of capital assets",
    color: "var(--chart-6)"
  },
} satisfies ChartConfig

type RevenueBreakdownChartProps = {
  years: number,
  topN: number
}

type ChartData = {
    category: string;
    tax_revenue__gross_: number;
    less__sacu_payments: number;
    other_adjustment: number;
    non_tax_revenue__departmental_receipts_: number;
    financial_transactions_in_assets_and_liabilities: number;
    sales_of_capital_assets: number;
}

export function RevenueBreakdownChart({
  years,
  topN
}: RevenueBreakdownChartProps) {
  const [data, setData] = useState<ChartData[]>([])
  const [firstYear, setFirstYear] = useState('')
  const [lastYear, setLastYear] = useState('')

  useEffect(() => {
    const parsedData = jsonData.slice(years * -1)
    setData(parsedData)
    setFirstYear(parsedData[0].category)
    setLastYear(parsedData[parsedData.length - 1].category)
  }, [years])

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <span className="flex">
            Revenue Breakdown
            <Link to="/national-revenue-breakdown">
              <SquareArrowOutUpRight className="px-1" height={10}/>
            </Link>
          </span>
        </CardTitle>
        <CardDescription>{firstYear} - {lastYear}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
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

