const { prismicPreview } = require("eleventy-plugin-prismic");

const { prismicPluginOptions } = require("./eleventy.config.js");

require("./eleventy-bundler-modules.js");

const handler = async (event) => {
  // This function returns a Netlify `HandlerResponse` object feel
  // free to alter it to fit your function provider's interface.
  return await prismicPreview.handle(
    event.path,
    event.queryStringParameters,
    event.headers,
    prismicPluginOptions
  );
};

exports.handler = handler;
