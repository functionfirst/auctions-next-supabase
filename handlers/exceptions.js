export const execute = (callback, ...args) => {
  try {
    const res = callback(args)
    return [res, null]
  } catch (error) {
    console.log(Error(error.message ?? error))
    // @todo log to error reporting service
    return [null, error]
  }
}

export const executeAsync = async (callback, ...args) => {
  try {
    const res = await callback(args)
    return [res, null]
  } catch (error) {
    console.log(Error(error.message ?? error))
    // @todo log to error reporting service
    return [null, error]
  }
}
