const Parser = require("rss-parser");
const parser = new Parser();

module.exports = async () => {
  const feed = await parser.parseURL("https://css-tricks.com/author/stephanieeckles/feed/");
  const content = feed.items[0].contentSnippet;

  return [
    {
      title: feed.items[0].title,
      url: feed.items[0].link,
      description:
        content.replace(/(<([^>]+)>)/gi, "").substr(0, content.lastIndexOf(" ", 160)) + "...",
    },
  ];
};
