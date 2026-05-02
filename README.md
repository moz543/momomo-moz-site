# momomo-moz-site

moz の自主制作ポートフォリオ。Astro + GitHub Pages + 独自ドメイン (momomo-moz.com) で運用。

## 開発

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # dist/ に出力
npm run preview  # ビルド結果をローカル確認
```

## 作品の追加方法

1. `src/assets/works/<YYYY-MM-slug>/` に画像を入れる (長辺 2400px 以上推奨)
2. `src/content/works/<YYYY-MM-slug>.mdx` を新規作成
3. frontmatter を埋める。必須フィールド: `title`, `date`, `cover`, `medium`
4. push すると GitHub Actions が自動でビルド & デプロイ

frontmatter の例:

```yaml
---
title: 作品タイトル
date: 2025-04-30
summary: 一覧に出るひとこと説明
cover: ../../assets/works/2025-04-slug/cover.jpg
tags: ["photo", "personal"]
medium: photo               # photo / video / graphic / code / mixed
video:                      # 動画作品の場合
  provider: youtube         # youtube / vimeo
  id: dQw4w9WgXcQ
links:                      # 外部リンク
  - label: 高解像度版 (Drive)
    url: https://drive.google.com/...
    kind: drive             # github / drive / dropbox / site / other
draft: false                # true にするとビルドから除外
---
```

## ディレクトリ

```
src/
  content/works/        作品 MDX (1 作品 1 ファイル)
  assets/works/<slug>/  作品画像
  pages/                ルーティング (index / about / works/[slug])
  layouts/              BaseLayout, WorkLayout
  components/           Header, Footer, WorkCard, VideoEmbed, ExternalLink
  styles/global.css     全体スタイル (Tailwind v4 + CSS 変数)
public/                 静的ファイル (favicon, robots.txt, .nojekyll)
.github/workflows/      GitHub Actions (deploy.yml)
docs/                   セットアップメモ (PHASE6-CNAME.txt 等)
```

## デプロイ

`main` ブランチへの push で `.github/workflows/deploy.yml` が走り、GitHub Pages に自動デプロイ。

- Phase 3: `https://moz543.github.io/momomo-moz-site/` で公開 (現状の astro.config.mjs)
- Phase 6: 独自ドメイン `https://momomo-moz.com` に切替 (手順は `docs/HANDOFF.md` 参照)

## ライセンス

作品の権利は moz に帰属。コードは個人プロジェクトのため特にライセンス指定なし。
