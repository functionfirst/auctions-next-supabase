export const formatCurrency = (value) => {
  const options = {
    style: 'currency',
    currency: 'GBP'
  }

  const { format } = new Intl.NumberFormat('en-GB', options)

  return format(value)
}