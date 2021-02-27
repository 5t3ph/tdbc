const Parser = require("rss-parser");
const parser = new Parser();

module.exports = async () => {
  const feed = await parser.parseURL("https://11ty.rocks/feed/");
  const content = feed.items[0].content;

  return [
    {
      title: feed.items[0].title,
      url: feed.items[0].link,
      description:
        content
          .replace(/(<([^>]+)>)/gi, "")
          .substr(0, content.lastIndexOf(" ", 180))
          .replace("#", "") + "...",
    },
  ];
};
