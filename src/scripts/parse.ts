import { createReadStream, existsSync, writeFile } from 'fs';
import { createInterface } from 'readline';

async function main() {
  const summaryParser = new SummaryParser()
  // From T1 on National Treasurey website -> Budget time series data
  const summary = await summaryParser.parse('src/data/raw/summary.csv')

  const expenseBreakdownParser = new ExpenseBreakdownParser()
  // From T5 on National Treasurey website -> Budget time series data
  const expense = await expenseBreakdownParser.parse('src/data/raw/expense-breakdown.csv')

  const revenueBreakdownParser = new RevenueBreakdownParser()
  // From T3 on National Treasurey website -> Budget time series data
  const revenue = await revenueBreakdownParser.parse('src/data/raw/revenue-breakdown.csv')
  const detailedRevenueBreakdown = {
    revenueBreakdown: formatExpenseBreakdown(revenue.headers, revenue.revenueBreakdown, 1000),
    taxRevenueBreakdown: formatExpenseBreakdown(revenue.headers, revenue.taxRevenueBreakdown, 1000),
    nonTaxRevenueBreakdown: formatExpenseBreakdown(revenue.headers, revenue.nonTaxRevenueBreakdown, 1000),
    vatRevenueBreakdown: formatExpenseBreakdown(revenue.headers, revenue.vatRevenueBreakdown, 1000),
    exciseDutyRevenueBreakdown: formatExpenseBreakdown(revenue.headers, revenue.exciseDutyRevenueBreakdown, 1000),
    taxesOnGoodsOrPermissionToUseRevenueBreakdown: formatExpenseBreakdown(revenue.headers, revenue.taxesOnGoodsOrPermissionToUseRevenueBreakdown, 1000),
    otherInterestingRevenueBreakdown: formatExpenseBreakdown(revenue.headers, revenue.otherInterestingRevenueBreakdown, 1000),
  }

  const consolidatedExpenditurebyFunctionalClassificationParser = new ExpensesByFunctionalClassificationParser()
  // From T8 on National Treasurey website -> Budget time series data
  const consolidatedExpenditurebyFunctionalClassification = await consolidatedExpenditurebyFunctionalClassificationParser.parse('src/data/raw/expense-by-functional-classification.csv')

  writeData('src/data/parsed/expense-breakdown-summary.json', formatExpenseBreakdown(summary.headers, summary.expenseBreakdown))
  writeData('src/data/parsed/revenue-expenses.json', formatRevenueAndExpenses(summary.headers, summary.totalRevenue, summary.totalExpense))
  writeData('src/data/parsed/borrowing-requirement.json', formatExpenseBreakdown(summary.headers, summary.borrowingRequirementBreakdown))
  writeData('src/data/parsed/revenue-breakdown.json', formatExpenseBreakdown(summary.headers, summary.revenueBreakdown))
  writeData('src/data/parsed/expense-breakdown.json', formatExpenseBreakdown(expense.headers, expense.expenseBreakdown))
  writeData('src/data/parsed/detailed-revenue-breakdown.json', detailedRevenueBreakdown)
  writeData('src/data/parsed/expense-by-functional-classification.json', formatExpenseBreakdown(consolidatedExpenditurebyFunctionalClassification.headers, consolidatedExpenditurebyFunctionalClassification.expense))
  writeData('src/data/parsed/debt-service-cost.json', formatExpenseBreakdown(consolidatedExpenditurebyFunctionalClassification.headers, consolidatedExpenditurebyFunctionalClassification.expense))
}

// Multiply by is used to normalize the values. Some sheets have it represented per million and some per thousand
function formatRevenueAndExpenses(years: string[], revenue: number[], expenses: number[], multiplyBy = 1000000): object[] {
  const data: object[] = []

  years.forEach((year, index) => {
    data.push({
      category: year,
      revenue: revenue[index] * multiplyBy,
      expenses: expenses[index] * multiplyBy,
    })
  })

  return data
}

function formatExpenseBreakdown(years: string[], expenses: { [key: string]: number[] }, multiplyBy = 1000000): object[] {
  const data: object[] = []
  console.log(444, years)
  years.forEach((year, index) => {
    const keys = Object.keys(expenses)
    const value: { [key: string]: string | number } = {
      category: year,
    }

    keys.forEach((key) => {
      value[key.toLowerCase().replace(/ /g, '_').replace(/-/g, '_')] = expenses[key][index] * multiplyBy
    })
    data.push(value)
  })
  return data
}

function writeData(fileName: string, data: object) {
  writeFile(fileName, JSON.stringify(data, null, 2), (error) => { console.log(error) })
}

abstract class BaseParser {
  delimiter = ','

  readFromFile(filePath: string) {
    if (!existsSync(filePath)) {
      throw new Error('File not found');
    }

    const fileStream = createReadStream(filePath)
    return createInterface({
      input: fileStream,
      crlfDelay: Infinity
    })
  }
}

export class SummaryParser extends BaseParser {

  async parse(filePath: string) {
    const readline = this.readFromFile(filePath)
    let lineNumber = 0
    let headers: string[] = []
    const revenueBreakdown: { [key: string]: number[] } = {}
    let totalRevenue: number[] = []

    const expenseBreakdown: { [key: string]: number[] } = {}
    let totalExpense: number[] = []

    const borrowingRequirementBreakdown: { [key: string]: number[] } = {}
    let totalBorrowingRequirement: number[] = []

    let debtServiceCostAsPercentageOfGDP: number[] = []
    let budgetBalanceAsPercentageOfGDP: number[] = []

    for await (const line of readline) {
      const parsedLine = line.split(this.delimiter)

      if (lineNumber === 0) {
        headers = parsedLine.splice(1)
      } else if ([3, 4, 5, 6, 7, 8].includes(lineNumber)) {
        revenueBreakdown[parsedLine[0].trim().toLowerCase().replace(/ /g, '_').replace(/-/g, '_').replace(/:/g, '_').replace(/\(/g, '_').replace(/\)/g, '_')] = parsedLine.splice(1).map(Number)
      } else if (lineNumber === 9) {
        totalRevenue = parsedLine.splice(1).map(Number)
      } else if ([11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 25].includes(lineNumber)) {
        expenseBreakdown[parsedLine[0].trim().toLowerCase().replace(/ /g, '_').replace(/-/g, '_').replace(/:/g, '_').replace(/\(/g, '_').replace(/\)/g, '_')] = parsedLine.splice(1).map(Number)
      } else if (lineNumber === 26) {
        totalExpense = parsedLine.splice(1).map(Number)
      } else if ([28, 31, 32, 33, 34].includes(lineNumber)) {
        borrowingRequirementBreakdown[parsedLine[0].trim().toLowerCase().replace(/ /g, '_').replace(/-/g, '_').replace(/:/g, '_').replace(/\(/g, '_').replace(/\)/g, '_')] = parsedLine.splice(1).map(e => Number(e) * -1)
      } else if (lineNumber === 35) {
        totalBorrowingRequirement = parsedLine.splice(1).map(Number)
      }
      else if (lineNumber === 27) {
        debtServiceCostAsPercentageOfGDP = parsedLine.splice(1).map(e => Number(e.replace('%', '')))
      } else if (lineNumber === 29) {
        budgetBalanceAsPercentageOfGDP = parsedLine.splice(1).map(e => Number(e.replace('%', '')))
      }


      lineNumber++
    }

    return {
      headers,
      revenueBreakdown,
      totalRevenue,
      expenseBreakdown,
      totalExpense,
      borrowingRequirementBreakdown,
      totalBorrowingRequirement,
      debtServiceCostAsPercentageOfGDP,
      budgetBalanceAsPercentageOfGDP
    }
  }
}

export class ExpenseBreakdownParser extends BaseParser {
  async parse(filePath: string) {
    if (!existsSync(filePath)) {
      throw new Error('File not found');
    }

    const fileStream = createReadStream(filePath)
    const readline = createInterface({
      input: fileStream,
      crlfDelay: Infinity
    })


    let lineNumber = 0
    let headers: string[] = []
    const expenseBreakdown: { [key: string]: number[] } = {}
    let totalExpenses: number[] = []

    for await (const line of readline) {
      const parsedLine = line.split(this.delimiter)

      if (lineNumber === 0) {
        headers = parsedLine.splice(1)
      } else if ([2, 3, 4, 6, 8, 9, 10, 12, 15, 18, 20, 21, 24, 25, 27, 28, 29, 30, 31, 32, 35].includes(lineNumber)) {
        expenseBreakdown[parsedLine[0].trim().toLowerCase().replace(/ /g, '_').replace(/-/g, '_').replace(/:/g, '_').replace(/\(/g, '_').replace(/\)/g, '_')] = parsedLine.splice(1).map(Number)
      } else if (lineNumber === 36) {
        totalExpenses = parsedLine.splice(1).map(Number)
      }

      lineNumber++
    }

    return {
      headers,
      expenseBreakdown,
      totalExpenses,
    }
  }
}

export class RevenueBreakdownParser extends BaseParser {
  async parse(filePath: string) {
    const fileStream = createReadStream(filePath)
    const readline = createInterface({
      input: fileStream,
      crlfDelay: Infinity
    })

    let lineNumber = 0
    let headers: string[] = []
    const revenueBreakdown: { [key: string]: number[] } = {}
    const taxRevenueBreakdown: { [key: string]: number[] } = {}
    const nonTaxRevenueBreakdown: { [key: string]: number[] } = {}
    // More out of interest than anything else
    const vatRevenueBreakdown: { [key: string]: number[] } = {}
    const exciseDutyRevenueBreakdown: { [key: string]: number[] } = {}
    const taxesOnGoodsOrPermissionToUseRevenueBreakdown: { [key: string]: number[] } = {}
    const otherInterestingRevenueBreakdown: { [key: string]: number[] } = {}


    for await (const line of readline) {
      const parsedLine = line.split(this.delimiter)

      if (lineNumber === 0) {
        headers = parsedLine.splice(1)
      } else if ([1, 11, 13, 20, 50, 58, 60].includes(lineNumber)) {
        taxRevenueBreakdown[parsedLine[0].trim().toLowerCase().replace(/ /g, '_').replace(/-/g, '_').replace(/:/g, '_').replace(/\(/g, '_').replace(/\)/g, '_')] = parsedLine.splice(1).map(Number)
      } else if ([67, 73, 74, 75, 98, 99].includes(lineNumber)) {
        nonTaxRevenueBreakdown[parsedLine[0].trim().toLowerCase().replace(/ /g, '_').replace(/-/g, '_').replace(/:/g, '_').replace(/\(/g, '_').replace(/\)/g, '_')] = parsedLine.splice(1).map(Number)
      } else if ([61, 62, 96, 97, 100].includes(lineNumber)) {
        revenueBreakdown[parsedLine[0].trim().toLowerCase().replace(/ /g, '_').replace(/-/g, '_').replace(/:/g, '_').replace(/\(/g, '_').replace(/\)/g, '_')] = parsedLine.splice(1).map(Number)
      } else if ([22, 23, 24].includes(lineNumber)) {
        vatRevenueBreakdown[parsedLine[0].trim().toLowerCase().replace(/ /g, '_').replace(/-/g, '_').replace(/:/g, '_').replace(/\(/g, '_').replace(/\)/g, '_')] = parsedLine.splice(1).map(Number)
      } else if ([26, 27, 28, 29, 30, 31, 32, 33].includes(lineNumber)) {
        exciseDutyRevenueBreakdown[parsedLine[0].trim().toLowerCase().replace(/ /g, '_').replace(/-/g, '_').replace(/:/g, '_').replace(/\(/g, '_').replace(/\)/g, '_')] = parsedLine.splice(1).map(Number)
      } else if ([39, 40, 41, 42, 43, 44, 45, 46, 47].includes(lineNumber)) {
        taxesOnGoodsOrPermissionToUseRevenueBreakdown[parsedLine[0].trim().toLowerCase().replace(/ /g, '_').replace(/-/g, '_').replace(/:/g, '_').replace(/\(/g, '_').replace(/\)/g, '_')] = parsedLine.splice(1).map(Number)
      } else if ([35, 36, 52].includes(lineNumber)) {
        otherInterestingRevenueBreakdown[parsedLine[0].trim().toLowerCase().replace(/ /g, '_').replace(/-/g, '_').replace(/:/g, '_').replace(/\(/g, '_').replace(/\)/g, '_')] = parsedLine.splice(1).map(Number)
      }

      lineNumber++
    }

    return {
      headers,
      //totalTaxRevenue,
      //totalNonTaxRevenue,
      //totalRevenue,
      revenueBreakdown,
      taxRevenueBreakdown,
      nonTaxRevenueBreakdown,
      vatRevenueBreakdown,
      exciseDutyRevenueBreakdown,
      taxesOnGoodsOrPermissionToUseRevenueBreakdown,
      otherInterestingRevenueBreakdown
    }
  }
}

export class ExpensesByFunctionalClassificationParser extends BaseParser {
  async parse(filePath: string) {
    const fileStream = createReadStream(filePath)
    const readline = createInterface({
      input: fileStream,
      crlfDelay: Infinity
    })

    let lineNumber = 0
    let headers: string[] = []
    const expense: { [key: string]: number[] } = {}
    const debtServiceCost: { [key: string]: number[] } = {}

    for await (const line of readline) {
      const parsedLine = line.split(this.delimiter)

      if (lineNumber === 0) {
        // Every 2nd column has a percentage, i am going to calculate it instead
        headers = parsedLine.splice(1).filter((_, i) => i % 2 === 0)
      } else if ([3, 5, 10, 19, 20, 24, 25, 26, 27, 30].includes(lineNumber)) {
        // Every 2nd column has a percentage, i am going to calculate it instead
        expense[parsedLine[0].trim().toLowerCase().replace(/ /g, '_').replace(/-/g, '_').replace(/:/g, '_').replace(/\(/g, '_').replace(/\)/g, '_')] = parsedLine.splice(1).filter((_, i) => i % 2 === 0).map(Number)
      } else if (lineNumber === 4)
        debtServiceCost[parsedLine[0].trim().toLowerCase().replace(/ /g, '_').replace(/-/g, '_').replace(/:/g, '_').replace(/\(/g, '_').replace(/\)/g, '_')] = parsedLine.splice(1).filter((_, i) => i % 2 === 0).map(Number)


      lineNumber++
    }

    return {
      headers,
      expense,
      debtServiceCost
    }
  }
}

main()

