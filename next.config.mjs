/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        // Add JSON loader for GeoJSON files
        config.module.rules.push({
          test: /\.geojson$/,
          use: 'json-loader',
          type: 'javascript/auto',
        });
    
        return config;
      }, 
};

export default nextConfig;
