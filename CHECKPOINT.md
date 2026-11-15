# CP 04 — Komponen

Satu blok markup yang dipakai berkali-kali berubah jadi satu file.

## Apa yang berubah

- `src/lib/components/ProjectRow.svelte`: baris proyek jadi komponen.
  Menerima `project` dan `index` lewat `$props()`.
- `{#each}` sekarang **keyed** — `(project.title)`. Svelte tahu baris mana
  yang berubah, bukan menebak dari urutan.
- `{#if project.href}` — panah hanya muncul kalau proyeknya punya tautan.
  Hapus `href` dari satu proyek di `data.ts` dan panahnya hilang.
- Section **Tentang**: potret, bio, empat baris fakta, dan badge keahlian.
  Isinya dari `profile` di `data.ts`.

Perhatikan `href?: string` — tanda tanya itu artinya opsional. TypeScript akan
menolak kalian membaca `project.href` tanpa memeriksanya lebih dulu. `{#if}`
adalah pemeriksaan itu.

## Salin ini

`src/lib/components/ProjectRow.svelte`

```svelte
<script lang="ts">
	import type { Project } from '$lib/data';

	type Props = {
		project: Project;
		index: number;
	};

	let { project, index }: Props = $props();
</script>

<div class="flex flex-col gap-2.5 py-7">
	<div class="flex items-center justify-between">
		<span class="font-mono text-[11px] tracking-[1.1px]">
			{String(index + 1).padStart(2, '0')}
		</span>

		<div class="flex items-center gap-5">
			<span class="font-mono text-[11px] tracking-[1.1px] uppercase">{project.stack}</span>
			<span class="font-mono text-[11px] tracking-[1.1px]">{project.year}</span>

			{#if project.href}
				<a href={project.href} aria-label="Buka {project.title}" class="text-primary">
					<svg
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M7 17 17 7M9 7h8v8" />
					</svg>
				</a>
			{/if}
		</div>
	</div>

	<h2 class="text-[28px] leading-[1.15] font-medium tracking-[-0.5px]">{project.title}</h2>
	<p class="text-[15px] leading-[1.55] text-muted">{project.description}</p>
</div>
```

`src/lib/data.ts`

```ts
export type Project = {
	title: string;
	description: string;
	stack: string;
	year: number;
	href?: string;
};

export const projects: Project[] = [
	{
		title: 'Sistem Absensi Kelas',
		description: 'Aplikasi pencatatan kehadiran siswa dengan rekap otomatis per bulan.',
		stack: 'SvelteKit',
		year: 2026,
		href: 'https://github.com/nama-kamu/absensi'
	},
	{
		title: 'Landing Page UKM',
		description: 'Halaman profil organisasi sekolah dengan formulir pendaftaran anggota.',
		stack: 'Tailwind',
		year: 2026,
		href: 'https://github.com/nama-kamu/ukm'
	},
	{
		title: 'Dashboard Jaringan',
		description: 'Pemantauan status perangkat lab sekolah secara real-time.',
		stack: 'TypeScript',
		year: 2026,
		href: 'https://github.com/nama-kamu/dashboard'
	}
];

export const profile = {
	bio: 'Saya suka membangun hal yang berguna dan terlihat rapi. Saat ini belajar SvelteKit dan TypeScript, sambil mengerjakan proyek kecil untuk sekolah dan komunitas.',
	facts: [
		{ label: 'FOKUS', value: 'Antarmuka web & sistem informasi' },
		{ label: 'STACK', value: 'SvelteKit · TypeScript · Tailwind' },
		{ label: 'LOKASI', value: 'Indonesia' },
		{ label: 'STATUS', value: 'Terbuka untuk kolaborasi' }
	],
	skills: ['HTML', 'CSS', 'JavaScript', 'SvelteKit', 'Tailwind', 'Git']
};
```

`src/routes/+page.svelte`

```svelte
<script lang="ts">
	import { projects, profile } from '$lib/data';
	import ProjectRow from '$lib/components/ProjectRow.svelte';

	type Theme = 'light' | 'dark';

	let theme: Theme = $state('light');
</script>

<div class="min-h-dvh bg-bg text-ink {theme === 'dark' ? 'dark' : ''}">
	<!-- nav -->
	<header class="border-b border-line">
		<div
			class="mx-auto flex h-[60px] max-w-[1440px] items-center justify-between px-6 lg:h-[72px] lg:px-24"
		>
			<a href="/" class="text-[15px] font-semibold lg:text-base">nama.kamu</a>

			<div class="flex items-center gap-2 lg:gap-8">
				<nav class="hidden items-center gap-7 lg:flex">
					<a href="#proyek" class="text-sm text-muted">Proyek</a>
					<a href="#tentang" class="text-sm text-muted">Tentang</a>
					<a href="#kontak" class="text-sm text-muted">Kontak</a>
				</nav>

				<button
					type="button"
					aria-label="Ganti tema"
					onclick={() => (theme = theme === 'dark' ? 'light' : 'dark')}
					class="flex h-11 w-11 items-center justify-center border border-line"
				>
					<svg
						width="17"
						height="17"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="dark:hidden"
					>
						<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
					</svg>
					<svg
						width="17"
						height="17"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						class="hidden dark:block"
					>
						<circle cx="12" cy="12" r="4" />
						<path
							d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
						/>
					</svg>
				</button>

				<button
					type="button"
					aria-label="Buka menu"
					class="flex h-11 w-11 items-center justify-center border border-line lg:hidden"
				>
					<svg
						width="18"
						height="18"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
					>
						<path d="M4 7h16M4 12h16M4 17h16" />
					</svg>
				</button>
			</div>
		</div>
	</header>

	<!-- hero -->
	<section class="mx-auto max-w-[1440px] px-6 pt-16 pb-14 lg:px-24 lg:pt-[120px]">
		<h1
			class="text-[62px] leading-[0.88] font-medium tracking-[-1.6px] lg:text-[232px] lg:tracking-[-9px]"
		>
			Nama Kamu
		</h1>

		<div class="mt-7 flex flex-col gap-6">
			<p class="max-w-[560px] text-[17px] leading-[1.6] text-muted lg:text-xl">
				Siswa SMK jurusan RPL. Membangun antarmuka web yang cepat, rapi, dan mudah dipakai.
			</p>

			<div class="flex items-center gap-3">
				<a
					href="#proyek"
					class="flex h-12 items-center bg-primary px-6 text-[15px] font-medium text-on-primary"
				>
					Lihat proyek
				</a>
				<a
					href="#kontak"
					class="flex h-12 items-center border border-line px-6 text-[15px] text-ink"
				>
					Hubungi saya
				</a>
			</div>

			<p class="font-mono text-[11px] tracking-[1.1px] text-muted">
				TERSEDIA UNTUK PROYEK BARU — 2026
			</p>
		</div>
	</section>

	<!-- band -->
	<div class="border-t border-line">
		<img
			src={theme === 'dark' ? '/images/band-dark.png' : '/images/band-light.png'}
			alt="Foto kegiatan lab RPL"
			class="h-[220px] w-full object-cover lg:h-[420px]"
		/>
		<div class="mx-auto max-w-[1440px] px-6 py-4 lg:px-24">
			<p class="font-mono text-[11px] tracking-[1.1px] text-muted">LAB RPL — SMK NEGERI 1 · 2026</p>
		</div>
	</div>

	<!-- proyek -->
	<section id="proyek" class="border-t border-line">
		<div class="mx-auto max-w-[1440px] px-6 pt-5 pb-14 lg:px-24 lg:pb-24">
			<p class="font-mono text-[11px] tracking-[1.1px]">PROYEK</p>

			<div class="mt-7 flex flex-col divide-y divide-line lg:mt-10">
				{#each projects as project, i (project.title)}
					<ProjectRow {project} index={i} />
				{/each}
			</div>
		</div>
	</section>

	<!-- tentang -->
	<section id="tentang" class="border-t border-line">
		<div class="mx-auto max-w-[1440px] px-6 pt-5 pb-14 lg:px-24 lg:pb-24">
			<p class="font-mono text-[11px] tracking-[1.1px]">TENTANG</p>

			<div class="mt-7 flex flex-col items-start gap-8 lg:mt-10 lg:flex-row lg:gap-24">
				<img
					src={theme === 'dark' ? '/images/portrait-dark.png' : '/images/portrait-light.png'}
					alt="Foto profil"
					class="h-[428px] w-full object-cover lg:h-[525px] lg:w-[420px]"
				/>

				<div class="flex w-full flex-col gap-7">
					<p class="max-w-[520px] text-[17px] leading-[1.6] text-muted lg:text-xl">
						{profile.bio}
					</p>

					<div class="flex flex-col divide-y divide-line">
						{#each profile.facts as fact}
							<div class="flex items-center justify-between gap-8 py-4">
								<span class="font-mono text-[11px] tracking-[1.1px] text-muted">
									{fact.label}
								</span>
								<span class="text-[15px]">{fact.value}</span>
							</div>
						{/each}
					</div>

					<div class="flex flex-col gap-3">
						<span class="font-mono text-[11px] tracking-[1.1px] text-muted">KEAHLIAN</span>
						<div class="flex flex-wrap gap-2">
							{#each profile.skills as skill}
								<span
									class="border border-line px-2.5 py-[7px] font-mono text-[11px] tracking-[1.1px] text-muted"
								>
									{skill}
								</span>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- footer -->
	<footer class="border-t border-line">
		<div class="mx-auto flex max-w-[1440px] flex-col gap-10 px-6 py-14 lg:px-24">
			<p
				class="max-w-[640px] text-[34px] leading-[1.05] font-medium tracking-[-0.6px] lg:text-[48px] lg:tracking-[-1.2px]"
			>
				Mari membangun sesuatu.
			</p>

			<div
				class="flex flex-col items-start gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-6"
			>
				<a href="mailto:kamu@email.com" class="font-mono text-xs tracking-[1.1px] text-primary">
					kamu@email.com
				</a>
				<div class="flex items-center gap-6">
					<a href="#proyek" class="font-mono text-[11px] tracking-[1.1px] text-muted">PROYEK</a>
					<a
						href="https://github.com/nama-kamu"
						class="font-mono text-[11px] tracking-[1.1px] text-muted">GITHUB</a
					>
					<a href="mailto:kamu@email.com" class="font-mono text-[11px] tracking-[1.1px] text-muted">
						EMAIL
					</a>
				</div>
			</div>
		</div>
	</footer>
</div>
```

## Bandingkan

/compare/03-each...04-komponen

## Tantangan

Halaman ini sekarang punya dua tempat yang memakai pola "baris dengan garis
pemisah": daftar proyek dan daftar fakta. Yang satu sudah jadi komponen, yang
satu belum.

Mana yang **layak** dijadikan komponen, dan mana yang tidak? Komponen yang
dipakai sekali bukan komponen — itu cuma file tambahan.

Bonus: ganti `(project.title)` dengan `(project)` di `{#each}`. Apa yang rusak
saat kalian mengubah urutan proyek?

## Kalau macet

| Gejala                                                   | Sebab                                                                |
| -------------------------------------------------------- | -------------------------------------------------------------------- |
| `Cannot find module '$lib/components/ProjectRow.svelte'` | Path salah, atau nama file beda huruf besar/kecil (Linux peka huruf) |
| `project` undefined di komponen                          | Lupa `let { project } = $props();`                                   |
| Props tidak berubah saat data diubah                     | `{#each}` tidak keyed, atau key-nya tidak unik                       |
| Gambar potret gepeng                                     | `object-cover` hilang                                                |
| `{#if}` tidak menghilangkan panah                        | Yang dicek bukan `project.href`, atau `href` masih ada di `data.ts`  |

## Verifikasi

```sh
bun run check
```

Di 1440px potret harus 420×525, di 390px 342×428. Tiga panah muncul di daftar
proyek. Hapus `href` dari proyek pertama — panahnya harus hilang, dan tidak ada
error.
