import { ValueType } from "recharts/types/component/DefaultTooltipContent"

const currencySymbol = 'R'
const formatterTwoDec = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  compactDisplay: 'long',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})
const formatter = new Intl.NumberFormat('en-US', {
  notation: 'compact',
  compactDisplay: 'short',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
})

export const formatNumberBasic = (value: number) => {
  return `${currencySymbol} ${formatter.format(value)}`
}

export const formatNumberTwoDecimals = (value: number) => {
  return `${currencySymbol} ${formatterTwoDec.format(value)}`
}


export const formatNumber = (value: ValueType) => {
  return (
    <div>
      <span className="font-normal text-muted-foreground">
        {currencySymbol}
      </span>&nbsp;
      {formatterTwoDec.format(value as number)}
    </div>
  )
}
