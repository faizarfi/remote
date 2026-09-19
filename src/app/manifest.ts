import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Universal TV Remote Pro',
    short_name: 'TV Remote',
    description: 'Remote TV Universal pintar untuk segala jenis Smart TV & TV biasa',
    start_url: '/',
    display: 'standalone',
    background_color: '#08090d',
    theme_color: '#161822',
    orientation: 'portrait',
    icons: [
      {
        src: '/icon-192.svg',
        sizes: '192x192',
        type: 'image/svg+xml',
      },
      {
        src: '/icon-512.svg',
        sizes: '512x512',
        type: 'image/svg+xml',
      },
    ],
  };
}
