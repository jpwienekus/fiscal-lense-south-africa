export const calculateDifferencePercentage = (cPosition: number, pPosition: number): number => {
  return (((cPosition - pPosition) / pPosition) * 100)
}

export const calculateGrowth = (current: number, previous: number): number => {
  return previous ? ((current / previous) - 1) * 100 : 0
}

