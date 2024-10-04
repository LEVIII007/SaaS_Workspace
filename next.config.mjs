/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
    images : {
        domains : ['rvrmekwpnqigmqipsaho.supabase.co']
    },
};

export default nextConfig;
