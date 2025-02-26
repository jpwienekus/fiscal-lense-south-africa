import { Pie, PieChart } from "recharts"
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
import { exciseDutyRevenueBreakdown } from '@/data/parsed/detailed-revenue-breakdown.json'
import { useEffect, useState } from "react"
import { formatNumber } from "../tooltips/format-number"

const chartConfig = {
  sorghum_beer_and_sorghum_flour: {
    label: "Sorghum beer and sorghum flour",
    color: "var(--chart-1)"
  },
  beer: {
    label: "Beer",
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
    label: "Petroleum products",
    color: "var(--chart-7)"
  },
  revenue_from_neighbouring_countries: {
    label: "Revenue from neighbouring countries",
    color: "var(--chart-8)"
  },
} satisfies ChartConfig

type ChartData = {
  category: string;
  beer: number;
  sorghum_beer_and_sorghum_flour: number;
  wine_and_other_fermented_beverages: number;
  spirits: number;
  cigarettes_and_cigarette_tobacco: number;
  pipe_tobacco_and_cigars: number;
  petroleum_products: number;
  revenue_from_neighbouring_countries: number;
}

type ExciseDutyRevenutBreakdownChartProps = {
  dataSourcedYear: string,
  selectedYear: string
}

type MappedChartData = {
  category: string;
  total: number;
  fill: string;
}

export function ExciseDutyRevenueBreakdownChart({
  dataSourcedYear,
  selectedYear,
}: ExciseDutyRevenutBreakdownChartProps) {
  const [data, setData] = useState<MappedChartData[]>([])

  useEffect(() => {
    const currentYear = exciseDutyRevenueBreakdown.find(e => e.category === selectedYear)

    if (!currentYear) {
      setData([])
      return
    }

    const mapped = Object.keys(currentYear).slice(1)
      .map(e => {
        return {
          category: e,
          total: Number((+currentYear[e as keyof ChartData])),
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
            Excise Duty Revenue Breakdown
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
          Compiled from table 3 of the national budget speech timeseries data ({dataSourcedYear})
        </CardDescription>
      </CardFooter>
    </Card>
  )
}

