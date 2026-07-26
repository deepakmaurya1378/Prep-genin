/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // @xenova/transformers (used for on-device Whisper fallback transcription)
    // pulls in onnxruntime-web, which conditionally references Node-only
    // optional deps that don't exist in the browser bundle.
    config.resolve.alias = {
      ...config.resolve.alias,
      sharp$: false,
      "onnxruntime-node$": false,
    };
    return config;
  },
};

export default nextConfig;
