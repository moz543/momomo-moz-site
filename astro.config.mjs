// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// ───────────────────────────────────────────────────────────────────────────
// Phase 3 (初回デプロイ時): GitHub Pages のサブパスで公開する
//   site:  https://moz543.github.io
//   base:  /momomo-moz-site
//
// Phase 6 (独自ドメイン接続後): 下記コメントを入れ替えて base を消す
//   site:  https://momomo-moz.com
//   base なし
// ───────────────────────────────────────────────────────────────────────────

export default defineConfig({
  site: 'https://moz543.github.io',
  base: '/momomo-moz-site',
  // site: 'https://momomo-moz.com',
  trailingSlash: 'ignore',
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    // 画像最適化はデフォルトで sharp。WebP / AVIF も生成可能
    // 個別の <Image> で format を指定する
  },
});
