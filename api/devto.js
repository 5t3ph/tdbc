const axios = require("axios");

const apiRoot = "https://dev.to/api/articles/me/published?per_page=3";

exports.handler = async (event, context, callback) => {
  try {
    const { data } = await axios.get(apiRoot, { headers: { "api-key": process.env.DEVTO } });

    let response = [];

    // Grab the items and smoosh them into something the front-end will like
    if (data.length) {
      response = data.map((item) => ({
        title: item.title,
        url: item.url,
        description: item.description,
        tags: item.tag_list.join(", "),
      }));
      //.reverse();
    }
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(response),
    });
  } catch (err) {
    callback(err);
  }
};
