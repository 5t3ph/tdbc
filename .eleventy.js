const Terser = require("terser");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const socialImages = require("@11tyrocks/eleventy-plugin-social-images");
const markdownIt = require("markdown-it");
const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(socialImages);

  eleventyConfig.addWatchTarget("./src/sass/");

  eleventyConfig.addPassthroughCopy("./src/fonts");
  eleventyConfig.addPassthroughCopy("./src/img");
  eleventyConfig.addPassthroughCopy("./src/robots.txt");
  eleventyConfig.addPassthroughCopy("./src/_headers");

  const md = new markdownIt({
    html: true,
  });

  eleventyConfig.addFilter("markdown", (content) => {
    return md.render(content);
  });

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  eleventyConfig.addFilter("source", function (arr, source) {
    return arr.filter((item) => item.source === source);
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

  eleventyConfig.addCollection("upcomingEvents", (collections) => {
    const allEvents = collections.getAll()[0].data.events;

    return allEvents
      .filter((event) => {
        const date = DateTime.fromISO(event.date);
        return date > new Date();
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
        return date < new Date();
      })
      .sort((a, b) => {
        const aDate = DateTime.fromISO(a.date);
        const bDate = DateTime.fromISO(b.date);
        return aDate + bDate;
      });
  });

  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};
