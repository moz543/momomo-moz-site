# セットアップ手順 (moz の作業分)

雛形は完成済 (Cowork 側でビルド検証済 ✅)。残りは GitHub と さくらインターネット側の設定だけ。
順番にやれば 30 分くらいで momomo-moz.com で公開できる。

---

## Step 0: 手元に持ってくる

`C:\Users\fumia\Claude_mount\momomo-moz-site\` に Astro プロジェクト一式が入ってる。
作業フォルダにそのまま使う or 別のフォルダにコピーする。

`node_modules/` はあえて入れていない (容量大なので)。最初に下記でインストールする:

```bash
cd <作業フォルダ>/momomo-moz-site
npm install
npm run dev          # http://localhost:4321 でローカル動作確認
```

ローカルで http://localhost:4321 を開いて、サンプル作品が出れば OK。

---

## Step 1: GitHub リポジトリ作成

1. https://github.com/new を開く
2. 設定:
   - Repository name: **momomo-moz-site**
   - Description: 任意 (例: `moz portfolio site`)
   - Visibility: **Public** (Pages 無料利用に必須)
   - **「Add a README file」「Add .gitignore」「Choose a license」は全部チェックなし** (こちらの雛形と衝突する)
3. Create repository

---

## Step 2: 初回 push

GitHub のリポジトリページに表示される「…or push an existing repository」のコマンドを参考に:

```bash
cd <作業フォルダ>/momomo-moz-site
git init -b main
git add .
git commit -m "Initial scaffold: Astro + Tailwind v4 + GitHub Pages"
git remote add origin git@github.com:moz543/momomo-moz-site.git
git push -u origin main
```

(SSH 設定がない場合は HTTPS で `https://github.com/moz543/momomo-moz-site.git` でも OK)

---

## Step 3: GitHub Pages を Actions ベースで有効化

1. リポジトリ → Settings → Pages
2. **Source** を `Deploy from a branch` ではなく **`GitHub Actions`** に変更
3. (任意) Settings → General の Features セクションで **Issues / Discussions / Projects のチェックを外す** (1 人運用なら不要、ノイズが減る)

push 直後に Actions タブで `Deploy to GitHub Pages` ワークフローが走るはず。緑になったら:

→ **`https://moz543.github.io/momomo-moz-site/` にアクセスして表示確認**

ここまでで Phase 3 完了。

---

## Step 4: Adobe Portfolio から作品移行 (Phase 4)

1. `src/content/works/2025-04-sample-work.mdx` を見て構造を把握
2. 各作品ごとに以下を作成:
   - `src/assets/works/<YYYY-MM-slug>/cover.jpg` (+ 必要なら 01.jpg, 02.jpg ...)
   - `src/content/works/<YYYY-MM-slug>.mdx`
3. frontmatter を埋める (詳細は README.md の「作品の追加方法」参照)
4. サンプル作品 (`2025-04-sample-work.mdx` と `src/assets/works/2025-04-sample-work/`) は削除して OK
5. push すると自動デプロイされる

写真は長辺 2400px 以上推奨。Astro が自動で WebP/AVIF 生成 + srcset 化してくれる。
動画は YouTube / Vimeo にアップロードしてから frontmatter の `video.id` に動画 ID を入れる。

---

## Step 5: デザイン詰め (Phase 5)

`src/styles/global.css` の CSS 変数 (`--bg`, `--fg`, `--accent` ...) でテーマ色を調整できる。
`src/components/` の各コンポーネントを編集すればレイアウトも変えられる。
ベーステーマを使いたい場合は Astro 公式テーマギャラリーから持ってきて段階的に置き換える。

このフェーズはあとで一緒に詰める。

---

## Step 6: 独自ドメイン (momomo-moz.com) 接続

### 6-1. さくらインターネットで DNS 設定

会員メニュー → 契約ドメインの確認 → momomo-moz.com → ゾーン編集

以下を追加 (apex メイン運用):

```
@     A      185.199.108.153
@     A      185.199.109.153
@     A      185.199.110.153
@     A      185.199.111.153
www   CNAME  moz543.github.io.
```

(末尾のドット忘れずに。さくら UI が自動付与する場合あり)

TTL は標準 (3600) で OK。

### 6-2. リポジトリ側で CNAME を有効化

ローカルで `.gitignore` を編集:

```diff
- # Phase 3 (初回 GitHub Pages デプロイ) では CNAME を含めないでテストする
- # Phase 6 (独自ドメイン接続) で下の行を削除して CNAME を commit する
- public/CNAME
```

その後:

```bash
git add .gitignore public/CNAME
git commit -m "Phase 6: Attach custom domain momomo-moz.com"
git push
```

### 6-3. astro.config.mjs を本番用に切替

```diff
- site: 'https://moz543.github.io',
- base: '/momomo-moz-site',
- // site: 'https://momomo-moz.com',
+ site: 'https://momomo-moz.com',
```

commit & push。

### 6-4. GitHub Pages で HTTPS を有効化

DNS が反映 (10 分〜数時間) されてから、Settings → Pages を再度開く:

- Custom domain に `momomo-moz.com` が認識されてるはず (CNAME ファイルから自動)
- DNS check が緑になったら **Enforce HTTPS** にチェック (証明書発行待ちで一瞬グレーアウトする)

### 6-5. 検証

```bash
dig momomo-moz.com +short            # 4 つの IP が返る
curl -I https://momomo-moz.com       # 200 OK
```

ブラウザで https://momomo-moz.com を開いて、サンプルサイトが表示されれば完成 🎉

---

## Step 7: 切替後の片付け (Phase 7)

- moz543.myportfolio.com のトップに「移転しました → momomo-moz.com」と書く
- Twitter/X、Instagram などの bio リンクを差し替え
- Search Console に momomo-moz.com を登録、`https://momomo-moz.com/sitemap-index.xml` を提出
- 数ヶ月並行運用したら Adobe Creative Cloud のサブスク要否を判断

---

## トラブル時のチェックポイント

- **Actions が赤い** → Actions タブのログ確認。Tailwind の class が古い書き方になってないか、import path のタイポがないか
- **画像が出ない** → MDX の cover path が `../../assets/works/<slug>/cover.jpg` の形になってるか (相対パス、 src 直下からではない)
- **DNS が当たらない** → `dig` で 4 つの IP が返るか確認。さくらの反映待ちなら 1〜数時間
- **HTTPS が当たらない** → DNS が完全に反映されてから Enforce HTTPS にチェックを入れる。フライング NG
- **404** → Phase 6 の `astro.config.mjs` の base 削除を忘れてないか確認
