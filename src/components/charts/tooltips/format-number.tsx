import { ValueType } from "recharts/types/component/DefaultTooltipContent"

const currencySymbol = 'R'
const formatter = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  compactDisplay: 'long',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})


export const formatNumber = (value: ValueType) => {
  return (
    <div>
      <span className="font-normal text-muted-foreground">
        {currencySymbol}
      </span>&nbsp;
      {formatter.format(value as number)}
    </div>
  )
}
