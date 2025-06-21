# Raspberry Pi クライアント

NestJS で動作するシグナリングサーバー (`backend`) を利用し、
`ras-1` と `ras-2` の 2 台の Raspberry Pi 間で WebRTC 通話を行う。

## セットアップ

1. Node.js 18 以降がインストールされていることを確認してください。
2. 本リポジトリをクローン後、ルートディレクトリで依存関係をインストールします。

```bash
git clone <this repository>
cd DennDennMushi
yarn install
```


音声出力には `aplay` コマンドを利用します。`alsa-utils` パッケージが
インストールされていない場合は以下を実行してください。

```bash
sudo apt-get update
sudo apt-get install -y alsa-utils
sudo apt-get install sox
sudo apt-get install libsox-fmt-all
```

シグナリングサーバー (backend) を起動しておきます。Docker を利用する場合は
次のコマンドでバックエンドを立ち上げられます。

```bash
docker compose up -d api
```
直接起動する場合は以下を実行してください。

```bash
yarn workspace backend start:dev
```

その後、各 Raspberry Pi で下記の手順を行います。

```bash
cd raspberry-pi
yarn install
```

## 使い方

Raspberry Pi それぞれで以下の環境変数を指定して起動します。

- `ID` ： 自身の端末 ID (`ras-1` または `ras-2`)
- `TARGET` ： 接続先の ID
- `SIGNALING_URL` ： シグナリングサーバーの URL (オプション)

開発用途で TypeScript をそのまま実行する場合は `yarn dev` を使用します。
Node.js で実行可能なファイルにビルドしたい場合は
`yarn build` でビルド後 `yarn start` を使ってください。

```bash
# ras-1 側で実行例（ras-2 に接続）
ID=ras-1 TARGET=ras-2 yarn dev

# ras-2 側で実行例（ras-1 と通話）
ID=ras-2 TARGET=ras-1 yarn dev
```

シグナリングサーバーの URL を変更したい場合は `SIGNALING_URL`
環境変数で指定してください。デフォルトは `http://localhost:5000` です。

## 動作概要

1. WebSocket でシグナリングサーバーへ接続し、自身の ID を登録します。
2. `ras-1` がイニシエータとなり WebRTC のオファーを送信します。
3. `ras-2` がオファーを受信してアンサーを返し、P2P 接続が確立されます。
4. マイクから取得した音声データを WebRTC のデータチャネル経由で送信し、
   受信側はスピーカーから再生します。

実機環境に合わせてマイク・スピーカーの設定を調整してください。
