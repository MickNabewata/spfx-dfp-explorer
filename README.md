# spfx-cds-explorer

[for English](https://github.com/MickNabewata/spfx-dfp-explorer/blob/master/README_EN.md)

## 概要

Common Data Serviceに対するAPI実行をテストするためのツールです。   
サンプルのリクエストもいくつか含まれています。

![画面イメージ](https://github.com/MickNabewata/spfx-dfp-explorer/blob/images/jp/1.png)

## SharePoint Frameworkバージョン

![バージョン](https://img.shields.io/badge/version-1.11-green.svg)

## 動作確認方法

- このリポジトリをクローンします。
- コマンドプロンプトを起動し、クローンしたリポジトリのフォルダに移動します。
- 以下コマンドを実行します。
  - **npm install**
  - **gulp serve**

## インストール方法

1. このリポジトリをクローンします。
1. コマンドプロンプトを起動し、クローンしたリポジトリのフォルダに移動します。
1. 以下コマンドを実行します。
  - **npm install**
  - **npm run package**
1. Azure管理ポータルにアクセスし、Azure Active Directory > アプリの登録 画面 > すべてのアプリケーション タブ で「SharePoint Online Client Extensibility Web Application Principal」を選択します。   
1. APIのアクセス許可 画面でDynamics CRM > user_impersonationを追加します。
1. SharePointのアプリカタログにspfx-cds-explorer.sppkgをアップロードします。(**npm run package**を実行するとSharePointフォルダ内に作成されます。)   
1. 任意のSharePointサイトで「spfx-cds-explorer」のアプリを追加します。   
1. サイト内の任意のページで「CDS エクスプローラー」Webパーツを追加します。

## 機能

- Common Data Service Web APIへのリクエスト実行

HTTPメソッド、環境、エンドポイント、要求ヘッダ、要求本文を指定してWeb APIを実行します。

![画面イメージ](https://github.com/MickNabewata/spfx-dfp-explorer/blob/images/jp/1.png)

- サンプルリクエストの選択

すぐに実行できるいくつかのサンプルリクエストを選択することができます。

![画面イメージ](https://github.com/MickNabewata/spfx-dfp-explorer/blob/images/jp/2.png)

## 免責事項

**このコードは、明示または黙示を問わず、特定の目的への適合性、商品性、または非侵害の黙示の保証を含め、いかなる種類の保証もなしに*現状のまま*提供されます。**