# Raspberry Pi クライアント

NestJS で動作するシグナリングサーバー (`backend`) を利用し、`ras-1` と `ras-2` の 2 台の Raspberry Pi 間で WebRTC 通話を行うためのサンプルコードです。

## 前提条件

- Node.js 18 以上
- `yarn` コマンドが使用できること
- マイク / スピーカー用に `alsa-utils` が導入されていること
- 以下のビルド用ライブラリがインストールされていること
  - `libasound2-dev`
  - `libmpg123-dev`

## セットアップ

```bash
cd raspberry-pi
yarn install
```

必要に応じて次のライブラリもインストールしてください。

```bash
sudo apt-get update
sudo apt-get install -y libasound2-dev libmpg123-dev alsa-utils
```

## 開発モードでの実行

`ID` と `TARGET` の環境変数を指定して `yarn dev` を起動します。

```bash
# ras-1 側で実行例（ras-2 に接続）
ID=ras-1 TARGET=ras-2 yarn dev

# ras-2 側で実行例（ras-1 と通話）
ID=ras-2 TARGET=ras-1 yarn dev
```

## ビルドして実行

ソースをトランスパイルして実行する場合は以下のコマンドを使用します。

```bash
# TypeScript をビルド
yarn build

# 実行
ID=ras-1 TARGET=ras-2 SIGNALING_URL=http://localhost:5000 yarn start
```

`SIGNALING_URL` を変更することでシグナリングサーバーの URL を指定できます。指定しない場合は `http://localhost:5000` が利用されます。

## 動作概要

1. WebSocket でシグナリングサーバーへ接続し、自身の ID を登録します。
2. `ras-1` がイニシエータとなり WebRTC のオファーを送信します。
3. `ras-2` がオファーを受信してアンサーを返し、P2P 接続が確立されます。
4. マイクから取得した音声データを WebRTC のデータチャネル経由で送信し、受信側はスピーカーから再生します。

実機環境に合わせてマイク・スピーカーの設定を調整してください。
