import * as cheerio from 'cheerio';
import { promises as fs } from 'fs';

function formatPirateData(pirateData) {
  return {
    ...pirateData,
    name: pirateData.name.replace(/(\[\d\]|\(pirate\))/, ''),
    href: pirateData.href ? `http://wikipedia.org${pirateData.href}` : null,
  }
}

function extractTableData($, table) {
  const rows = $(table).find('tr').slice(1); /* minus header */
  const data = [];
  for (const tr of rows.toArray()) {
    const cells = $(tr).children();
    const name = cells.eq(0).text().trim();
    if (name === '') continue; /* skip phantom rows data */
    const href = cells.eq(0).find('a').attr('href');
    const life = cells.eq(1).text().trim();
    const yearsActive = cells.eq(2).text().trim();
    const countryOfOrigin = cells.eq(3).text().trim();
    const comments = cells.eq(4).text().trim();
    const pirateData = formatPirateData({
      href,
      name,
      life,
      yearsActive,
      countryOfOrigin,
      comments
    });
    data.push(pirateData);
  }
  return data;
}

async function fetchPirateDataFromWikipedia() {
  const url =
    'https://en.wikipedia.org/w/api.php?action=parse&page=List_of_pirates&prop=text&formatversion=2&format=json';

  // const response = await fetch(url);
  // const data = await response.json();
  const data = JSON.parse(await fs.readFile('src/routes/api/_data.json', 'utf8'));

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
