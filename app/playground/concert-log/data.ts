export interface Concert {
  artists: string[];
  headline: string;
  venue: string;
  city: string;
  date: string;
  year: number;
  notes?: string;
  isFestival?: boolean;
}

export interface GraphNode {
  id: string;
  label: string;
  count: number;
}

export interface GraphEdge {
  source: string;
  target: string;
  weight: number;
}

export const concerts: Concert[] = [
  {
    artists: ['Jimmy Eat World', 'Illuminati Hotties', 'Motion City Soundtrack'],
    headline: 'Jimmy Eat World',
    venue: 'Doug Mitchell Thunderbird Sports Centre',
    city: 'Vancouver, BC',
    date: '2026-07-19',
    year: 2026,
    notes: '25 Years of Bleed American',
  },
  {
    artists: ['Movements', 'Balance and Composure', 'Midrift', 'Niis'],
    headline: 'Movements',
    venue: 'Showbox SoDo',
    city: 'Seattle, WA',
    date: '2026-10-07',
    year: 2026,
    notes: 'Happier Now USA Tour',
  },
  {
    artists: ['Palace'],
    headline: 'Palace',
    venue: 'Chan Centre',
    city: 'Vancouver, BC',
    date: '2026-10-16',
    year: 2026,
  },
  {
    artists: ['Coldplay'],
    headline: 'Coldplay',
    venue: 'Volvo Ocean Race Destination Village',
    city: 'Abu Dhabi, UAE',
    date: '2011-12-31',
    year: 2011,
    notes: 'Mylo Xyloto Tour',
  },
  {
    artists: ['30 Seconds to Mars'],
    headline: '30 Seconds to Mars',
    venue: 'du Arena',
    city: 'Abu Dhabi, UAE',
    date: '2011-03-11',
    year: 2011,
    notes: 'Into the Wild Tour',
  },
  {
    artists: ['Foxing', 'Now, Now'],
    headline: 'Foxing',
    venue: 'Biltmore Cabaret',
    city: 'Vancouver, BC',
    date: '2019-05-18',
    year: 2019,
  },
  {
    artists: ['Seahaven'],
    headline: 'Seahaven',
    venue: 'Biltmore Cabaret',
    city: 'Vancouver, BC',
    date: '2017-01-01',
    year: 2017,
    notes: 'Exact date unconfirmed',
  },
  {
    artists: ['Enter Shikari', 'Hands Like Houses', 'The White Noise'],
    headline: 'Enter Shikari',
    venue: 'The Gramercy Theatre',
    city: 'New York, NY',
    date: '2016-05-05',
    year: 2016,
    notes: 'The Mindsweep Tour',
  },
  {
    artists: ['Ra Ra Riot', 'Three Days Grace', 'Soundgarden', 'Billy Talent', 'Arkells', 'Death Cab for Cutie', 'Dropkick Murphys', 'Edward Sharpe & the Magnetic Zeros', 'The John Butler Trio', 'Mother Mother', 'A Perfect Circle', 'Rise Against', 'Skrillex', 'Tegan and Sara'],
    headline: 'Ottawa Bluesfest 2011',
    venue: 'LeBreton Flats Park',
    city: 'Ottawa, ON',
    date: '2011-07-01',
    year: 2011,
    notes: 'Festival. Stage collapsed during Cheap Trick set on July 17.',
    isFestival: true,
  },
  {
    artists: ['We Are Scientists'],
    headline: 'We Are Scientists',
    venue: 'Unknown venue',
    city: 'London, UK',
    date: '2011-01-01',
    year: 2011,
    notes: 'Near London, 2010–2012. Exact date and venue unconfirmed.',
  },
  {
    artists: ['Movements', 'Turnover', 'Queen of Jeans'],
    headline: 'Movements',
    venue: 'The Pearl',
    city: 'Vancouver, BC',
    date: '2024-09-28',
    year: 2024,
  },
  {
    artists: ['Movements', 'Good Charlotte', 'Silverstein', 'Palaye Royale'],
    headline: 'Movements',
    venue: 'Commodore Ballroom',
    city: 'Vancouver, BC',
    date: '2017-04-10',
    year: 2017,
    notes: 'Spring 2017 Tour',
  },
  {
    artists: ['Capsize', 'To the Wind'],
    headline: 'Capsize',
    venue: 'The 333',
    city: 'Vancouver, BC',
    date: '2015-02-21',
    year: 2015,
    notes: 'West Coast Tour February 2015',
  },
  {
    artists: ['Capsize'],
    headline: 'Capsize',
    venue: 'El Corazón',
    city: 'Seattle, WA',
    date: '2017-03-11',
    year: 2017,
    notes: 'The Polar Similar Tour',
  },
  {
    artists: ['Foxing', 'Gates'],
    headline: 'Foxing',
    venue: 'The 333',
    city: 'Vancouver, BC',
    date: '2014-11-22',
    year: 2014,
  },
  {
    artists: ['The Postal Service', 'Death Cab for Cutie', 'The Beths'],
    headline: 'The Postal Service',
    venue: 'Climate Pledge Arena',
    city: 'Seattle, WA',
    date: '2023-10-07',
    year: 2023,
    notes: 'Give Up/Transatlanticism 20th Anniversary Tour',
  },
  {
    artists: ['Turnover', 'Balance and Composure', 'Tigers Jaw'],
    headline: 'Turnover',
    venue: 'The Moore Theatre',
    city: 'Seattle, WA',
    date: '2025-05-21',
    year: 2025,
    notes: 'Peripheral Vision 10 Year Anniversary Tour',
  },
  {
    artists: ['The Hotelier', 'Told Slant', 'Loone'],
    headline: 'The Hotelier',
    venue: 'The Vera Project',
    city: 'Seattle, WA',
    date: '2016-05-31',
    year: 2016,
  },
  {
    artists: ['The National', 'Alvvays'],
    headline: 'The National',
    venue: 'Deer Lake Park',
    city: 'Burnaby, BC',
    date: '2019-08-28',
    year: 2019,
    notes: 'I Am Easy to Find Tour',
  },
  {
    artists: ['Bon Iver', 'Hurray for the Riff Raff'],
    headline: 'Bon Iver',
    venue: 'Deer Lake Park',
    city: 'Burnaby, BC',
    date: '2018-05-26',
    year: 2018,
    notes: '22, A Million Tour',
  },
  {
    artists: ['Bring Me the Horizon', 'Parkway Drive', 'Architects', 'Deez Nuts', 'While She Sleeps'],
    headline: 'Bring Me the Horizon',
    venue: 'Commodore Ballroom',
    city: 'Vancouver, BC',
    date: '2011-09-07',
    year: 2011,
  },
  {
    artists: ['3OH!3', 'A Day to Remember', 'Basement', 'Chiodos', 'Coheed and Cambria', 'Dance Gavin Dance', 'Fall Out Boy', 'Jimmy Eat World', 'Killswitch Engage', 'LS Dunes', 'My Chemical Romance', 'Movements', 'Red Jumpsuit Apparatus', 'Saosin', 'Silverstein', 'The Used', 'Underoath'],
    headline: 'When We Were Young 2024',
    venue: 'Las Vegas Festival Grounds',
    city: 'Las Vegas, NV',
    date: '2024-10-19',
    year: 2024,
    notes: 'Festival',
    isFestival: true,
  },
  {
    artists: ['Chiodos', 'Saosin', 'Underoath'],
    headline: 'Warped Tour 2009',
    venue: 'Race City Speedway',
    city: 'Calgary, AB',
    date: '2009-08-12',
    year: 2009,
    notes: 'Festival',
    isFestival: true,
  },
  {
    artists: ['Touché Amoré', 'Thursday', 'Basement', 'Cities Aviv'],
    headline: 'Touché Amoré',
    venue: 'Showbox SoDo',
    city: 'Seattle, WA',
    date: '2017-04-15',
    year: 2017,
  },
  {
    artists: ['Touché Amoré', 'mewithoutYou', 'Seahaven', 'Drug Church'],
    headline: 'Touché Amoré',
    venue: 'Neumos',
    city: 'Seattle, WA',
    date: '2014-02-09',
    year: 2014,
  },
  {
    artists: ['Touché Amoré', 'Turnstile', 'Culture Abuse', 'Razorbump', 'Odd Man Out'],
    headline: 'Touché Amoré',
    venue: 'El Corazón',
    city: 'Seattle, WA',
    date: '2018-04-17',
    year: 2018,
  },
  {
    artists: ['Being as an Ocean', 'Hundredth', 'Trophy Eyes'],
    headline: 'Being as an Ocean',
    venue: 'El Corazón',
    city: 'Seattle, WA',
    date: '2016-10-14',
    year: 2016,
  },
  {
    artists: ['Counterparts', 'Expire', 'Gideon', 'Knocked Loose'],
    headline: 'Counterparts',
    venue: 'The Cobalt',
    city: 'Vancouver, BC',
    date: '2016-03-24',
    year: 2016,
  },
  {
    artists: ['La Dispute', 'Pictoria Vark', 'Sweet Pill'],
    headline: 'La Dispute',
    venue: 'Vogue Theatre',
    city: 'Vancouver, BC',
    date: '2022-10-09',
    year: 2022,
    notes: 'Wildlife 10+1 Tour',
  },
  {
    artists: ['La Dispute', 'Gouge Away', 'Slow Mass'],
    headline: 'La Dispute',
    venue: 'Vogue Theatre',
    city: 'Vancouver, BC',
    date: '2019-05-06',
    year: 2019,
  },
  {
    artists: ['Touché Amoré', 'Vein.fm', 'Militarie Gun', 'Scowl'],
    headline: 'Touché Amoré',
    venue: 'Rickshaw Theatre',
    city: 'Vancouver, BC',
    date: '2022-04-08',
    year: 2022,
  },
  {
    artists: ['La Dispute', 'From Indian Lakes', 'Flooding'],
    headline: 'La Dispute',
    venue: 'Neptune Theatre',
    city: 'Seattle, WA',
    date: '2026-05-01',
    year: 2026,
  },
  {
    artists: ['Brand New'],
    headline: 'Brand New',
    venue: 'WaMu Theater',
    city: 'Seattle, WA',
    date: '2025-05-30',
    year: 2025,
    notes: '2025 Tour',
  },
  {
    artists: ['Thrice', 'Modern Color', 'Downward'],
    headline: 'Thrice',
    venue: 'Commodore Ballroom',
    city: 'Vancouver, BC',
    date: '2025-11-17',
    year: 2025,
  },
  {
    artists: ['Basement', 'The Front Bottoms', 'Bad Bad Hats'],
    headline: 'Basement',
    venue: 'Neptune Theatre',
    city: 'Seattle, WA',
    date: '2017-11-04',
    year: 2017,
  },
  {
    artists: ['Bring Me the Horizon', 'Underoath', 'Beartooth'],
    headline: 'Bring Me the Horizon',
    venue: 'WaMu Theater',
    city: 'Seattle, WA',
    date: '2017-04-01',
    year: 2017,
  },
  {
    artists: ['Circa Survive', 'mewithoutYou', 'Turnover'],
    headline: 'Circa Survive',
    venue: 'Showbox SoDo',
    city: 'Seattle, WA',
    date: '2017-02-18',
    year: 2017,
  },
  {
    artists: ['Into It. Over It.', 'The World Is a Beautiful Place', 'Sidekicks', 'Pinegrove'],
    headline: 'Into It. Over It.',
    venue: 'The Crocodile',
    city: 'Seattle, WA',
    date: '2016-03-28',
    year: 2016,
  },
  {
    artists: ['Sigur Rós'],
    headline: 'Sigur Rós',
    venue: 'Queen Elizabeth Theatre',
    city: 'Vancouver, BC',
    date: '2016-09-18',
    year: 2016,
    notes: '2016 North American Tour',
  },
  {
    artists: ['Thrice', 'La Dispute', 'nothing,nowhere.'],
    headline: 'Thrice',
    venue: 'Commodore Ballroom',
    city: 'Vancouver, BC',
    date: '2016-09-18',
    year: 2016,
  },
  {
    artists: ['Thrice', 'La Dispute', 'nothing,nowhere.'],
    headline: 'Thrice',
    venue: 'Showbox SoDo',
    city: 'Seattle, WA',
    date: '2016-09-17',
    year: 2016,
  },
  {
    artists: ['Brand New', 'mewithoutYou'],
    headline: 'Brand New',
    venue: 'Vogue Theatre',
    city: 'Vancouver, BC',
    date: '2016-06-01',
    year: 2016,
    notes: '2016 Canadian Tour',
  },
  {
    artists: ['Being as an Ocean', 'Silverstein', 'Emarosa', 'Youth Decay', 'Rarity'],
    headline: 'Being as an Ocean',
    venue: 'The Imperial',
    city: 'Vancouver, BC',
    date: '2016-03-08',
    year: 2016,
  },
  {
    artists: ['American Football', 'David Bazan'],
    headline: 'American Football',
    venue: 'Neptune Theatre',
    city: 'Seattle, WA',
    date: '2016-02-26',
    year: 2016,
  },
  {
    artists: ['La Dispute', 'Gouge Away'],
    headline: 'La Dispute',
    venue: 'El Corazón',
    city: 'Seattle, WA',
    date: '2019-05-07',
    year: 2019,
  },
  {
    artists: ['Defeater', 'Counterparts', 'Capsize', 'Better Off', 'Hotel Books'],
    headline: 'Defeater',
    venue: 'El Corazón',
    city: 'Seattle, WA',
    date: '2015-04-20',
    year: 2015,
  },
  {
    artists: ['This Will Destroy You'],
    headline: 'This Will Destroy You',
    venue: 'Electric Owl',
    city: 'Vancouver, BC',
    date: '2015-03-25',
    year: 2015,
    notes: 'Another Language tour',
  },
  {
    artists: ['The World Is a Beautiful Place', 'Foxing', 'TTNG', 'Brightside', 'Great Grandpa'],
    headline: 'The World Is a Beautiful Place',
    venue: 'The Vera Project',
    city: 'Seattle, WA',
    date: '2014-11-16',
    year: 2014,
  },
  {
    artists: ['Circa Survive', 'Title Fight', 'Tera Melos'],
    headline: 'Circa Survive',
    venue: 'Showbox SoDo',
    city: 'Seattle, WA',
    date: '2014-11-23',
    year: 2014,
  },
  {
    artists: ['Tokyo Police Club', 'Said the Whale', 'Pack A.D.'],
    headline: 'Tokyo Police Club',
    venue: 'Commodore Ballroom',
    city: 'Vancouver, BC',
    date: '2014-11-15',
    year: 2014,
    notes: 'Two shows (all-ages & 19+)',
  },
  {
    artists: ['alt-J', 'The Acid'],
    headline: 'alt-J',
    venue: 'Orpheum Theatre',
    city: 'Vancouver, BC',
    date: '2014-10-14',
    year: 2014,
    notes: 'This Is All Yours Tour',
  },
  {
    artists: ['Being as an Ocean', 'Fit for a King', 'Gideon', 'Wolves at the Gate', 'Capsize'],
    headline: 'Being as an Ocean',
    venue: 'Studio Seven',
    city: 'Seattle, WA',
    date: '2014-10-04',
    year: 2014,
  },
  {
    artists: ['Brand New'],
    headline: 'Brand New',
    venue: 'Vogue Theatre',
    city: 'Vancouver, BC',
    date: '2014-09-01',
    year: 2014,
  },
  {
    artists: ['La Dispute'],
    headline: 'La Dispute',
    venue: 'Bush Hall',
    city: 'London, UK',
    date: '2014-05-22',
    year: 2014,
  },
  {
    artists: ['La Dispute'],
    headline: 'La Dispute',
    venue: 'Bush Hall',
    city: 'London, UK',
    date: '2014-05-21',
    year: 2014,
  },
  {
    artists: ['Bring Me the Horizon', 'Of Mice & Men', 'letlive.', 'Issues'],
    headline: 'Bring Me the Horizon',
    venue: 'Vogue Theatre',
    city: 'Vancouver, BC',
    date: '2014-03-25',
    year: 2014,
  },
  {
    artists: ['La Dispute', 'Pianos Become the Teeth', 'Mansions'],
    headline: 'La Dispute',
    venue: 'El Corazón',
    city: 'Seattle, WA',
    date: '2014-04-01',
    year: 2014,
    notes: 'Rooms of the House Tour',
  },
  {
    artists: ['Protest the Hero', 'Architects', 'Affiance', 'The Kindred'],
    headline: 'Protest the Hero',
    venue: 'Vogue Theatre',
    city: 'Vancouver, BC',
    date: '2013-11-18',
    year: 2013,
  },
  {
    artists: ['Architects', 'Being as an Ocean', 'Stray From the Path', 'My Ticket Home'],
    headline: 'Architects',
    venue: 'Rio Theatre',
    city: 'Vancouver, BC',
    date: '2014-09-10',
    year: 2014,
  },
  {
    artists: ['AFI', 'Touché Amoré', 'Coming'],
    headline: 'AFI',
    venue: 'Commodore Ballroom',
    city: 'Vancouver, BC',
    date: '2013-11-02',
    year: 2013,
  },
  {
    artists: ['The National', 'Frightened Rabbit'],
    headline: 'The National',
    venue: 'PNE Amphitheatre',
    city: 'Vancouver, BC',
    date: '2013-09-22',
    year: 2013,
  },
  {
    artists: ['Sufjan Stevens'],
    headline: 'Sufjan Stevens',
    venue: 'The Orpheum',
    city: 'Vancouver, BC',
    date: '2015-06-09',
    year: 2015,
    notes: 'Carrie & Lowell Tour',
  },
  {
    artists: ['Saves the Day', 'Into It. Over It.', 'Hostage Calm'],
    headline: 'Saves the Day',
    venue: 'Biltmore Cabaret',
    city: 'Vancouver, BC',
    date: '2013-09-07',
    year: 2013,
  },
  {
    artists: ['The xx'],
    headline: 'The xx',
    venue: 'Queen Elizabeth Theatre',
    city: 'Vancouver, BC',
    date: '2013-05-24',
    year: 2013,
    notes: 'Coexist Tour',
  },
  {
    artists: ['alt-J'],
    headline: 'alt-J',
    venue: 'Commodore Ballroom',
    city: 'Vancouver, BC',
    date: '2013-04-07',
    year: 2013,
    notes: 'An Awesome Wave Tour',
  },
  {
    artists: ['3OH!3', 'August Burns Red', 'Blessthefall', 'Bring Me the Horizon', 'Chiodos', 'Defeater', 'Hawthorne Heights', 'Silverstein', 'The Summer Set'],
    headline: 'Warped Tour 2013',
    venue: 'The Flats at Molson Canadian Amphitheatre',
    city: 'Toronto, ON',
    date: '2013-07-05',
    year: 2013,
    notes: 'Festival',
    isFestival: true,
  },
  {
    artists: ['Alexisonfire'],
    headline: 'Alexisonfire',
    venue: 'Edmonton Event Centre, West Edmonton Mall',
    city: 'Edmonton, AB',
    date: '2010-11-29',
    year: 2010,
    notes: 'Farewell Tour',
  },
  {
    artists: ['A Day to Remember', 'Attack Attack!', 'August Burns Red', 'D.R.U.G.S.', 'Dance Gavin Dance', 'Enter Shikari', 'NeverShoutNever', 'Of Mice & Men', 'The Devil Wears Prada', '3OH!3'],
    headline: 'Warped Tour 2011',
    venue: 'Arrow Hall',
    city: 'Toronto, ON',
    date: '2011-07-15',
    year: 2011,
    notes: 'Festival',
    isFestival: true,
  },
  {
    artists: ['Sufjan Stevens'],
    headline: 'Sufjan Stevens',
    venue: 'The Orpheum',
    city: 'Vancouver, BC',
    date: '2010-10-28',
    year: 2010,
    notes: 'Age of Adz Tour',
  },
  {
    artists: ['Bring Me the Horizon', 'Parkway Drive', 'Alesana', 'The Word Alive', 'In Fear and Faith'],
    headline: 'Warped Tour 2010',
    venue: 'Northlands Grounds',
    city: 'Edmonton, AB',
    date: '2010-08-05',
    year: 2010,
    notes: 'Festival',
    isFestival: true,
  },
  {
    artists: ['Jimmy Eat World'],
    headline: 'Jimmy Eat World',
    venue: "Red's / Edmonton Event Centre, West Edmonton Mall",
    city: 'Edmonton, AB',
    date: '2008-07-11',
    year: 2008,
    notes: 'Chase This Light Tour',
  },
  {
    artists: ['Coheed and Cambria'],
    headline: 'Coheed and Cambria',
    venue: "Red's / Edmonton Event Centre, West Edmonton Mall",
    city: 'Edmonton, AB',
    date: '2006-01-01',
    year: 2006,
    notes: 'Good Apollo, I\'m Burning Star IV, Vol. 2: No World for Tomorrow. Exact date unconfirmed.',
  },
];

// Derive artist appearance counts from concerts array
const artistCounts: Record<string, number> = {};
for (const concert of concerts) {
  for (const artist of concert.artists) {
    artistCounts[artist] = (artistCounts[artist] || 0) + 1;
  }
}

// Artists seen 2+ times
const MULTI_SEEN = new Set(
  Object.entries(artistCounts)
    .filter(([, count]) => count >= 2)
    .map(([artist]) => artist)
);

export const graphNodes: GraphNode[] = Object.entries(artistCounts)
  .filter(([, count]) => count >= 2)
  .map(([id, count]) => ({ id, label: id, count }));

// Compute shared-bill edges between multi-seen artists
const edgeTally: Record<string, number> = {};
for (const concert of concerts) {
  const nodeArtists = concert.artists.filter(a => MULTI_SEEN.has(a));
  for (let i = 0; i < nodeArtists.length; i++) {
    for (let j = i + 1; j < nodeArtists.length; j++) {
      const key = [nodeArtists[i], nodeArtists[j]].sort().join('|||');
      edgeTally[key] = (edgeTally[key] || 0) + 1;
    }
  }
}

export const graphEdges: GraphEdge[] = Object.entries(edgeTally).map(([key, weight]) => {
  const [source, target] = key.split('|||');
  return { source, target, weight };
});

// Satellite map: for each multi-seen artist, list the single-show artists they shared a bill with
export const satelliteMap: Record<string, string[]> = {};
for (const concert of concerts) {
  const multiArtists = concert.artists.filter(a => MULTI_SEEN.has(a));
  const singleArtists = concert.artists.filter(a => !MULTI_SEEN.has(a));
  for (const multi of multiArtists) {
    if (!satelliteMap[multi]) satelliteMap[multi] = [];
    for (const single of singleArtists) {
      if (!satelliteMap[multi].includes(single)) {
        satelliteMap[multi].push(single);
      }
    }
  }
}
