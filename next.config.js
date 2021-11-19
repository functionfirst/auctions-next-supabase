module.exports = {
  reactStrictMode: true,

  images: {
    domains: ['kzdtchcvghozxfazzplp.supabase.co'] // @todo determine this using env file
  },

  webpack: (config, { isServer }) => {
    if (!isServer) {
      // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
      config.resolve.fallback = {
        fs: false
      }
    }

    return config;
  }
}
