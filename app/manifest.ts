import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Mia Catherine Reborns",
        short_name: "Mia Catherine Reborns",
        description: "Premium handcrafted silicone reborn baby dolls. Medical-grade platinum silicone, artisan-crafted realism, weighted for authentic feel.",
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#db2777',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
            {
                src: '/assets/baby1.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/assets/baby1.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    }
}