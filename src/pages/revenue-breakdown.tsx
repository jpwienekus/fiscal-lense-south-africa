import { ExciseDutyRevenueBreakdownChart } from '@/components/charts/excise-revenue-breakdown'
import { NonTaxRevenueBreakdownChart } from '@/components/charts/non-tax-revenue-breakdown'
import { OtherInterestingRevenueBreakdownChart } from '@/components/charts/other-interesting-revenue-breakdown'
import { RevenueBreakdownChart } from '@/components/charts/revenue-breakdown-additional'
import { TaxRevenueBreakdownChart } from '@/components/charts/tax-revenue-breakdown'
import { TaxesOnGoodsOrPermissionToUseRevenueBreakdownChart } from '@/components/charts/taxes-on-goods-or-permission-to-use-revenue-breakdown copy'
import { VatRevenueBreakdownChart } from '@/components/charts/vat-revenue-breakdown'

export function RevenueBreakdown() {
  return (
    <div className="container flex-1 py-1">
      <div className="grid grid-cols-2 gap-4">
        <RevenueBreakdownChart />
        <TaxRevenueBreakdownChart />
        <NonTaxRevenueBreakdownChart />
        <VatRevenueBreakdownChart />
        <ExciseDutyRevenueBreakdownChart />
        <TaxesOnGoodsOrPermissionToUseRevenueBreakdownChart />
        <OtherInterestingRevenueBreakdownChart />
      </div>
    </div>
  )
}
