import { fail } from '@sveltejs/kit';
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

		// CP05: belum ada yang dikirim ke mana-mana. Kita pura-pura berhasil
		// dulu supaya seluruh alurnya bisa dilihat. Email sungguhan menyusul
		// di CP06.
		return { sukses: true };
	}
} satisfies Actions;
