// #!/usr/bin/env node
// /**
//  * Adds cp_inquiries table to crud-builder for contact form submissions
//  * Run: npx tsx scripts/add-inquiries-table.ts
//  */

// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
// const EMAIL = process.env.ADMIN_EMAIL || 'admin@glamcomm.com';
// const PASSWORD = process.env.ADMIN_PASSWORD || 'securepassword';

// let TOKEN = '';

// async function api(method: string, path: string, body?: unknown, auth = true) {
//     const res = await fetch(`${BASE_URL}${path}`, {
//         method,
//         headers: {
//             'Content-Type': 'application/json',
//             ...(auth && TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
//         },
//         body: body ? JSON.stringify(body) : undefined,
//     });
//     const json = await res.json().catch(() => ({}));
//     if (!res.ok) console.warn(`  ⚠️  ${method} ${path} → ${res.status}:`, JSON.stringify(json).slice(0, 200));
//     return { ok: res.ok, json };
// }

// async function main() {
//     console.log('📬 Adding cp_inquiries table...\n');

//     // Login
//     const { ok, json } = await api('POST', '/api/auth/login', { email: EMAIL, password: PASSWORD }, false);
//     if (!ok) throw new Error('Login failed');
//     TOKEN = json.data.token;
//     console.log('✅ Logged in');

//     // Create table
//     const { ok: tableOk } = await api('POST', '/crud-builder/create-table', {
//         name: 'cp_inquiries',
//         display_name: 'Inquiries',
//         description: 'Contact form submissions from website visitors',
//         fields: [
//             { name: 'id', type: 'uuid', primary_key: true, required: true },
//             { name: 'name', type: 'string', required: true },
//             { name: 'email', type: 'string', required: true },
//             { name: 'subject', type: 'string' },
//             { name: 'message', type: 'text', required: true },
//             { name: 'status', type: 'string' },  // new | read | replied
//             { name: 'created_by', type: 'uuid' },
//             { name: 'updated_by', type: 'uuid' },
//         ],
//         settings: { timestamps: true, soft_delete: true },
//     });
//     console.log(`${tableOk ? '✅' : '⚠️ '} cp_inquiries table created`);

//     // Note: we do NOT set public read on inquiries (admin-only)
//     console.log('\n🎉 Done! Inquiries table is ready.\n');
//     console.log('Contact form submissions will be saved to cp_inquiries.');
//     console.log('View them at: http://localhost:3000/admin/inquiries');
// }

// main().catch((e) => { console.error('❌ Failed:', e.message); process.exit(1); });
