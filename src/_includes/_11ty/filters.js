const slugify = require("slugify");
const { DateTime } = require("luxon");

const slug = (str) => {
  return slugify(str, {
    lower: true,
    strict: true,
    remove: /["]/g,
  });
};

const formatDate = (date) => {
  const d = DateTime.fromISO(date);
  return `${d.toFormat("LLL")} ${d.toFormat("d")}, ${d.toFormat("yyyy")}`;
};

const postdateToRfc3339 = (date) => {
  const dateFormat = !DateTime.fromISO(date).invalidExplanation
    ? DateTime.fromISO(date).setZone("utc")
    : DateTime.fromJSDate(date).setZone("utc");
  return dateFormat.toString();
};

const getPostDate = (post) => {
  const p = Array.isArray(post) ? post[0] : post;
  return p.data.postdate || p.date;
};

const source = (arr, source) => {
  return arr.filter((item) => item.source === source);
};

const limit = (arr, limit) => arr.slice(0, limit);

module.exports = {
  slug,
  formatDate,
  postdateToRfc3339,
  getPostDate,
  source,
  limit,
};
