import * as cheerio from 'cheerio';

function extractTableData($, table) {
  const rows = $(table).find('tr').slice(1);
  const tableData = rows.toArray().map((tr) => {
    return $(tr)
      .children()
      .toArray()
      .map((cell) => {
        return $(cell).text().trim();
      });
  });

  return tableData
    .filter((row) => {
      return !row.every((text) => text === '');
    })
    .map((row) => {
      return {
        name: row[0],
        life: row[1],
        yearsActive: row[2],
        countryOfOrigin: row[3],
        comments: row[4]
      };
    });
}

async function fetchPirateDataFromWikipedia() {
  const url =
    'https://en.wikipedia.org/w/api.php?action=parse&page=List_of_pirates&prop=text&formatversion=2&format=json';

  const response = await fetch(url);
  const data = await response.json();
  const $ = cheerio.load(data.parse.text);

  const tables = $('table.sortable.wikitable');
  return tables.toArray().flatMap((table) => extractTableData($, table));
}

/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */
export async function get() {
  pirates = await fetchPirateDataFromWikipedia();
  return {
    body: pirates
  };
}
