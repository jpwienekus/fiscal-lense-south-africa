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
import { taxesOnGoodsOrPermissionToUseRevenueBreakdown } from '@/data/parsed/detailed-revenue-breakdown.json'
import { useEffect, useState } from "react"
import { formatNumber } from "../tooltips/format-number"

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

type ChartData = {
  category: string;
  air_departure_tax: number;
  plastic_bag_levy: number;
  electricity_levy: number;
  incandescent_light_bulb_levy: number;
  co2_tax___motor_vehicle_emissions: number;
  tyre_levy: number;
  international_oil_pollution_compensation_fund: number;
  carbon_tax: number;
  turnover_tax_for_micro_businesses: number;
}

type TaxesOnGoodsOrPermissionToUseRevenueBreakdownChartProps = {
  dataSourcedYear: string,
  selectedYear: string
}

type MappedChartData = {
  category: string;
  total: number;
  fill: string;
}

export function TaxesOnGoodsOrPermissionToUseRevenueBreakdownChart({
  dataSourcedYear,
  selectedYear,
}: TaxesOnGoodsOrPermissionToUseRevenueBreakdownChartProps) {
  const [data, setData] = useState<MappedChartData[]>([])

  useEffect(() => {
    const currentYear = taxesOnGoodsOrPermissionToUseRevenueBreakdown.find(e => e.category === selectedYear)

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
            Taxes On Goods Or Permission To Use Revenue Breakdown
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

