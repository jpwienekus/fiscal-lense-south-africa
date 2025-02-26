import { ExciseDutyRevenueBreakdownChart } from "../charts/national-revenue/excise-revenue-breakdown"
import { NonTaxRevenueBreakdownChart } from "../charts/national-revenue/non-tax-revenue-breakdown"
import { RevenueBreakdownChart } from "../charts/national-revenue/revenue-breakdown-additional"
import { TaxRevenueBreakdownChart } from "../charts/national-revenue/tax-revenue-breakdown"
import { VatRevenueBreakdownChart } from "../charts/national-revenue/vat-revenue-breakdown"
import { TaxesOnGoodsOrPermissionToUseRevenueBreakdownChart } from "../charts/national-revenue/taxes-on-goods-or-permission-to-use-revenue-breakdown"
import { TabsContent } from "../ui/tabs"
import { TaxRevenueKpi } from "@/components/kpi-cards/revenue/national/tax-revenue"
import { IncomeTaxShareKpi } from "../kpi-cards/revenue/national/income-tax-share"
import { DomesticVatKpi } from "../kpi-cards/revenue/national/domestic-vat"
import { YoyGrowthKpi } from "../kpi-cards/revenue/national/yoy-growth"

type NationalOverviewTabProps = {
  selectedYear: string
}

export const NationalRevenueTab = ({
  selectedYear
}: NationalOverviewTabProps) => {
  const dataSourcedYear = '2024'

  return (
    <TabsContent value="revenue" className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <TaxRevenueKpi selectedYear={selectedYear} />
        <IncomeTaxShareKpi selectedYear={selectedYear} />
        <DomesticVatKpi selectedYear={selectedYear} />
        <YoyGrowthKpi selectedYear={selectedYear} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueBreakdownChart dataSourcedYear={dataSourcedYear} selectedYear={selectedYear} years={10} topN={5} />
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
