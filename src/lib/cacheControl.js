// Cache the content of this page for 12 hrs
// After 12 hrs, the content will continue to be served
// for a grace period of 60 seconds as new data is fetched
export default function cacheResponse(res, { max = 10, swr = 59 } = {}) {
  res.setHeader(
    'Cache-Control',
    `public, s-maxage=${max}, stale-while-revalidate=${swr}`
  )
}
