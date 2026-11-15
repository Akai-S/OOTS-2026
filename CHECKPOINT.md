# CP 06 — Kirim Email

Form yang benar-benar mengirim. Dan satu batas yang harus kalian hormati.

## Baca ini dulu

Resend gratis **100 email per hari per akun**. Bukan per peserta — per akun.

Kalau kalian memakai satu akun bersama, 40 orang × 3 percobaan = 120 email, dan
kuotanya habis sebelum separuh kelas selesai. Karena itu:

- **Satu akun Resend per orang.** Daftar pakai email kalian sendiri.
- **Kirim maksimal satu email sungguhan.** Sisanya uji dengan form kosong atau
  email yang salah format — keduanya berhenti sebelum memanggil Resend.
- Pengirim harus `onboarding@resend.dev`. Domain kalian belum diverifikasi.
- Penerima harus **email pemilik akun**. Resend menolak alamat lain selama
  domain belum diverifikasi.

## Apa yang berubah

- `src/env.ts` mendaftarkan dua variabel rahasia: `RESEND_API_KEY` dan
  `RESEND_TO`. SvelteKit 3 tidak lagi memakai `$env/dynamic/private`.
- `+page.server.ts` memanggil `https://api.resend.com/emails`.
- `.env.example` jadi contoh isi `.env`. File `.env` sendiri tidak pernah ikut
  ter-commit — `.gitignore` sudah menangani itu.

Perhatikan yang **tidak** berubah di `+page.svelte`: satu baris pun tidak.
Seluruh pekerjaan CP06 ada di server.

## Salin ini

`src/env.ts`

```ts
import { defineEnvVars } from '@sveltejs/kit/env';

// SvelteKit 3 mengganti `$env/dynamic/private` dengan cara ini.
// Setiap variabel yang dipakai aplikasi didaftarkan di sini, sekali.
export const variables = defineEnvVars({
	RESEND_API_KEY: {
		description: 'Kunci API Resend. Rahasia, hanya untuk server.',
		schema: (value) => value ?? ''
	},
	RESEND_TO: {
		description: 'Email penerima pesan dari form kontak.',
		schema: (value) => value ?? ''
	}
});
```

`src/routes/+page.server.ts`

```ts
import { fail } from '@sveltejs/kit';
import { RESEND_API_KEY, RESEND_TO } from '$app/env/private';
import type { Actions } from './$types';

export const actions = {
	kirim: async ({ request }) => {
		const data = await request.formData();

		const nama = String(data.get('nama') ?? '').trim();
		const email = String(data.get('email') ?? '').trim();
		const pesan = String(data.get('pesan') ?? '').trim();

		if (!nama || !email || !pesan) {
			return fail(400, { pesan: 'Semua kolom harus diisi.' });
		}

		if (!email.includes('@')) {
			return fail(400, { pesan: 'Format email belum benar.' });
		}

		const kunci = RESEND_API_KEY;
		const tujuan = RESEND_TO;

		if (!kunci || !tujuan) {
			return fail(500, { pesan: 'Kunci Resend belum dipasang di .env.' });
		}

		const balasan = await fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${kunci}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				// Resend hanya mengizinkan pengirim ini selama domain kalian
				// belum diverifikasi.
				from: 'Portofolio <onboarding@resend.dev>',
				to: [tujuan],
				reply_to: email,
				subject: `Pesan dari ${nama}`,
				text: `${pesan}\n\n— ${nama} <${email}>`
			})
		});

		if (!balasan.ok) {
			console.error('Resend menolak:', balasan.status, await balasan.text());
			return fail(502, { pesan: 'Gagal mengirim. Coba lagi.' });
		}

		return { sukses: true };
	}
} satisfies Actions;
```

`.env.example`

```
# Salin file ini jadi .env, lalu isi nilainya.
# Jangan pernah commit .env — isinya kunci rahasia.

# https://resend.com/api-keys
RESEND_API_KEY=re_xxxxxxxxxxxxxxxx

# Selama domain kalian belum diverifikasi di Resend, email hanya bisa
# dikirim ke alamat pemilik akun. Isi dengan email kalian sendiri.
RESEND_TO=kamu@email.com
```

Lalu buat `.env` sendiri:

```sh
cp .env.example .env
```

Isi `RESEND_API_KEY` dari dashboard Resend, dan `RESEND_TO` dengan email kalian.

## Bandingkan

/compare/05-form...06-resend

## Tantangan

Kirim satu email sungguhan ke diri sendiri. Buka inbox, lalu tekan **Reply**.
Email balasan itu harus masuk ke alamat pengirim form, bukan ke
`onboarding@resend.dev`. Itu kerja `reply_to`.

## Kalau macet

| Gejala                                                           | Sebab                                                     |
| ---------------------------------------------------------------- | --------------------------------------------------------- |
| `401 API key is invalid`                                         | Kunci salah salin, atau ada spasi di akhir baris `.env`   |
| `403 You can only send testing emails to your own email address` | `RESEND_TO` bukan email pemilik akun Resend               |
| `Kunci Resend belum dipasang di .env`                            | `.env` belum dibuat, atau dev server belum di-restart     |
| Email tidak masuk tapi status hijau                              | Cek folder Spam. Lalu cek dashboard Resend → Logs         |
| Status hijau padahal tidak ada email                             | Kunci masih kosong tapi pengecekan `if (!kunci)` terhapus |

Setiap penolakan Resend dicatat di terminal tempat `bun run dev` berjalan —
lengkap dengan kode status dan alasannya. Baca terminal, bukan cuma browser.

## Verifikasi

```sh
bun run check
bun run dev
```

Kirim satu pesan. Status hijau, dan email masuk ke inbox kalian dalam beberapa
detik. Kalau status merah, lihat terminal: pesan Resend ada di sana.
