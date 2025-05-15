import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* Configura las opciones aqui */
    experimental: {
    ppr: 'incremental'
  }
};

export default nextConfig;
