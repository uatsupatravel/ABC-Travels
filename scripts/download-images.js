const fs = require('fs');
const path = require('path');
const https = require('https');

const IMAGES_TO_DOWNLOAD = [
  // Hero
  { url: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=2400&q=85', dest: 'public/images/hero/taj-dawn-mist.jpg' },
  { url: 'https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=2400&q=85', dest: 'public/images/hero/lake-palace-udaipur.jpg' },
  { url: 'https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=2400&q=85', dest: 'public/images/hero/kashmir-shikara-floating.jpg' },
  { url: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=2400&q=85', dest: 'public/images/hero/varanasi-ganga-aarti.jpg' },
  { url: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=2400&q=85', dest: 'public/images/hero/ladakh-monastery-clouds.jpg' },

  // Welcome
  { url: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1600&q=85', dest: 'public/images/welcome/taj-balcony-sunrise.jpg' },
  { url: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1600&q=85', dest: 'public/images/welcome/backwaters-twilight.jpg' },

  // Realms
  { url: 'https://images.unsplash.com/photo-1609947017136-9daf32a5eb16?auto=format&fit=crop&w=1600&q=85', dest: 'public/images/realms/rajasthan-amber-fort.jpg' },
  { url: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1600&q=85', dest: 'public/images/realms/ladakh-himalayas-pass.jpg' },
  { url: 'https://images.unsplash.com/photo-1598890777032-bde835ba27c2?auto=format&fit=crop&w=1600&q=85', dest: 'public/images/realms/kerala-tea-backwaters.jpg' },
  { url: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1600&q=85', dest: 'public/images/realms/ranthambore-tiger-wild.jpg' },

  // Destinations - Rajasthan
  { url: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=2000&q=85', dest: 'public/images/destinations/rajasthan/hero.jpg' },
  { url: 'https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1600&q=85', dest: 'public/images/destinations/rajasthan/udaipur-lake-palace.jpg' },
  { url: 'https://images.unsplash.com/photo-1609947017136-9daf32a5eb16?auto=format&fit=crop&w=1600&q=85', dest: 'public/images/destinations/rajasthan/jaipur-hawa-mahal.jpg' },
  { url: 'https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?auto=format&fit=crop&w=1600&q=85', dest: 'public/images/destinations/rajasthan/jodhpur-blue-city.jpg' },

  // Destinations - Kerala
  { url: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=2000&q=85', dest: 'public/images/destinations/kerala/hero.jpg' },
  { url: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1600&q=85', dest: 'public/images/destinations/kerala/alleppey-houseboat.jpg' },
  { url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1600&q=85', dest: 'public/images/destinations/kerala/munnar-tea-plantations.jpg' },
  { url: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1600&q=85', dest: 'public/images/destinations/kerala/kochi-chinese-nets.jpg' },

  // Destinations - Ladakh
  { url: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=2000&q=85', dest: 'public/images/destinations/ladakh/hero.jpg' },
  { url: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1600&q=85', dest: 'public/images/destinations/ladakh/pangong-lake-azure.jpg' },
  { url: 'https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?auto=format&fit=crop&w=1600&q=85', dest: 'public/images/destinations/ladakh/thiksey-monastery.jpg' },

  // Destinations - Ranthambore
  { url: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=2000&q=85', dest: 'public/images/destinations/ranthambore/hero.jpg' },
  { url: 'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=1600&q=85', dest: 'public/images/destinations/ranthambore/tiger-stalking-banyan.jpg' },
  { url: 'https://images.unsplash.com/photo-1562183667-a159d28118ec?auto=format&fit=crop&w=1600&q=85', dest: 'public/images/destinations/ranthambore/fort-ruins-jungle.jpg' },

  // Destinations - Varanasi
  { url: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=2000&q=85', dest: 'public/images/destinations/varanasi/hero.jpg' },
  { url: 'https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=1600&q=85', dest: 'public/images/destinations/varanasi/evening-ganga-aarti.jpg' },
  { url: 'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?auto=format&fit=crop&w=1600&q=85', dest: 'public/images/destinations/varanasi/sunrise-boat-ghats.jpg' },

  // Destinations - Goa
  { url: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=2000&q=85', dest: 'public/images/destinations/goa/hero.jpg' },
  { url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=85', dest: 'public/images/destinations/goa/heritage-portuguese-mansion.jpg' },
  { url: 'https://images.unsplash.com/photo-1587922546307-776227941871?auto=format&fit=crop&w=1600&q=85', dest: 'public/images/destinations/goa/secluded-cove-sunset.jpg' },

  // Tours - Royal Odyssey
  { url: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=2000&q=85', dest: 'public/images/tours/royal-odyssey/hero.jpg' },
  { url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1600&q=85', dest: 'public/images/tours/royal-odyssey/day1-delhi-imperial.jpg' },
  { url: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1600&q=85', dest: 'public/images/tours/royal-odyssey/day2-agra-amarvilas.jpg' },
  { url: 'https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1600&q=85', dest: 'public/images/tours/royal-odyssey/day3-jaipur-rambagh.jpg' },
  { url: 'https://images.unsplash.com/photo-1609947017136-9daf32a5eb16?auto=format&fit=crop&w=1600&q=85', dest: 'public/images/tours/royal-odyssey/day4-udaipur-pichola.jpg' },

  // Tours - Kerala Sanctuary
  { url: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=2000&q=85', dest: 'public/images/tours/kerala-sanctuary/hero.jpg' },
  { url: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1600&q=85', dest: 'public/images/tours/kerala-sanctuary/day1-kochi-heritage.jpg' },
  { url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1600&q=85', dest: 'public/images/tours/kerala-sanctuary/day2-munnar-plantations.jpg' },
  { url: 'https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1600&q=85', dest: 'public/images/tours/kerala-sanctuary/day3-alleppey-kettuvallam.jpg' },

  // Tours - Himalayan Expedition
  { url: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=2000&q=85', dest: 'public/images/tours/himalayan-expedition/hero.jpg' },
  { url: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1600&q=85', dest: 'public/images/tours/himalayan-expedition/day1-leh-palace.jpg' },
  { url: 'https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?auto=format&fit=crop&w=1600&q=85', dest: 'public/images/tours/himalayan-expedition/day2-nubra-valley.jpg' },

  // Tours - Sovereign Wild
  { url: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=2000&q=85', dest: 'public/images/tours/sovereign-wild/hero.jpg' },
  { url: 'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=1600&q=85', dest: 'public/images/tours/sovereign-wild/day1-delhi-safari-transit.jpg' },
  { url: 'https://images.unsplash.com/photo-1562183667-a159d28118ec?auto=format&fit=crop&w=1600&q=85', dest: 'public/images/tours/sovereign-wild/day2-ranthambore-morning-drive.jpg' },

  // Reviews
  { url: 'https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1600&q=85', dest: 'public/images/reviews/montgomery-udaipur-barge.jpg' },
  { url: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1600&q=85', dest: 'public/images/reviews/vance-kerala-houseboat.jpg' },
  { url: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1600&q=85', dest: 'public/images/reviews/sterling-tiger-safari.jpg' },
  { url: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1600&q=85', dest: 'public/images/reviews/dubois-himalayan-domes.jpg' },

  // About
  { url: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1600&q=85', dest: 'public/images/about/haveli-architecture.jpg' },
  { url: 'https://images.unsplash.com/photo-1566552881560-0be86c53957f?auto=format&fit=crop&w=1600&q=85', dest: 'public/images/about/royal-hospitality.jpg' },
  { url: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1600&q=85', dest: 'public/images/about/private-curation.jpg' },
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const fullDest = path.resolve(process.cwd(), dest);
    const dir = path.dirname(fullDest);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const file = fs.createWriteStream(fullDest);
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        return downloadFile(response.headers.location, dest).then(resolve).catch(reject);
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve(dest));
      });
    }).on('error', (err) => {
      fs.unlink(fullDest, () => {});
      reject(err);
    });
  });
}

async function run() {
  console.log(`Starting download of ${IMAGES_TO_DOWNLOAD.length} curated images...`);
  for (const item of IMAGES_TO_DOWNLOAD) {
    try {
      await downloadFile(item.url, item.dest);
      console.log(`✓ Downloaded: ${item.dest}`);
    } catch (e) {
      console.error(`✗ Failed: ${item.dest}`, e.message);
    }
  }
  console.log('All downloads completed!');
}

run();
