// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Appy Stamp Developer Docs',
			defaultLocale: 'root',
			locales: {
				root: { label: 'English', lang: 'en' },
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
					label: 'Widget',
					translations: { ja: 'ウィジェット' },
					autogenerate: { directory: 'widget' },
				},
				{
					label: 'REST API',
					translations: { ja: 'REST API' },
					items: [
						{ label: 'Overview', translations: { ja: '概要' }, link: '/rest-api/overview/' },
						{ label: 'Installation', translations: { ja: 'インストール' }, link: '/rest-api/installation/' },
						{ label: 'Authentication', translations: { ja: '認証' }, link: '/rest-api/authentication/' },
						{ label: 'Endpoints', translations: { ja: 'エンドポイント' }, autogenerate: { directory: 'rest-api/endpoints' } },
					],
				},
				{
					label: 'GraphQL API',
					translations: { ja: 'GraphQL API' },
					items: [
						{ label: 'Overview', translations: { ja: '概要' }, link: '/graphql-api/overview/' },
						{ label: 'Installation', translations: { ja: 'インストール' }, link: '/graphql-api/installation/' },
						{ label: 'Authentication', translations: { ja: '認証' }, link: '/graphql-api/authentication/' },
						{ label: 'Reference', translations: { ja: 'リファレンス' }, items: [
							{ label: 'Queries', translations: { ja: 'クエリ' }, autogenerate: { directory: 'graphql-api/reference/queries' } },
							{ label: 'Mutations', translations: { ja: 'ミューテーション' }, autogenerate: { directory: 'graphql-api/reference/mutations' } },
							{ label: 'Types', translations: { ja: '型' }, link: '/graphql-api/reference/types/' },
							{ label: 'Inputs', translations: { ja: '入力' }, link: '/graphql-api/reference/inputs/' },
						] },
					],
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
