require("dotenv").config();
const filters = require("./src/_includes/_11ty/filters");
const prismicHtmlSerializer = require("./src/_includes/_11ty/prismicHtmlSerializer");

const { pluginPrismic, definePrismicPluginOptions } = require("eleventy-plugin-prismic");
const prismicPluginOptions = definePrismicPluginOptions({
  endpoint: process.env.PRISMIC_ID,
  clientConfig: {
    accessToken: process.env.PRISMIC_TOKEN,
  },
  preview: {
    name: "preview",
    functionsDir: "./netlify/functions/",
  },
  htmlSerializer: prismicHtmlSerializer,
  linkResolver: (doc) => {
    return `/${doc.uid}/`;
  },
});

const Terser = require("terser");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const socialImages = require("@11tyrocks/eleventy-plugin-social-images");
const markdownIt = require("markdown-it");
const { DateTime } = require("luxon");

const config = function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(socialImages);

  eleventyConfig.addWatchTarget("./src/sass/");

  eleventyConfig.addPassthroughCopy("./src/fonts");
  eleventyConfig.addPassthroughCopy("./src/img");
  eleventyConfig.addPassthroughCopy("./src/robots.txt");
  eleventyConfig.addPassthroughCopy("./src/_headers");
  eleventyConfig.addPlugin(pluginPrismic, prismicPluginOptions);

  const md = new markdownIt({
    html: true,
  });

  eleventyConfig.addFilter("markdown", (content) => {
    return md.render(content);
  });

  // Filters: /src/_11ty/filters.js
  Object.keys(filters).forEach((filterName) => {
    eleventyConfig.addFilter(filterName, filters[filterName]);
  });

  eleventyConfig.addNunjucksAsyncFilter("jsmin", async (code, callback) => {
    try {
      const minified = await Terser.minify(code);
      return callback(null, minified.code);
    } catch (err) {
      console.error("Error during terser minify:", err);
      return callback(err, code);
    }
  });

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  eleventyConfig.addCollection("posts", (collections) => {
    return collections
      .getFilteredByTag("prismic")
      .sort((a, b) => DateTime.fromISO(b.data.postdate) - DateTime.fromISO(a.data.postdate));
  });

  eleventyConfig.addCollection("upcomingEvents", (collections) => {
    const allEvents = collections.getAll()[0].data.events;

    return allEvents
      .filter((event) => {
        const date = DateTime.fromISO(event.date);
        return date.endOf("day") > DateTime.now();
      })
      .sort((a, b) => {
        const aDate = DateTime.fromISO(a.date);
        const bDate = DateTime.fromISO(b.date);
        return aDate - bDate;
      });
  });

  eleventyConfig.addCollection("pastEvents", (collections) => {
    const allEvents = collections.getAll()[0].data.events;

    return allEvents
      .filter((event) => {
        const date = DateTime.fromISO(event.date);
        return date.endOf("day") < DateTime.now();
      })
      .sort((a, b) => {
        const aDate = DateTime.fromISO(a.date);
        const bDate = DateTime.fromISO(b.date);
        return bDate - aDate;
      });
  });

  eleventyConfig.addCollection("appearances", (collections) => {
    const allEvents = collections.getAll()[0].data.appearances;

    return allEvents.sort((a, b) => {
      const aDate = DateTime.fromISO(a.date);
      const bDate = DateTime.fromISO(b.date);
      return bDate - aDate;
    });
  });

  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};

config.prismicPluginOptions = prismicPluginOptions;

module.exports = config;
