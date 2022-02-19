require("dotenv").config();
const Cache = require("@11ty/eleventy-cache-assets");

module.exports = async function () {
  let stars = {};
  const repos = [
    "stylestage",
    "smolcss",
    "htmlrecipes",
    "11ty-rocks",
    "11ty-netlify-jumpstart",
    "11ty-sass-skeleton",
    "a11y-color-tokens",
    "buttonbuddy",
    "moderncss-dot-dev",
    "objectfit-focalpoint",
  ];

  if (process.env.CONTEXT === "production") {
    await Promise.all(
      repos.map(async (repo) => {
        const json = await Cache(`https://api.github.com/repos/5t3ph/${repo}`, {
          duration: "12h",
          type: "json",
        });

        stars = { ...stars, [repo]: json.stargazers_count };
      })
    );
  }

  return stars;
};
