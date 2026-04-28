// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Appy Stamp Developer Docs',
			defaultLocale: 'en',
			locales: {
				en: { label: 'English', lang: 'en' },
				ja: { label: '日本語', lang: 'ja' },
			},
			sidebar: [
				{
					label: 'Getting Started',
					translations: { ja: 'はじめに' },
					autogenerate: { directory: 'getting-started' },
				},
				{
					label: 'SDK Reference',
					translations: { ja: 'SDKリファレンス' },
					autogenerate: { directory: 'sdk' },
				},
				{
					label: 'Examples',
					translations: { ja: 'サンプル' },
					autogenerate: { directory: 'examples' },
				},
			],
		}),
	],
});
