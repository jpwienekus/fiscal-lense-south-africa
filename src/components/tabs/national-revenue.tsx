import { ExciseDutyRevenueBreakdownChart } from "../charts/excise-revenue-breakdown"
import { RevenueExpensesChart } from "../charts/national-overview/revenue-expenses"
import { NonTaxRevenueBreakdownChart } from "../charts/national-revenue/non-tax-revenue-breakdown"
import { TaxRevenueBreakdownChart } from "../charts/national-revenue/tax-revenue-breakdown"
import { VatRevenueBreakdownChart } from "../charts/national-revenue/vat-revenue-breakdown"
import { OtherInterestingRevenueBreakdownChart } from "../charts/other-interesting-revenue-breakdown"
import { TaxesOnGoodsOrPermissionToUseRevenueBreakdownChart } from "../charts/taxes-on-goods-or-permission-to-use-revenue-breakdown copy"
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
        <RevenueExpensesChart dataSourcedYear={dataSourcedYear} selectedYear={selectedYear} years={10} topN={5} />
        <TaxRevenueBreakdownChart dataSourcedYear={dataSourcedYear} selectedYear={selectedYear} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <NonTaxRevenueBreakdownChart dataSourcedYear={dataSourcedYear} selectedYear={selectedYear} />
        <VatRevenueBreakdownChart dataSourcedYear={dataSourcedYear} selectedYear={selectedYear} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ExciseDutyRevenueBreakdownChart />
        <TaxesOnGoodsOrPermissionToUseRevenueBreakdownChart />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OtherInterestingRevenueBreakdownChart />
      </div>
    </TabsContent>
  )
}
