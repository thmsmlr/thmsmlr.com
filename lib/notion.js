/*
 * Library for communicating with the private notion API.
 *
 * WARNING: The notion API is private and will probably break at some point
 *
 * This code is mostly stolen from, https://github.com/ijjk/notion-blog
 */

export async function getTable(pageId) {
  let postsTable;

  try {
    const data = await rpc('loadPageChunk', {
      pageId,
      limit: 999, // TODO: figure out Notion's way of handling pagination
      cursor: { stack: [] },
      chunkNumber: 0,
      verticalColumns: false
    });

    // Parse table with posts
    const tableBlock = Object.values(data.recordMap.block).find(
      block => block.value.type === 'collection_view_page'
    );

    const col = await queryCollection({
      collectionId: tableBlock.value.collection_id,
      collectionViewId: tableBlock.value.view_ids[0]
    });
    postsTable = await loadTable(tableBlock, true);
    return postsTable;
  } catch (err) {
    console.error(`Failed to load Notion posts`, err);
    return [];
  }
}

export async function getPage(pageId) {
  try {
    const data = await rpc('loadPageChunk', {
      pageId,
      limit: 999, // TODO: figure out Notion's way of handling pagination
      cursor: { stack: [] },
      chunkNumber: 0,
      verticalColumns: false
    });
    const blocks = data.recordMap.block;
    return data;
  } catch (err) {
    console.error(`Failed to load pageData for ${pageId}`, err);
    return {};
  }
}

/*
 * HELPER FUNCTIONS
 */

const NOTION_TOKEN = process.env.NOTION_TOKEN;

async function rpc(fnName, body) {
  if (!NOTION_TOKEN) {
    throw new Error('NOTION_TOKEN is not set in env');
  }
  const res = await fetch(`https://www.notion.so/api/v3/${fnName}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      cookie: `token_v2=${NOTION_TOKEN}`
    },
    body: JSON.stringify(body)
  });

  if (res.ok) {
    return res.json();
  } else {
    throw new Error(await getError(res));
  }
}

async function getError(res) {
  return `Notion API error (${res.status}) \n${getJSONHeaders(res)}\n ${await getBodyOrNull(res)}`;
}

function getJSONHeaders(res) {
  return JSON.stringify(res.headers.raw());
}

async function getBodyOrNull(res) {
  try {
    return res.text();
  } catch (err) {
    return null;
  }
}

function queryCollection({
  collectionId,
  collectionViewId,
  loader = {
    limit: 999, // TODO: figure out Notion's way of handling pagination
    loadContentCover: true,
    type: 'table',
    userLocale: 'en',
    userTimeZone: 'america/los_angeles'
  },
  query = {
    aggregate: [
      {
        aggregation_type: 'count',
        id: 'count',
        property: 'title',
        type: 'title',
        view_type: 'table'
      }
    ],
    filter: [],
    filter_operator: 'and',
    sort: []
  }
}) {
  return rpc('queryCollection', {
    collectionId,
    collectionViewId,
    loader,
    query
  });
}

async function loadTable(collectionBlock, isPosts = false) {
  const { value } = collectionBlock;
  let table = [];
  const col = await queryCollection({
    collectionId: value.collection_id,
    collectionViewId: value.view_ids[0]
  });
  const entries = Object.values(col.recordMap.block).filter(block => {
    return block.value && block.value.parent_id === value.collection_id;
  });

  const colId = Object.keys(col.recordMap.collection)[0];
  const schema = col.recordMap.collection[colId].value.schema;
  const schemaKeys = Object.keys(schema);
  // console.log(schema);

  for (const entry of entries) {
    const props = entry.value && entry.value.properties;
    const row = {};

    if (!props) continue;
    if (entry.value.content) {
      row.id = entry.value.id;
    }

    schemaKeys.forEach(key => {
      // might be undefined
      let val = props[key] && props[key][0][0];

      // authors and blocks are centralized
      if (val && props[key][0][1]) {
        const type = props[key][0][1][0];

        switch (type[0]) {
          case 'a': // link
            val = type[1];
            break;
          case 'u': // user
            val = props[key].filter(arr => arr.length > 1).map(arr => arr[1][0][1]);
            break;
          case 'p': // page (block)
            const page = col.recordMap.block[type[1]];
            row.id = page.value.id;
            val = page.value.properties.title[0][0];
            break;
          case 'd': // date
            // start_date: 2019-06-18
            // start_time: 07:00
            // time_zone: Europe/Berlin, America/Los_Angeles

            if (!type[1].start_date) {
              break;
            }
            // initial with provided date
            const providedDate = new Date(
              type[1].start_date + ' ' + (type[1].start_time || '')
            ).getTime();

            // calculate offset from provided time zone
            const timezoneOffset =
              new Date(
                new Date().toLocaleString('en-US', {
                  timeZone: type[1].time_zone
                })
              ).getTime() - new Date().getTime();

            // initialize subtracting time zone offset
            val = new Date(providedDate - timezoneOffset).getTime();
            break;
          default:
            console.error('unknown type', type[0], type);
            break;
        }
      } else {
        switch (schema[key].type) {
          case 'multi_select':
            if (val) {
              val = val.split(',');
            }
            break;
          case 'checkbox':
            val = val === 'Yes';
            break;
          default:
            val = val;
            break;
        }
      }

      if (typeof val === 'string') {
        val = val.trim();
      }
      row[schema[key].name] = val || null;
    });

    table.push(row);
  }
  return table;
}
