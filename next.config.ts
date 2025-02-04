import type { NextConfig } from "next";
import rehypePrettyCode from "rehype-pretty-code";

const nextConfig: NextConfig = {
  experimental: {
    mdxRs: true,
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.mdx?$/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: "@mdx-js/loader",
          options: {
            rehypePlugins: [
              [
                rehypePrettyCode,
                {
                  theme: "github-dark",
                  keepBackground: false,
                },
              ],
            ],
          },
        },
      ],
    });
    return config;
  },
};

export default nextConfig;
