module.exports = {
  siteMetadata: {
    title: "ETHBerlin04",
    siteUrl: `https://ethberlin.org`,
    url: `https://ethberlin.org`,
    description: "ETHBerlin04: Identity Crisis, May 24-26, 2024, Kreuzberg, Berlin",
    twitterUsername: "@ETHBerlin",
    image: `/card.png?cache-break`,
  },
  plugins: [
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        output: "/sitemap", // Version 6 writes to the site root; keep the old URL.
      },
    },
    "gatsby-plugin-postcss",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: `src/assets/icons/favicon-32x32.png`, // This path is relative to the root of the site.
        icons: [
          {
            src: `/src/assets/icons/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
        ], // Add or remove icon sizes as desired
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
  ],
};
