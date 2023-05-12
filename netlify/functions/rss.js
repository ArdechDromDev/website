const https = require("https");

// Inspired by https://www.contentful.com/blog/generate-blog-rss-feed-with-javascript-and-netlify/

async function getPosts() {
  return new Promise((resolve, reject) => {
    const query = `
    query {
      {
          description
          link
          name
      }
    }
    `;

    const options = {
      protocol: "https:",
      hostname: "api.meetup.com",
      path: "/Ardech-Drom-Dev/events?fields=featured_photo&sign=true&photo-host=public&page=20",
      method: "GET"
    };

    let posts = "";

    const req = https.request(options, (res) => {
      res.on("data", (data) => {
        posts += data;
      });

      res.on("end", () => {
        const parsedPosts = JSON.parse(posts);
        resolve(parsedPosts);
      });
    });

    req.on("error", (e) => {
      console.error(e);
    });

    req.write(JSON.stringify({ query }));

    req.end();
  });
}


function buildRssItems(items) {
  return items
    .map((item) => {
      const escapeHtml = (string) => string.replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#39;");

      const hasLink = escapeHtml(item.link);
      const description = item.description;
      const title = escapeHtml(item.name);
      const eventDate =  new Date(item.time).toUTCString()


      return `
        <item>
        <title>${title}</title>
        <description><![CDATA[ ${description} ]]></description>
        <author>contact@ardechdromdev.org (ardechdromdev)</author>
        <link>${hasLink}</link>
        <guid>${hasLink}</guid>
        <pubDate>${eventDate}</pubDate>
               </item>
        `;
    })
    .join("");
}

exports.handler = async function (event, context) {
  const rssFeed = `<?xml version="1.0"?>
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>ardechdromdev.org</title>
    <atom:link href="https://ardechdromdev.org/.netlify/functions/rss" rel="self" type="application/rss+xml" />
    <link>https://ardechdromdev.org/</link>
    <description>Evénements organisés par l'association Ardèch'Drôm'Dev </description>
    ${buildRssItems(await getPosts())}
  </channel>
  </rss>`;

  return {
    statusCode: 200,
    contentType: "text/xml",
    body: rssFeed,
  };
};




