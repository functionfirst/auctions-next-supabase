module.exports = {
  reactStrictMode: true,

  // https://nextjs.org/docs/basic-features/image-optimization#domains
  images: {
    domains: ['kzdtchcvghozxfazzplp.supabase.co'], // @todo determine this using env file
  },

  // https://nextjs.org/docs/advanced-features/i18n-routing#search-engine-optimization
  // Add locale to insert lang attribute into html tag
  i18n: {
    locales: ['en-GB'],
    defaultLocale: 'en-GB',
  },

  webpack: (config, { isServer }) => {
    if (!isServer) {
      // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
      config.resolve.fallback = {
        fs: false,
      }
    }

    return config
  },
}
