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
import jsonData from '@/data/parsed/expense-breakdown.json'
import { formatTotalTooltip } from "./tooltips/total-tooltip"
import { useEffect, useState } from "react"

//const numberOfYears = 10
//const topN = 5
//const chartData = jsonData.slice(numberOfYears - 1)
//const sortedKeys = Object.entries(chartData[chartData.length - 1]).sort(([, a], [, b]) => Number(b) - Number(a)).map(([key]) => key).slice(0, topN)
//const latestYear = chartData[chartData.length - 1]
//const firstYear = chartData[0].category
//const lastYear = latestYear.category

const chartConfig = {
  compensation_of_employees: {
    label: "Compensation of employees",
    color: "var(--chart-1)"
  },
  goods_and_services: {
    label: "Goods and services",
    color: "var(--chart-2)"
  },
  interest_and_rent_on_land: {
    label: "Interest and rent on land",
    color: "var(--chart-3)"
  },
  municipalities: {
    label: "Municipalities",
    color: "var(--chart-4)"
  },
  departmental_agencies_and_accounts: {
    label: "Departmental agencies and accounts",
    color: "var(--chart-5)"
  },
  higher_education_institutions: {
    label: "Higher education institutions",
    color: "var(--chart-6)"
  },
  foreign_governments_and_international_organisations: {
    label: "Foreign governments and international organisations",
    color: "var(--chart-7)"
  },
  public_corporations: {
    label: "Public corporations",
    color: "var(--chart-8)"
  },
  private_enterprises: {
    label: "Private enterprises",
    color: "var(--chart-8)"
  },
  non_profit_institutions: {
    label: "Non profit institutions",
    color: "var(--chart-9)"
  },
  social_benefits: {
    label: "Social benefits",
    color: "var(--chart-10)"
  },
  other_transfers_to_households: {
    label: "Other transfers to households",
    color: "var(--chart-11)"
  },
  buildings: {
    label: "Buildings",
    color: "var(--chart-12)"
  },
  other_fixed_structures: {
    label: "Other fixed structures",
    color: "var(--chart-13)"
  },
  transport_equipment: {
    label: "Transport equipment",
    color: "var(--chart-14)"
  },
  other_machinery_and_equipment: {
    label: "Other machinery and equipment",
    color: "var(--chart-15)"
  },
  land_and_sub_soil_assets: {
    label: "Land and sub soil assets",
    color: "var(--chart-16)"
  },
  software_and_other_intangible_assets: {
    label: "Software and other intangible assets",
    color: "var(--chart-17)"
  },
  other_assets: {
    label: "Other assets",
    color: "var(--chart-18)"
  },
  payments_for_financial_assets: {
    label: "Payments for financial assets",
    color: "var(--chart-19)"
  },
  contingency_reserve: {
    label: "Contingency reserve",
    color: "var(--chart-20)"
  },
  total_consolidated_expenditure: {
    label: "Total consolidated expenditure",
    color: "var(--chart-21)"
  },
} satisfies ChartConfig

type ExpenseBreakdownChartProps = {
  years: number,
  topN: number
}

type ChartData = {
  category: string;
  compensation_of_employees: number;
  goods_and_services: number;
  interest_and_rent_on_land: number;
  municipalities: number;
  departmental_agencies_and_accounts: number;
  higher_education_institutions: number;
  foreign_governments_and_international_organisations: number;
  public_corporations: number;
  private_enterprises: number;
  non_profit_institutions: number;
  social_benefits: number;
  other_transfers_to_households: number;
  buildings: number;
  other_fixed_structures: number;
  transport_equipment: number;
  other_machinery_and_equipment: number;
  land_and_sub_soil_assets: number;
  software_and_other_intangible_assets: number;
  other_assets: number;
  payments_for_financial_assets: number;
  contingency_reserve: number;
}

export function ExpenseBreakdownChart({
  years,
  topN
}: ExpenseBreakdownChartProps) {
  const [data, setData] = useState<ChartData[]>([])
  const [keys, setKeys] = useState<string[]>([])

  const [firstYear, setFirstYear] = useState('')
  const [lastYear, setLastYear] = useState('')

  useEffect(() => {
    const parsedData = jsonData.slice(years * -1)
    const sortedKeys = Object.entries(parsedData[parsedData.length - 1]).sort(([, a], [, b]) => Number(b) - Number(a)).map(([key]) => key).slice(0, topN)

    setData(parsedData)
    setKeys(sortedKeys)
    setFirstYear(parsedData[0].category)
    setLastYear(parsedData[parsedData.length - 1].category)
  }, [years, topN])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Expenses Breakdown (Top {topN})</CardTitle>
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

            {keys.map((key) => (
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

