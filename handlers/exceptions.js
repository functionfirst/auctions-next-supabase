export const execute = (callback, ...args) => {
  const { data, error, status } = callback(...args)

  if (error) {
    // @todo log to error reporting service
    console.log(Error(error.message ?? error))
    return [data, error, status]
  }

  return [data, null, status]
}

export const executeAsync = async (callback, ...args) => {
  const { data, error, status } = await callback(...args)

  if (error) {
    // @todo log to error reporting service
    console.log(Error(error.message ?? error))
    return [data, error, status]
  }

  return [data, null, status]
}
