# 外資就活ハッカソン

外資就活ハッカソンのアプリケーションレポジトリ

## セットアップ

- Go 1.23.3
- Node.js 20.x

```bash
make go-install-tools
```

### 各サービスの起動
#### backend
- localhost:8080
```bash
make start-backend
make migrate-up
```
#### frontend
- localhost:3000
```bash
pnpm run dev
```

## Makefileの使い方

| コマンド | 説明 |
|---------|-------------|
| make help                 | ヘルプを出力 |
| make gen-help-md          | ヘルプをMarkdown形式で出力 |
| make go-install-tools     | Goツールをインストール |
| make migrate-new          | マイグレーションファイル作成 |
| make migrate-status       | マイグレーションステータス確認 |
| make migrate-up           | マイグレーション実行 |
| make migrate-down         | マイグレーションロールバック |
| make migrate-drop         | データベース削除 |
| make migrate-seed         | データベース初期データ投入 |
| make gen                  | 生成系のコマンドを実行 |
| make gen-dbmodel          | DBモデルを生成 |
| make clean-dbmodel        | DBモデルを削除 |
| make gen-api              | schema.graphqlsとmodel.graphqlsからGoのコードを生成する |
| make start-backend        | APIとDBの起動 |
| make stop-backend         | APIとDBの停止 |
| make build-backend-nocache | nocacheでビルド |


## ルートディレクトの解説

rootにあるファイル・ディレクトリは以下のようになっています｡

```
$ tree -L 1
.
├── Makefile
├── README.md
├── backend ⭐goを使ったAPIサーバーのディレクトリ
├── go.mod
├── go.sum
├── gqlgen.yml
├── graphql.config.ts
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── process-compose.yml
├── tools.go
└── webapp ⭐React/Next.jsを使ったフロントエンドのディレクトリ
```

今回の実装で重要なディレクトリは`backend`と`webapp`です。
`backend`と`webapp`の詳しい説明は、それぞれのディレクトリの`README.md`に記載しています。

その他、様々な設定ファイルがrootディレクトリに配置されています｡

- backendの設定ファイル
- `go.mod`は、backend配下のgoアプリケーションの依存関係を管理するためのファイルです。依存関係をインストールした結果、`go.sum`が生成され、依存関係の正確なバージョンが固定されます。
- `gqlgen.yml` は、backend配下のgoのGraphQLサーバーを生成するためのツール`gqlgen`の設定ファイルです。
- `tools.go` は、コマンドで利用するgoのツールをインストールするためのファイルです。 `make go-install-tools`でインストールされます。
- webappの設定ファイル
- `graphql.config.ts` は、webapp配下のGraphQLクライアントを生成するためのツール`graphql-codegen`の設定ファイルです。
- `package.json`は、webapp配下のReact/Next.jsアプリケーションの依存関係を管理するためのファイルです。
- パッケージ管理ツール`pnpm`で`package.json`の依存関係をインストールした結果、`pnpm-lock.yaml`が生成され、依存関係の正確なバージョンが固定されます。
- `pnpm-workspace.yaml`では`pnpm`で管理するディレクトリを指定しています。
- devboxの設定ファイル
- `devbox.json` は、devboxの設定ファイルです。依存関係の正確なバージョン固定のために、`devbox.lock`が生成され、依存関係の正確なバージョンが固定されます。
- `process-compose.yml` は、devboxで利用するプロセスマネージャーの設定ファイルです。

これらの設定ファイルがrootに置かれている事によって、`go`コマンドや`pnpm`コマンドを実行する際に、それぞれのディレクトリに移動する必要がなくなっています。
