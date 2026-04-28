// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Appy Stamp Developer Docs',
			sidebar: [
				{
					label: 'Getting Started',
					items: [
						{ label: 'Introduction', slug: 'getting-started/introduction' },
						{ label: 'Installation', slug: 'getting-started/installation' },
						{ label: 'Authentication', slug: 'getting-started/authentication' },
					],
				},
				{
					label: 'SDK Reference',
					items: [
						{ label: 'Public Methods', slug: 'sdk/public-methods' },
						{ label: 'Authenticated Methods', slug: 'sdk/authenticated-methods' },
						{ label: 'Events', slug: 'sdk/events' },
					],
				},
				{
					label: 'Examples',
					items: [
						{ label: 'HMAC Hash Generation', slug: 'examples/hmac' },
						{ label: 'Custom Rewards Page', slug: 'examples/custom-rewards-page' },
					],
				},
			],
		}),
	],
});
