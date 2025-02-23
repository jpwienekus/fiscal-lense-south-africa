import React from 'react'
import { NameType, ValueType, Payload } from "recharts/types/component/DefaultTooltipContent"
import {
  ChartConfig,
} from "@/components/ui/chart"

const currencySymbol = 'R'
const textLength = 20

const formatText = (text: string | undefined) => {
  if (!text) {
    return ''
  }

  if (text.length > textLength) {
    text = text.substring(0, textLength) + '...'
  }

  return text
}

const formatNumber = (value: number) => {
  const formatter = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'long',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })

  return formatter.format(value * 1000000)
}

export const formatTotalTooltip = (value: ValueType, name: NameType, item: Payload<ValueType, NameType>, index: number, chartConfig: ChartConfig, showTotal = false) => {
  return (
    <>
      <div
        className="h-2.5 w-2.5 shrink-0 rounded-[2px] bg-[--color-bg]"
        style={
          {
            "background-color": `var(--color-${name})`,
          } as React.CSSProperties
        }
      />
      <span className="truncate">
        {formatText(chartConfig[name as keyof typeof chartConfig]?.label?.toString() ||
          name.toString())}
      </span>
      <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
        <span className="font-normal text-muted-foreground">
          {currencySymbol}
        </span>
        {formatNumber(+value)}
      </div>

      {showTotal && index === 1 && (
        <div className="mt-1.5 flex basis-full items-center border-t pt-1.5 text-xs font-medium text-foreground">
          Total
          <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
            <span className="font-normal text-muted-foreground">
              {currencySymbol}
            </span>
            {formatNumber((item.payload.revenue - item.payload.expenses))}
          </div>
        </div>
      )}
    </>
  )
}
