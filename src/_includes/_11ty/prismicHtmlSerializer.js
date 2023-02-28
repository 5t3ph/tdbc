const HighlightPairedShortcode = require("@11ty/eleventy-plugin-syntaxhighlight/src/HighlightPairedShortcode");
const { slug } = require("./filters");

module.exports = (_type, element, content, children) => {
  if (element.type === "preformatted") {
    const langRegex = /lang:(js|css|scss|html|txt)/g;
    let lang = "css";
    let code = content;

    if (content.trim() != "") {
      const codeLang = [...content.matchAll(langRegex)];
      lang = codeLang[0] ? codeLang[0][1] : lang;

      if (codeLang.length) {
        code = code.replace(codeLang[0][0], "").trim();
      }
    }

    return HighlightPairedShortcode(code, lang);
  }

  if (element.type === "em") {
    if (children.startsWith("[em]")) {
      return `<em>${children.replace("[em]", "")}</em>`;
    } else {
      return `<code>${children}</code>`;
    }
  }

  if (element.type === "paragraph") {
    if (children.startsWith("---")) {
      return "<hr>";
    }

    if (children.startsWith("[codepen")) {
      const cpsrcRE = /pen=(.+?)]/g;
      const cpSrc = [...content.matchAll(cpsrcRE)];
      if (cpSrc[0]) {
        return `<p class="codepen" data-default-tab="css,result" data-slug-hash="${cpSrc[0][1]}" data-preview="true" data-user="5t3ph"></p>
        <script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>`;
      }
    }

    if (children.startsWith("[note]")) {
      return `<aside role="note"><p>${children.replace("[note]", "")}</p></aside>`;
    }

    if (children.startsWith("[key]")) {
      return `<p class="key">${children.replace("[key]", "")}</p>`;
    }

    if (children.startsWith("[video]")) {
      return `<video class="video-player" controls muted playsinline src="/img/${children.replace(
        "[video]",
        ""
      )}.mp4"></video>`;
    }
  }

  const headlines = ["heading2", "heading3"];
  if (headlines.includes(element.type)) {
    const anchor = slug(content);
    const type = element.type.replace("eading", "");
    return `<div class="heading-wrapper ${type}">
    <${type} id="${anchor}">${content}</${type}>
    <a href="#${anchor}" aria-labelledby="${anchor}">
      <span hidden>#</span>
    </a></div>`;
  }

  if (element.type === "hyperlink") {
    const isAnchor = element.data.url.startsWith("https://#");
    const isRelative = element.data.url.startsWith("https:///");

    if (isAnchor || isRelative) {
      return `<a href="${element.data.url.replace("https://", "")}">${children}</a>`;
    }
  }

  return null;
};
