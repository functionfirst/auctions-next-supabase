export const formatCurrency = (value) => {
  const options = {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }

  const { format } = new Intl.NumberFormat('en-GB', options)

  return format(value)
}