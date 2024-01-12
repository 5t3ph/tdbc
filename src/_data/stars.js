require("dotenv").config();
const EleventyFetch = require("@11ty/eleventy-fetch");

module.exports = async function () {
  let stars = {};
  const repos = [
    "stylestage",
    "smolcss",
    "htmlrecipes",
    "11ty-netlify-jumpstart",
    "11ty-sass-skeleton",
    "a11y-color-tokens",
    "buttonbuddy",
    "moderncss-dot-dev",
    "objectfit-focalpoint",
    "css-browser-support",
    "SupportsCSS",
  ];

  if (process.env.CONTEXT === "production" || process.env.CONTEXT === "branch-deploy") {
    await Promise.all(
      repos.map(async (repo) => {
        try {
          const json = await EleventyFetch(`https://api.github.com/repos/5t3ph/${repo}`, {
            duration: "12h",
            type: "json",
          });

          stars = { ...stars, [repo]: json.stargazers_count };
        } catch (e) {
          console.log(`Failed getting GitHub stargazers count for ${repo}`);
        }
      })
    );
  }

  return stars;
};
