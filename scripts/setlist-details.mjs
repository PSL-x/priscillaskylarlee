const API_KEY = 'dDbzL5-DQiPygS4KXRnt6Uy8NGMWo_eb84_d';

const foundSetlists = [
  { number: 75, url: 'https://www.setlist.fm/setlist/counterparts/2016/the-cobalt-vancouver-bc-canada-13f07dd1.html' },
  { number: 74, url: 'https://www.setlist.fm/setlist/la-dispute/2022/vogue-theatre-vancouver-bc-canada-13be9551.html' },
  { number: 66, url: 'https://www.setlist.fm/setlist/bring-me-the-horizon/2017/wamu-theater-seattle-wa-33e6b4e5.html' },
  { number: 64, url: 'https://www.setlist.fm/setlist/into-it-over-it/2016/the-crocodile-seattle-wa-1be6b944.html' },
  { number: 62, url: 'https://www.setlist.fm/setlist/thrice/2016/commodore-ballroom-vancouver-bc-canada-6bfd8232.html' },
  { number: 60, url: 'https://www.setlist.fm/setlist/brand-new/2016/vogue-theatre-vancouver-bc-canada-3bfee020.html' },
  { number: 59, url: 'https://www.setlist.fm/setlist/being-as-an-ocean/2016/the-imperial-vancouver-bc-canada-2bf0e0b2.html' },
  { number: 58, url: 'https://www.setlist.fm/setlist/american-football/2016/neptune-theatre-seattle-wa-73f0ae05.html' },
  { number: 55, url: 'https://www.setlist.fm/setlist/defeater/2015/el-corazon-seattle-wa-13c8e979.html' },
  { number: 54, url: 'https://www.setlist.fm/setlist/this-will-destroy-you/2015/electric-owl-vancouver-bc-canada-bad8106.html' },
  { number: 53, url: 'https://www.setlist.fm/setlist/the-world-is-a-beautiful-place-and-i-am-no-longer-afraid-to-die/2014/the-vera-project-seattle-wa-3bbf500c.html' },
  { number: 52, url: 'https://www.setlist.fm/setlist/circa-survive/2014/the-showbox-sodo-seattle-wa-4bcd8f12.html' },
  { number: 50, url: 'https://www.setlist.fm/setlist/altj/2014/the-orpheum-vancouver-bc-canada-53ccffe5.html' },
  { number: 49, url: 'https://www.setlist.fm/setlist/being-as-an-ocean/2014/studio-seven-seattle-wa-73cf4e01.html' },
  { number: 48, url: 'https://www.setlist.fm/setlist/brand-new/2014/vogue-theatre-vancouver-bc-canada-7bce52f4.html' },
  { number: 47, url: 'https://www.setlist.fm/setlist/la-dispute/2014/bush-hall-london-england-4bc093f6.html' },
  { number: 46, url: 'https://www.setlist.fm/setlist/la-dispute/2014/bush-hall-london-england-7bc09acc.html' },
  { number: 45, url: 'https://www.setlist.fm/setlist/bring-me-the-horizon/2014/vogue-theatre-vancouver-bc-canada-3c205f7.html' },
  { number: 44, url: 'https://www.setlist.fm/setlist/la-dispute/2014/el-corazon-seattle-wa-1bc25d80.html' },
  { number: 42, url: 'https://www.setlist.fm/setlist/protest-the-hero/2013/vogue-theatre-vancouver-bc-canada-73c4f209.html' },
  { number: 41, url: 'https://www.setlist.fm/setlist/architects/2014/rio-theatre-vancouver-bc-canada-23cc941b.html' },
  { number: 40, url: 'https://www.setlist.fm/setlist/afi/2013/commodore-ballroom-vancouver-bc-canada-3c4b9cf.html' },
  { number: 39, url: 'https://www.setlist.fm/setlist/the-national/2013/pne-amphitheatre-vancouver-bc-canada-3c78d5b.html' },
  { number: 38, url: 'https://www.setlist.fm/setlist/sufjan-stevens/2015/the-orpheum-vancouver-bc-canada-33c9c019.html' },
  { number: 36, url: 'https://www.setlist.fm/setlist/the-xx/2013/queen-elizabeth-theatre-vancouver-bc-canada-5bd9b390.html' },
  { number: 35, url: 'https://www.setlist.fm/setlist/altj/2013/commodore-ballroom-vancouver-bc-canada-7bd8eec4.html' },
  { number: 33, url: 'https://www.setlist.fm/setlist/alexisonfire/2010/edmonton-event-centre-edmonton-ab-canada-13d2a9fd.html' },
  { number: 31, url: 'https://www.setlist.fm/setlist/sufjan-stevens/2010/the-orpheum-vancouver-bc-canada-53d57769.html' },
  { number: 29, url: 'https://www.setlist.fm/setlist/jimmy-eat-world/2008/edmonton-event-centre-edmonton-ab-canada-539e8799.html' },
];

function extractSetlistId(url) {
  const match = url.match(/([a-f0-9]+)\.html$/);
  return match?.[1];
}

async function fetchSetlist(id) {
  const res = await fetch(`https://api.setlist.fm/rest/1.0/setlist/${id}`, {
    headers: { 'x-api-key': API_KEY, 'Accept': 'application/json' },
  });
  if (!res.ok) return null;
  return res.json();
}

async function main() {
  for (const show of foundSetlists) {
    await new Promise(r => setTimeout(r, 300));
    const id = extractSetlistId(show.url);
    if (!id) continue;

    const data = await fetchSetlist(id);
    if (!data) { console.log(`#${show.number}: fetch failed`); continue; }

    // Setlist.fm doesn't have a dedicated support acts field in the API —
    // but the info field sometimes contains them, and artist name is the headliner.
    const info = data.info || '';
    const artist = data.artist?.name;
    const tour = data.tour?.name || '';

    console.log(`\n#${show.number} — ${artist}`);
    console.log(`  Tour: ${tour}`);
    if (info) console.log(`  Info: ${info}`);
    // Print all sets to see if support acts appear
    if (data.sets?.set) {
      for (const set of data.sets.set) {
        if (set.name) console.log(`  Set: "${set.name}"`);
        if (set.encore) console.log(`  Set: Encore`);
      }
    }
  }
}

main().catch(console.error);
