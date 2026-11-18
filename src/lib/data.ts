export type Project = {
	title: string;
	description: string;
	stack: string;
	year: number;
	href?: string;
};

export const projects: Project[] = [
	{
		title: 'Sistem Pelanggaran Siswa',
		description: 'Aplikasi pencatatan pelanggaran siswa dengan rekap otomatis per bulan.',
		stack: 'Python',
		year: 2026,
		href: 'https://github.com/Akai/pelanggaran'
	},
	{
		title: 'Aplikasi pencatatan keuangan OTTERA',
		description: 'Aplikasi pencatatan keuangan pribadi yang memiliki fitur perhitungan HPP',
		stack: 'Java',
		year: 2026,
		href: 'https://github.com/Akai/OTTERA'
	},
	{
		title: 'Tenda Pecel Lele',
		description: 'Game simulasi menjalankan usaha tenda pecel lele dan harus memperhatikan anomali (Unity 3D)',
		stack: 'C#',
		year: 2026,
			href: 'https://github.com/Akai/Tenda-Pecel-Lele'
		}
];

export const profile = {
	bio: 'Saya suka membangun hal yang berguna dan terlihat rapi. Saat ini belajar SvelteKit dan TypeScript, sambil mengerjakan proyek kecil untuk sekolah dan komunitas.',
	facts: [
		{ label: 'FOKUS', value: 'Antarmuka web, sistem informasi, & game development' },
		{ label: 'STACK', value: 'SvelteKit · TypeScript · Tailwind · C#'},
		{ label: 'LOKASI', value: 'Indonesia' },
		{ label: 'STATUS', value: 'Terbuka untuk kolaborasi' }
	],
	skills: ['HTML', 'CSS', 'JavaScript', 'Python', 'PHP', 'SvelteKit', 'Tailwind', 'Git', 'Unity']
};
