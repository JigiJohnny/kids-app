import puppeteer from 'puppeteer';
import fs from 'fs';

async function scrapeHerne() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null
  });
  const page = await browser.newPage();
  await page.goto('https://www.guterstart.nrw.de/herne.suche', { waitUntil: 'networkidle2' });

  // Optional: Warten und manuell suchen
  console.log('Bitte manuell Suche ausführen und ENTER drücken...');
  await new Promise(resolve => process.stdin.once('data', resolve));

  // Jetzt Ergebnisse auslesen
  const offers = await page.evaluate(() => {
    const results = [];
    document.querySelectorAll('div > h2').forEach(h2 => {
      const container = h2.parentElement;
      const title = h2.innerText.trim();
      const description = container.querySelector('p')?.innerText.trim() ?? '';
      const date = container.querySelector('p.date-time')?.innerText.trim() ?? '';
      const location = container.querySelector('p.location')?.innerText.trim() ?? '';
      const tags = Array.from(container.querySelectorAll('ul.tags li')).map(li => li.innerText.trim());

      results.push({ title, description, date, location, tags });
    });
    return results;
  });

  console.log(`📦 Gefundene Angebote: ${offers.length}`);
  fs.writeFileSync('offers.json', JSON.stringify(offers, null, 2));
  console.log('✅ offers.json gespeichert');

  await browser.close();
}

scrapeHerne();
