import { PieChart, Pie } from "recharts"
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
import jsonData from '@/data/parsed/expense-by-functional-classification.json'
import { useEffect, useState } from "react"
import { formatNumber } from "../tooltips/format-number"

const chartConfig = {
  general_public_services: {
    label: "General public services (including debt service cost)",
    color: "var(--chart-1)"
  },
  defence: {
    label: "Defence",
    color: "var(--chart-2)"
  },
  economic_affairs: {
    label: "Economic affairs",
    color: "var(--chart-3)"
  },
  environmental_protection: {
    label: "Environmental protection",
    color: "var(--chart-4)"
  },
  housing_and_community_amenities: {
    label: "Housing and community amenities",
    color: "var(--chart-5)"
  },
  health: {
    label: "Health",
    color: "var(--chart-6)"
  },
  recreation_and_culture: {
    label: "Recreation and culture",
    color: "var(--chart-7)"
  },
  education: {
    label: "Education",
    color: "var(--chart-8)"
  },
  social_protection: {
    label: "Social protection",
    color: "var(--chart-9)"
  },
  contingency_reserve: {
    label: "Contingency reserve",
    color: "var(--chart-10)"
  },
} satisfies ChartConfig

type ExpenseByFunctionalClassificationChartProps = {
  dataSourcedYear: string,
  selectedYear: string
}

type ChartData = {
  category: string;
  general_public_services: number;
  defence: number;
  economic_affairs: number;
  environmental_protection: number;
  housing_and_community_amenities: number;
  health: number;
  recreation_and_culture: number;
  education: number;
  social_protection: number;
  contingency_reserve: number;
}

type MappedChartData = {
  category: string;
  total: number;
  fill: string;
}

export function ExpenseByFunctionalClassificationChart({
  dataSourcedYear,
  selectedYear,
}: ExpenseByFunctionalClassificationChartProps) {
  const [data, setData] = useState<MappedChartData[]>([])

  useEffect(() => {
    const currentYear = jsonData.find(e => e.category === selectedYear)

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
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Consolidated Expenses By Functional Classification</CardTitle>
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
          Data source: South african National Treasury (Table 8 - {dataSourcedYear})
        </CardDescription>
      </CardFooter>
    </Card>
  )
}

