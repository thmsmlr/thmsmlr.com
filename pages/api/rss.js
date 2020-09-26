export default async (req, res) => {
  let resp;
  resp = await fetch(
    'https://notion-api.splitbee.io/v1/table/4eb4df60-9e1c-4e8d-a3ef-29f24e7f555f'
  );
  let posts = await resp.json();
  const now = new Date();
  res.setHeader('Content-Type', 'application/rss+xml');
  res.setHeader('Cache-Control', 'maxage=0, s-maxage=600');
  res.send(`<?xml version="1.0" ?>
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
        <title>Thomas Millar's Blog</title>
        <link>https://thmsmlr.com</link>
        <description>The place where my ideas go to die</description>
        <language>en</language>
        <lastBuildDate>${now.toUTCString()}</lastBuildDate>
        <atom:link href="https://thmsmlr.com/api/rss" rel="self" type="application/rss+xml" />
    </channel>
    ${posts
      .map(
        (post) =>
          `
      <item>
        <title>${post.Name}</title>
        <link>
          https://thmsmlr.com/blog/${post.Slug}
        </link>

        <pubDate>${new Date(post.PublishedOn).toUTCString()}</pubDate>
        <description>
        <![CDATA[${post.Description}]]>
        </description>
      </item>
    `
      )
      .join('\n')}
  </rss>`);
};
