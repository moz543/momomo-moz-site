# 作品の追加と運用ガイド

`momomo-moz-site` で作品を追加・更新するときの手順とルール。

## 開発コマンド

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

### frontmatter の例

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

### medium の選び方

| 値 | 用途 |
|---|---|
| `photo` | 写真作品 |
| `video` | 映像作品 |
| `graphic` | グラフィック / イラスト / デザイン |
| `code` | コード / Web / インタラクティブ |
| `mixed` | 複数メディアを組み合わせた作品 |

### 動画作品

YouTube または Vimeo にアップロード (限定公開でも OK) してから:

```yaml
video:
  provider: youtube
  id: dQw4w9WgXcQ      # URL の v= 以降、または youtu.be/ 以降の文字列
```

frontmatter に `video` を書くと、cover 画像の代わりに動画埋め込みが表示される。
cover 画像は OGP/サムネ用途で必須。

### 重い元データ

NAS の RAW データや高解像度版は repo に入れない。代わりに `links` フィールドで Drive/Dropbox に誘導する:

```yaml
links:
  - label: 元データ (Google Drive)
    url: https://drive.google.com/drive/folders/...
    kind: drive
  - label: ソースコード (GitHub)
    url: https://github.com/moz543/some-project
    kind: github
```

## 下書き運用

公開前の作品は frontmatter に `draft: true` を入れる。ビルド時に除外されるので、push しても公開サイトには出ない。

```yaml
draft: true
```

レビューが終わって公開していい状態になったら `draft: false` に変えて push。

## ディレクトリ構成

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
docs/                   セットアップメモ・運用ガイド
```

## デプロイ

`main` ブランチへの push で `.github/workflows/deploy.yml` が走り、GitHub Pages に自動デプロイ。

- 現状: `https://moz543.github.io/momomo-moz-site/` で公開
- Phase 6 後: `https://momomo-moz.com` で公開 (手順は `HANDOFF.md` 参照)
