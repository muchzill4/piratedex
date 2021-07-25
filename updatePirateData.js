import { resolve } from 'path';
import { writeFile } from 'fs/promises';
import * as cheerio from 'cheerio';
import fetch from 'node-fetch';

function formatPirateData(pirateData) {
  return {
    ...pirateData,
    name: pirateData.name.replace(/(\[\d\]|\(pirate\))/, ''),
    href: pirateData.href ? `https://wikipedia.org${pirateData.href}` : null
  };
}

function readPirateDataHtmlTable($, table) {
  const rows = $(table).find('tr').slice(1); /* minus header */
  const data = [];
  for (const tr of rows.toArray()) {
    const cells = $(tr).children();
    const name = cells.eq(0).text().trim();
    if (name === '') continue; /* skip phantom rows data */
    const pirateData = formatPirateData({
      name,
      href: cells.eq(0).find('a').attr('href'),
      life: cells.eq(1).text().trim(),
      yearsActive: cells.eq(2).text().trim(),
      countryOfOrigin: cells.eq(3).text().trim(),
      comments: cells.eq(4).text().trim()
    });
    data.push(pirateData);
  }
  return data;
}

async function fetchPirateDataFromWikipedia() {
  const url =
    'https://en.wikipedia.org/w/api.php?action=parse&page=List_of_pirates&prop=text&formatversion=2&format=json';
  const response = await fetch(url);
  const data = await response.json();

  const $ = cheerio.load(data.parse.text);
  const tables = $('table.sortable.wikitable');
  return tables.toArray().flatMap((table) => readPirateDataHtmlTable($, table));
}

const pirateData = await fetchPirateDataFromWikipedia();
await writeFile(resolve('static/data/pirates.json'), JSON.stringify(pirateData));
