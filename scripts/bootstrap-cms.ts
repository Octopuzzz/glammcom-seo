#!/usr/bin/env node
/**
 * Bootstrap script — creates all crud-builder CMS tables for Irenne Art
 * Run: npx ts-node --esm scripts/bootstrap-cms.ts
 * or:  npx tsx scripts/bootstrap-cms.ts
 */

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
const EMAIL = process.env.ADMIN_EMAIL || 'admin@crudify.co.id';
const PASSWORD = process.env.ADMIN_PASSWORD || 'securepassword';

let TOKEN = '';

async function api(method: string, path: string, body?: unknown, auth = true) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(auth && TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    console.warn(`  ⚠️  ${method} ${path} → ${res.status}:`, JSON.stringify(json).slice(0, 200));
  }
  return { ok: res.ok, json };
}

// ─── Step 1: Login ─────────────────────────────────────────────────────────────
async function login() {
  console.log('🔐 Logging in as admin...');
  const { ok, json } = await api('POST', '/api/auth/login', { email: EMAIL, password: PASSWORD }, false);
  if (!ok) throw new Error('Login failed — check ADMIN_EMAIL and ADMIN_PASSWORD');
  TOKEN = json.data.token;
  console.log('  ✅ Logged in\n');
}

// ─── Step 2: Create Tables ─────────────────────────────────────────────────────
const TABLES = [
  {
    name: 'cp_hero',
    display_name: 'Hero Section',
    description: 'Landing page hero content',
    fields: [
      { name: 'id', type: 'uuid', primary_key: true, required: true },
      { name: 'headline', type: 'string', required: true },
      { name: 'subheadline', type: 'text' },
      { name: 'cta_text', type: 'string' },
      { name: 'cta_url', type: 'string' },
      { name: 'bg_image_url', type: 'text' },
      { name: 'artist_image_url', type: 'text' },
      { name: 'created_by', type: 'uuid' },
      { name: 'updated_by', type: 'uuid' },
    ],
    settings: { timestamps: true, soft_delete: true },
  },
  {
    name: 'cp_portfolio',
    display_name: 'Portfolio',
    description: 'Artwork portfolio items',
    fields: [
      { name: 'id', type: 'uuid', primary_key: true, required: true },
      { name: 'title', type: 'string', required: true },
      { name: 'description', type: 'text' },
      { name: 'image_url', type: 'text' },
      { name: 'category', type: 'string' },
      { name: 'medium', type: 'string' },
      { name: 'year', type: 'string' },
      { name: 'price', type: 'string' },
      { name: 'is_highlighted', type: 'boolean' },
      { name: 'order_index', type: 'integer' },
      { name: 'created_by', type: 'uuid' },
      { name: 'updated_by', type: 'uuid' },
    ],
    settings: { timestamps: true, soft_delete: true },
  },
  {
    name: 'cp_about',
    display_name: 'About',
    description: 'Artist about page content',
    fields: [
      { name: 'id', type: 'uuid', primary_key: true, required: true },
      { name: 'artist_name', type: 'string', required: true },
      { name: 'tagline', type: 'string' },
      { name: 'bio', type: 'text' },
      { name: 'story', type: 'text' },
      { name: 'image_url', type: 'text' },
      { name: 'instagram_url', type: 'string' },
      { name: 'email', type: 'string' },
      { name: 'years_active', type: 'integer' },
      { name: 'artworks_count', type: 'integer' },
      { name: 'exhibitions_count', type: 'integer' },
      { name: 'created_by', type: 'uuid' },
      { name: 'updated_by', type: 'uuid' },
    ],
    settings: { timestamps: true, soft_delete: true },
  },
  {
    name: 'cp_faq',
    display_name: 'FAQ',
    description: 'Frequently asked questions',
    fields: [
      { name: 'id', type: 'uuid', primary_key: true, required: true },
      { name: 'question', type: 'string', required: true },
      { name: 'answer', type: 'text', required: true },
      { name: 'order_index', type: 'integer' },
      { name: 'created_by', type: 'uuid' },
      { name: 'updated_by', type: 'uuid' },
    ],
    settings: { timestamps: true, soft_delete: true },
  },
];

async function createTables() {
  console.log('📐 Creating CMS tables...');
  for (const table of TABLES) {
    const { ok } = await api('POST', '/crud-builder/create-table', table);
    console.log(`  ${ok ? '✅' : '⚠️ '} ${table.name}`);
  }
  console.log();
}

// ─── Step 3: Set Public Read ───────────────────────────────────────────────────
async function setPublicRead() {
  console.log('🌐 Enabling public read on all CMS tables...');
  for (const table of TABLES) {
    const { ok } = await api('PUT', `/api/auth/tables/${table.name}/public`, { is_public_read: true });
    console.log(`  ${ok ? '✅' : '⚠️ '} ${table.name} → public read`);
  }
  console.log();
}

// ─── Step 4: Seed Data ─────────────────────────────────────────────────────────
async function seedData() {
  console.log('🌱 Seeding sample data...');

  await api('POST', '/api/cp_hero', {
    headline: 'Where Art Speaks the Heart',
    subheadline: 'Original paintings, illustrations & mixed media by Irenne — capturing emotion through color and form.',
    cta_text: 'Explore Portfolio',
    cta_url: '#portfolio',
    bg_image_url: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1920&q=80',
    artist_image_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80',
  });
  console.log('  ✅ Hero seeded');

  const portfolioItems = [
    { title: 'Golden Hour', description: 'A warm study of light fading over the Jakarta skyline.', image_url: 'https://images.unsplash.com/photo-1578301978018-3005759f48f7?w=800&q=80', category: 'Painting', medium: 'Oil on Canvas', year: '2024', price: 'IDR 4.500.000', is_highlighted: true, order_index: 1 },
    { title: 'Quiet Garden', description: 'Botanical meditation — layers of watercolor in stillness.', image_url: 'https://images.unsplash.com/photo-1490750967868-88df5691cc12?w=800&q=80', category: 'Watercolor', medium: 'Watercolor on Paper', year: '2024', price: 'IDR 2.800.000', is_highlighted: true, order_index: 2 },
    { title: 'Midnight Blue', description: 'Deep navy abstract exploring solitude and reflection.', image_url: 'https://images.unsplash.com/photo-1541692641319-981cc79ee10a?w=800&q=80', category: 'Abstract', medium: 'Acrylic on Canvas', year: '2023', price: 'IDR 3.200.000', is_highlighted: true, order_index: 3 },
    { title: 'Blossom Study I', description: 'Delicate floral series inspired by Javanese batik patterns.', image_url: 'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=800&q=80', category: 'Illustration', medium: 'Digital & Ink', year: '2024', price: 'IDR 1.500.000', is_highlighted: false, order_index: 4 },
    { title: 'Urban Texture', description: 'Mixed media piece exploring the layers of city life.', image_url: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80', category: 'Mixed Media', medium: 'Collage & Acrylic', year: '2023', price: 'IDR 2.100.000', is_highlighted: false, order_index: 5 },
    { title: 'Soft Light', description: 'Portrait study in soft diffused natural light.', image_url: 'https://images.unsplash.com/photo-1580136607311-6b9c7a55fb3e?w=800&q=80', category: 'Portrait', medium: 'Charcoal & Pastel', year: '2023', price: 'IDR 2.600.000', is_highlighted: false, order_index: 6 },
    { title: 'Archipelago Dreams', description: 'Abstract seascape inspired by Indonesian coastal beauty.', image_url: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=800&q=80', category: 'Painting', medium: 'Oil on Canvas', year: '2022', price: 'IDR 5.000.000', is_highlighted: false, order_index: 7 },
  ];

  for (const item of portfolioItems) {
    await api('POST', '/api/cp_portfolio', item);
  }
  console.log('  ✅ Portfolio items seeded (3 highlighted + 4 other)');

  await api('POST', '/api/cp_about', {
    artist_name: 'Irenne',
    tagline: 'Painter · Illustrator · Storyteller',
    bio: 'Irenne is a Jakarta-based visual artist whose work bridges the gap between traditional technique and contemporary emotion. With a background in fine arts and a decade of exhibiting across Southeast Asia, she creates pieces that linger long after you look away.',
    story: 'Art found me young — I was sketching in the margins of every notebook before I knew what "artist" meant. Growing up surrounded by batik patterns, wayang shadow plays, and the vivid street colors of Jakarta, I absorbed texture and pigment like a second language. Today I paint to process the world around me: its quiet moments, its chaos, its beauty.',
    image_url: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80',
    instagram_url: 'https://instagram.com/irenneart',
    email: 'hello@irenneart.com',
    years_active: 10,
    artworks_count: 200,
    exhibitions_count: 18,
  });
  console.log('  ✅ About seeded');

  const faqs = [
    { question: 'Do you accept commissioned artwork?', answer: 'Yes! I love working on commissions. Each piece is discussed in detail before I begin — size, palette, medium, and concept. Reach out via email or Instagram to start the conversation.', order_index: 1 },
    { question: 'How long does a commission take?', answer: 'Depending on size and complexity, commissions typically take 2–6 weeks. I always provide a timeline at the start and share progress photos along the way.', order_index: 2 },
    { question: 'Do you ship internationally?', answer: 'Yes! All artworks are carefully packed with archival materials and shipped worldwide. Shipping costs and timelines vary by destination — I will quote you accurately before checkout.', order_index: 3 },
    { question: 'Are prints available?', answer: 'Select works are available as high-quality giclée prints on fine art paper. Check the portfolio for items marked "Print Available" or message me directly.', order_index: 4 },
    { question: 'What payment methods do you accept?', answer: 'I accept bank transfer (BCA, Mandiri), GoPay, OVO, and PayPal for international buyers. A 50% deposit is required for all commissions before work begins.', order_index: 5 },
    { question: 'Can I visit your studio?', answer: 'Studio visits are by appointment only in Jakarta. I also participate in regular pop-up exhibitions — follow @irenneart on Instagram for announcements.', order_index: 6 },
  ];

  for (const faq of faqs) {
    await api('POST', '/api/cp_faq', faq);
  }
  console.log('  ✅ FAQ items seeded');
  console.log();
}

// ─── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log('🎨 Irenne Art — CMS Bootstrap\n');
  await login();
  await createTables();
  await setPublicRead();
  await seedData();
  console.log('🎉 Bootstrap complete! Visit http://localhost:3000\n');
}

main().catch((e) => {
  console.error('❌ Bootstrap failed:', e.message);
  process.exit(1);
});
