import { createReadStream, existsSync, writeFile } from 'fs';
import { createInterface } from 'readline';

async function main() {
  const revenueParser = new RevenueParser()
  const expensesParse = new ExpenseParser()
  const revenue = await revenueParser.parse('src/data/raw/revenue.csv')
  const expenses = await expensesParse.parse('src/data/raw/expenses.csv')

  const revenueExpensesOutput = {
    revenueVsExpenses: formatRevenueAndExpenses(revenue.headers, revenue.totalRevenue, expenses.totalExpenses)
  }
  const expensesBreakdownOutput = formatExpenseBreakdown(expenses.headers, expenses.expensesBreakdown)

  writeData('src/data/parsed/revenue-expenses.json', revenueExpensesOutput)
  writeData('src/data/parsed/expenses-breakdown.json', expensesBreakdownOutput)
}

function formatRevenueAndExpenses(years: string[], revenue: number[], expenses: number[]): object[] {
  const data: object[] = []

  years.forEach((year, index) => {
    data.push({
      category: year,
      revenue: revenue[index],
      expenses: expenses[index],
    })
  })

  return data
}

function formatExpenseBreakdown(years: string[], expenses: { [key: string]: number[] }): object[] {
  const data: object[] = []
  years.forEach((year, index) => {
    const keys = Object.keys(expenses)
    const value: { [key: string]: string | number } = {
      category: year,
    }

    keys.forEach((key) => {
      value[key.toLowerCase().replace(/ /g, '_').replace(/-/g, '_')] = expenses[key][index]
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
    const fileStream = createReadStream(filePath)
    return createInterface({
      input: fileStream,
      crlfDelay: Infinity
    })
  }
}

export class RevenueParser extends BaseParser {

  async parse(filePath: string) {
    if (!existsSync(filePath)) {
      throw new Error('File not found');
    }

    const readline = this.readFromFile(filePath)

    let lineNumber = 0
    let headers: string[] = []
    const taxRevenueBreakdown: { [key: string]: number[] } = {}
    const revenueBreakdown: { [key: string]: number[] } = {}
    let totalRevenue: number[] = []

    for await (const line of readline) {
      const parsedLine = line.split(this.delimiter)

      // Splice 2 because 2000 has no expense data
      if (lineNumber === 0) {
        headers = parsedLine.splice(2)
      } else if ([1, 7, 9, 15, 24, 29, 30].includes(lineNumber)) {
        taxRevenueBreakdown[parsedLine[0]] = parsedLine.splice(2).map(Number)
      } else if ([31, 32, 33, 34].includes(lineNumber)) {
        revenueBreakdown[parsedLine[0]] = parsedLine.splice(2).map(Number)
      } else if (lineNumber === 35) {
        totalRevenue = parsedLine.splice(2).map(Number)
      }

      lineNumber++
    }

    return {
      headers,
      taxRevenueBreakdown,
      revenueBreakdown,
      totalRevenue,
    }
  }
}


export class ExpenseParser extends BaseParser {

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
    const expensesBreakdown: { [key: string]: number[] } = {}
    let totalExpenses: number[] = []

    for await (const line of readline) {
      const parsedLine = line.split(this.delimiter)

      // Splice 2 because 2000 has no expense data
      if (lineNumber === 0) {
        headers = parsedLine.splice(2)
      } else if ([11, 12, 13, 15, 16, 17, 18, 19, 20, 21, 23, 24, 25, 26, 27, 28, 29, 31].includes(lineNumber)) {
        expensesBreakdown[parsedLine[0]] = parsedLine.splice(2).map(Number)
      } else if (lineNumber === 32) {
        totalExpenses = parsedLine.splice(2).map(Number)
      }

      lineNumber++
    }

    return {
      headers,
      expensesBreakdown,
      totalExpenses,
    }
  }
}

main()

