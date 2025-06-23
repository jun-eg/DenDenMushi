# でんでん虫

## プロジェクト概要

NestJS で動作するシグナリングサーバー (`backend`) を利用し、
`ras-1` と `ras-2` の 2 台の Raspberry Pi 間で WebRTC 通話を行う。

## セットアップ

1. Node.js 18 以降がインストールされていることを確認
2. 依存関係をインストール

```bash
yarn install
cd backend
yarn install
cd ..
#現時点でfrontは使用していない
cd frontend
yarn install
cd ..
docker compose build
docker compose run --rm api yarn install
docker compose run --rm front yarn install
```

3. Raspberry Piの依存関係をインストール

```bash
cd raspberry-pi
sudo apt-get update
sudo apt-get install -y alsa-utils
sudo apt-get install sox
sudo apt-get install libsox-fmt-all
sudo apt-get install -y pigpio
yarn install
```

## 使い方

1. signalingサーバーの起動

```bash
docker compose up
```

2. Raspberry Piの起動

環境変数の指定方法

- `ID` ： 自身の端末 ID (`ras-1` または `ras-2`)
- `TARGET` ： 接続先の ID
- `SIGNALING_URL` ： シグナリングサーバーの URL (オプション)

```bash
# ras-1 側で実行例（ras-2 に接続）
ID=ras-1 TARGET=ras-2 yarn dev

# ras-2 側で実行例（ras-1 と通話）
ID=ras-2 TARGET=ras-1 yarn dev
```

開発用途で TypeScript をそのまま実行する場合は `yarn dev` を使用
Node.js で実行可能なファイルにビルドしたい場合は`yarn build` でビルド後 `yarn start` を使用

シグナリングサーバーの URL を変更したい場合は `SIGNALING_URL`
環境変数で指定。デフォルトは `http://localhost:5000`

## 動作概要

1. WebSocket でシグナリングサーバーへ接続し、自身の ID を登録
2. `ras-1` がイニシエータとなり WebRTC のオファーを送信
3. `ras-2` がオファーを受信してアンサーを返し、P2P 接続が確立
4. マイクから取得した音声データを WebRTC のデータチャネル経由で送信し、
   受信側はスピーカーから再生
