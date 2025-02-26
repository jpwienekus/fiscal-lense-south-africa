import { ExciseDutyRevenueBreakdownChart } from "../charts/national-revenue/excise-revenue-breakdown"
import { NonTaxRevenueBreakdownChart } from "../charts/national-revenue/non-tax-revenue-breakdown"
import { RevenueBreakdownChart } from "../charts/national-revenue/revenue-breakdown-additional"
import { TaxRevenueBreakdownChart } from "../charts/national-revenue/tax-revenue-breakdown"
import { VatRevenueBreakdownChart } from "../charts/national-revenue/vat-revenue-breakdown"
import { TaxesOnGoodsOrPermissionToUseRevenueBreakdownChart } from "../charts/national-revenue/taxes-on-goods-or-permission-to-use-revenue-breakdown"
import { TabsContent } from "../ui/tabs"

type NationalOverviewTabProps = {
  selectedYear: string
}

export const NationalRevenueTab = ({
  selectedYear
}: NationalOverviewTabProps) => {
  const dataSourcedYear = '2024'

  return (
    <TabsContent value="revenue" className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueBreakdownChart dataSourcedYear={dataSourcedYear} selectedYear={selectedYear} years={10} topN={5}/>
        <TaxRevenueBreakdownChart dataSourcedYear={dataSourcedYear} selectedYear={selectedYear} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <NonTaxRevenueBreakdownChart dataSourcedYear={dataSourcedYear} selectedYear={selectedYear} />
        <VatRevenueBreakdownChart dataSourcedYear={dataSourcedYear} selectedYear={selectedYear} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ExciseDutyRevenueBreakdownChart dataSourcedYear={dataSourcedYear} selectedYear={selectedYear} />
        <TaxesOnGoodsOrPermissionToUseRevenueBreakdownChart dataSourcedYear={dataSourcedYear} selectedYear={selectedYear} />
      </div>
    </TabsContent>
  )
}
