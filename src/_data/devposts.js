const axios = require("axios");
require("dotenv").config();

const apiRoot = "https://dev.to/api/articles/me/published?per_page=20";

const getExcerpt = (md) => {
  // Remove MD links
  const linksRE = /\[(.+)\]\((.+)\)/gm;
  let content = md.replace(linksRE, "$1");

  // Convert bullets to comma list
  const listStartRE = /(:\s-\s)/gm;
  content = content.replace(listStartRE, ": ");
  const listItemRE = /(?<!:)(\s-\s)/gm;
  content = content.replace(listItemRE, "; ");

  // Remove intro blockquote
  const regex = /> _(.*)_\./;
  content = content.replace(regex, "").trim();

  // Remove italic formatting
  const em = /_(.*)_/gm;
  content = content.replace(em, "$1").trim();

  // Remove blockquote start
  const bq = /\s>/gm;
  content = content.replace(bq, "").trim();

  return content.substr(0, content.lastIndexOf(" ", 160)) + "...";
};

module.exports = async () => {
  const { data } = await axios.get(apiRoot, { headers: { "api-key": process.env.DEVTO } });

  let response = [];
  const seriesText = "modern CSS";

  // Grab the items and re-format to the fields we want
  if (data.length) {
    const mspost = data.findIndex((item) => item.description.includes(seriesText));
    const devpost = data.findIndex((item) => !item.description.includes(seriesText));

    const moderncss = {
      title: data[mspost].title,
      url: data[mspost].url,
      description: getExcerpt(data[mspost].body_markdown),
      source: "moderncss",
    };

    const dev = {
      title: data[devpost].title,
      url: data[devpost].url,
      description: getExcerpt(data[devpost].body_markdown),
      source: "dev",
    };

    response = response.concat(moderncss, dev);
  }
  return response;
};
