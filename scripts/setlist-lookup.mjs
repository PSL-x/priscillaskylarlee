const API_KEY = 'dDbzL5-DQiPygS4KXRnt6Uy8NGMWo_eb84_d';

const concerts = [
  { number: 86, headline: 'The Postal Service', date: '2023-10-07', venue: 'Climate Pledge Arena', city: 'Seattle' },
  { number: 85, headline: 'Turnover', date: '2025-05-21', venue: 'The Moore Theatre', city: 'Seattle' },
  { number: 84, headline: 'The Hotelier', date: '2016-05-31', venue: 'The Vera Project', city: 'Seattle' },
  { number: 83, headline: 'The National', date: '2019-08-28', venue: 'Deer Lake Park', city: 'Burnaby' },
  { number: 82, headline: 'Bon Iver', date: '2018-05-26', venue: 'Deer Lake Park', city: 'Burnaby' },
  { number: 81, headline: 'Bring Me the Horizon', date: '2011-09-07', venue: 'Commodore Ballroom', city: 'Vancouver' },
  { number: 78, headline: 'Touché Amoré', date: '2017-04-15', venue: 'Showbox SoDo', city: 'Seattle' },
  { number: 77, headline: 'Touché Amoré', date: '2014-02-09', venue: 'Neumos', city: 'Seattle' },
  { number: 76, headline: 'Touché Amoré', date: '2018-04-17', venue: 'El Corazón', city: 'Seattle' },
  { number: 75, headline: 'Being as an Ocean', date: '2016-10-14', venue: 'El Corazón', city: 'Seattle' },
  { number: 75, headline: 'Counterparts', date: '2016-03-24', venue: 'The Cobalt', city: 'Vancouver' },
  { number: 74, headline: 'La Dispute', date: '2022-10-09', venue: 'Vogue Theatre', city: 'Vancouver' },
  { number: 72, headline: 'La Dispute', date: '2019-05-06', venue: 'Vogue Theatre', city: 'Vancouver' },
  { number: 71, headline: 'Touché Amoré', date: '2022-04-08', venue: 'Rickshaw Theatre', city: 'Vancouver' },
  { number: 70, headline: 'La Dispute', date: '2026-05-01', venue: 'Neptune Theatre', city: 'Seattle' },
  { number: 69, headline: 'Brand New', date: '2025-05-30', venue: 'WaMu Theater', city: 'Seattle' },
  { number: 68, headline: 'Thrice', date: '2025-11-17', venue: 'Commodore Ballroom', city: 'Vancouver' },
  { number: 67, headline: 'Basement', date: '2017-11-04', venue: 'Neptune Theatre', city: 'Seattle' },
  { number: 66, headline: 'Bring Me the Horizon', date: '2017-04-01', venue: 'WaMu Theater', city: 'Seattle' },
  { number: 65, headline: 'Circa Survive', date: '2017-02-18', venue: 'Showbox SoDo', city: 'Seattle' },
  { number: 64, headline: 'Into It. Over It.', date: '2016-03-28', venue: 'The Crocodile', city: 'Seattle' },
  { number: 63, headline: 'Sigur Rós', date: '2016-09-18', venue: 'Queen Elizabeth Theatre', city: 'Vancouver' },
  { number: 62, headline: 'Thrice', date: '2016-09-18', venue: 'Commodore Ballroom', city: 'Vancouver' },
  { number: 61, headline: 'Thrice', date: '2016-09-17', venue: 'Showbox SoDo', city: 'Seattle' },
  { number: 60, headline: 'Brand New', date: '2016-06-01', venue: 'Vogue Theatre', city: 'Vancouver' },
  { number: 59, headline: 'Being as an Ocean', date: '2016-03-08', venue: 'The Imperial', city: 'Vancouver' },
  { number: 58, headline: 'American Football', date: '2016-02-26', venue: 'Neptune Theatre', city: 'Seattle' },
  { number: 57, headline: 'La Dispute', date: '2019-05-07', venue: 'El Corazón', city: 'Seattle' },
  { number: 55, headline: 'Defeater', date: '2015-04-20', venue: 'El Corazón', city: 'Seattle' },
  { number: 54, headline: 'This Will Destroy You', date: '2015-03-25', venue: 'Electric Owl', city: 'Vancouver' },
  { number: 53, headline: 'The World Is a Beautiful Place', date: '2014-11-16', venue: 'The Vera Project', city: 'Seattle' },
  { number: 52, headline: 'Circa Survive', date: '2014-11-23', venue: 'Showbox SoDo', city: 'Seattle' },
  { number: 51, headline: 'Tokyo Police Club', date: '2014-11-15', venue: 'Commodore Ballroom', city: 'Vancouver' },
  { number: 50, headline: 'alt-J', date: '2014-10-14', venue: 'Orpheum Theatre', city: 'Vancouver' },
  { number: 49, headline: 'Being as an Ocean', date: '2014-10-04', venue: 'Studio Seven', city: 'Seattle' },
  { number: 48, headline: 'Brand New', date: '2014-09-01', venue: 'Vogue Theatre', city: 'Vancouver' },
  { number: 47, headline: 'La Dispute', date: '2014-05-22', venue: 'Bush Hall', city: 'London' },
  { number: 46, headline: 'La Dispute', date: '2014-05-21', venue: 'Bush Hall', city: 'London' },
  { number: 45, headline: 'Bring Me the Horizon', date: '2014-03-25', venue: 'Vogue Theatre', city: 'Vancouver' },
  { number: 44, headline: 'La Dispute', date: '2014-04-01', venue: 'El Corazón', city: 'Seattle' },
  { number: 42, headline: 'Protest the Hero', date: '2013-11-18', venue: 'Vogue Theatre', city: 'Vancouver' },
  { number: 41, headline: 'Architects', date: '2014-09-10', venue: 'Rio Theatre', city: 'Vancouver' },
  { number: 40, headline: 'AFI', date: '2013-11-02', venue: 'Commodore Ballroom', city: 'Vancouver' },
  { number: 39, headline: 'The National', date: '2013-09-22', venue: 'PNE Amphitheatre', city: 'Vancouver' },
  { number: 38, headline: 'Sufjan Stevens', date: '2015-06-09', venue: 'The Orpheum', city: 'Vancouver' },
  { number: 37, headline: 'Saves the Day', date: '2013-09-07', venue: 'Biltmore Cabaret', city: 'Vancouver' },
  { number: 36, headline: 'The xx', date: '2013-05-24', venue: 'Queen Elizabeth Theatre', city: 'Vancouver' },
  { number: 35, headline: 'alt-J', date: '2013-04-07', venue: 'Commodore Ballroom', city: 'Vancouver' },
  { number: 33, headline: 'Alexisonfire', date: '2010-11-29', venue: 'Edmonton Event Centre', city: 'Edmonton' },
  { number: 31, headline: 'Sufjan Stevens', date: '2010-10-28', venue: 'The Orpheum', city: 'Vancouver' },
  { number: 29, headline: 'Jimmy Eat World', date: '2008-07-11', venue: 'Edmonton Event Centre', city: 'Edmonton' },
];

async function searchSetlist(artist, date, city) {
  const [year, month, day] = date.split('-');
  const dateFormatted = `${day}-${month}-${year}`;
  const url = `https://api.setlist.fm/rest/1.0/search/setlists?artistName=${encodeURIComponent(artist)}&date=${dateFormatted}&cityName=${encodeURIComponent(city)}&p=1`;

  const res = await fetch(url, {
    headers: {
      'x-api-key': API_KEY,
      'Accept': 'application/json',
    },
  });

  if (!res.ok) return null;
  const data = await res.json();
  return data.setlist?.[0] || null;
}

async function main() {
  const results = [];

  for (const concert of concerts) {
    await new Promise(r => setTimeout(r, 300)); // rate limit

    const setlist = await searchSetlist(concert.headline, concert.date, concert.city);

    if (!setlist) {
      results.push({ ...concert, found: false, openers: [] });
      continue;
    }

    // Look for support acts in the tour/info field or sets
    const tourName = setlist.tour?.name || '';
    const info = setlist.info || '';

    results.push({
      ...concert,
      found: true,
      setlistUrl: setlist.url,
      tourName,
      info,
      openers: [],
    });
  }

  console.log('\n=== SETLIST RESULTS ===\n');
  for (const r of results) {
    console.log(`#${r.number} ${r.headline} — ${r.date} — ${r.city}`);
    if (!r.found) {
      console.log('  ❌ Not found on Setlist.fm');
    } else {
      console.log(`  ✓ ${r.setlistUrl}`);
      if (r.tourName) console.log(`  Tour: ${r.tourName}`);
      if (r.info) console.log(`  Info: ${r.info}`);
    }
    console.log('');
  }
}

main().catch(console.error);
