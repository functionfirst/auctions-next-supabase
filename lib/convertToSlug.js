const convertToSlug = (name) =>
  name
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .toLowerCase()

export { convertToSlug }
