import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type FilterBarProps = {
  selectedYears: number,
  selectedTopN: number,
  onYearChange: (value: string) => void
  onTopNChange: (value: string) => void
}

export const FilterBar = ({
  selectedYears,
  selectedTopN,
  onYearChange,
  onTopNChange
}: FilterBarProps) => {
  const yearOptions = [1, 5, 10, 15]
  const topNOptions = [5, 10, -1]
  return (
    <div className="py-3">
      <Card>
        <CardContent>
          <div className="w-full bd-white">
            <div className="max-w-6xl flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Last</span>
                <Select value={selectedYears.toString()} onValueChange={onYearChange}>
                  <SelectTrigger className="w-50">
                    <SelectValue placeholder="Select years" />
                  </SelectTrigger>
                  <SelectContent>
                    {yearOptions.map(year => (
                      <SelectItem key={year} value={year.toString()}>{year === 1 ? 'year' : year.toString() + ' years'}</SelectItem>
                    ))}
                  </SelectContent>

                </Select>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Top</span>
                <Select value={selectedTopN.toString()} onValueChange={onTopNChange}>
                  <SelectTrigger className="w-50">
                    <SelectValue placeholder="Select top" />
                  </SelectTrigger>
                  <SelectContent>
                    {topNOptions.map(n => (
                      <SelectItem key={n} value={n.toString()}> {n === -1 ? 'All' : n.toString()} </SelectItem>
                    ))}
                  </SelectContent>

                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

