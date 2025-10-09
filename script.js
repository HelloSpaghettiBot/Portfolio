
// MOBILE NAVIGATION
document.getElementById('mobile-menu-btn').addEventListener('click', () => {
  const menu = document.getElementById('mobile-menu');
  menu.classList.toggle('hidden');
});

// GUMROAD PRODUCTS
const gumroadURL = 'https://tempoutlet.gumroad.com';
fetch(gumroadURL)
  .then(() => {
    // fallback demo since Gumroad doesn’t allow API CORS directly
    const products = [
      { title: 'Controller Mapper', image: 'https://public-files.gumroad.com/variants/xyz.jpg', url: 'https://lulssquad.itch.io/controller-mapper' },
      { title: 'Custom Launcher', image: 'https://public-files.gumroad.com/variants/xyz2.jpg', url: 'https://lulssquad.itch.io/eoserv-custom-launcher' },
      { title: 'Text-Based RPG Engine', image: 'https://public-files.gumroad.com/variants/xyz3.jpg', url: 'https://lulssquad.itch.io/text-based-rpg-kozaengine' }
    ];
    const grid = document.getElementById('products-grid');
    grid.innerHTML = products.map(p => `
      <div class="card p-4 text-center">
        <img src="${p.image}" alt="${p.title}" class="w-full h-48 object-cover rounded-lg mb-4">
        <h3 class="font-semibold text-lg mb-2">${p.title}</h3>
        <a href="${p.url}" target="_blank" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg inline-block">View</a>
      </div>
    `).join('');
  });

// BLOG POSTS (dynamic via Blogger feed)
fetch('https://lockedinreviews.blogspot.com/feeds/posts/default?alt=json')
  .then(res => res.json())
  .then(data => {
    const posts = data.feed.entry.slice(0,6).map(post => {
      const title = post.title.$t;
      const link = post.link.find(l => l.rel === 'alternate').href;
      const content = post.summary ? post.summary.$t : '';
      return { title, link, content };
    });
    const blogGrid = document.getElementById('blog-grid');
    blogGrid.innerHTML = posts.map(p => `
      <div class="card p-6">
        <h3 class="font-semibold text-xl mb-3">${p.title}</h3>
        <p class="text-gray-400 text-sm mb-4">${p.content.substring(0,150)}...</p>
        <a href="${p.link}" target="_blank" class="text-blue-400 hover:underline">Read More</a>
      </div>
    `).join('');
  })
  .catch(() => {
    document.getElementById('blog-grid').innerHTML = '<p class="text-gray-400">Unable to load blog posts.</p>';
  });
