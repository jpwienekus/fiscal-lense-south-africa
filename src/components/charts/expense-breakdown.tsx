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
import jsonData from '@/data/parsed/expenses-breakdown.json'

const chartData = jsonData

const chartConfig = {
  compensation_of_employees: {
    label: "Compensation of employees",
  },
  goods_and_services: {
    label: "Goods and services",
  },
  interest_and_rent_on_land: {
    label: "Interest and rent on land",
  },
  provinces_and_municipalities: {
    label: "Provinces and municipalities",
  },
  departmental_agencies_and_accounts: {
    label: "Departmental agencies and accounts",
  },
  higher_education_institutions: {
    label: "Higher education institutions",
  },
  foreign_governments_and_international_organisations: {
    label: "Foreign governments and international organisations",
  },
  public_corporations_and_private_enterprises: {
    label: "Public corporations and private enterprises",
  },
  non_profit_institutions: {
    label: "Non-profit institutions",
  },
  households: {
    label: "Households",
  },
  buildings_and_other_fixed_structures: {
    label: "Buildings and other fixed structures",
  },
  machinery_and_equipment: {
    label: "Machinery and equipment",
  },
  heritage_assets: {
    label: "Heritage assets",
  },
  specialised_military_assets: {
    label: "Specialised military assets",
  },
  biological_assets: {
    label: "Biological assets",
  },
  land_and_sub_soil_assets: {
    label: "Land and sub-soil assets",
  },
  software_and_other_intangible_assets: {
    label: "Software and other intangible assets",
  },
  payments_for_financial_assets: {
    label: "Payments for financial assets",
  },
} satisfies ChartConfig

// function CustomTooltipContent({ payload, label, active }) {
//   if (!active || !payload) {
//     return null
//   }

//   return (
//     <div className="flex flex-col space-y-2">
//       <div className="text-sm font-semibold">{label}</div>
//       {payload.map((item) => (
//         <div key={item.dataKey} className="flex items-center space-x-2">
//           <div
//             className="w-2 h-2 rounded-full"
//             style={{
//               backgroundColor: item.color,
//             }}
//           />
//           {item.value}
//         </div>
//       ))}
//     </div>
//   )
// }
// function CustomTooltip({active, payload}) {
//   if (!active || !payload) {
//     return null
//   }

//   return (
//     <ChartTooltip>
//       <ChartTooltipContent indicator="line">
//         {payload.map((item) => (
//           <div key={item.dataKey} className="flex items-center space-x-2">
//             <div
//               className="w-2 h-2 rounded-full"
//               style={{
//                 backgroundColor: item.color,
//               }}
//             />
//             {item.value}
//           </div>
//         ))}
//         </ChartTooltipContent>
//     </ChartTooltip>

//   )

// }

export function ExpenseBreakdownChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Multiple</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
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
              tickMargin={10}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={10}
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            {/* <ChartTooltip
              cursor={false}
              content={<CustomTooltipContent />}
            /> */}

            {Object.keys(chartConfig).map((key, index) => (
              <Line
                key={key}
                dataKey={key}
                type="natural"
                fill={`var(--chart-${index + 1})`}
                fillOpacity={0.4}
                stroke={`var(--chart-${index + 1})`}
              />
            ))}

            <ChartLegend content={<ChartLegendContent />} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

