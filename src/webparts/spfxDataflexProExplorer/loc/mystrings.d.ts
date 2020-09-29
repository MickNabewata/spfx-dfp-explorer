/** locフォルダ配下で定義したローカライズ用ファイルの型定義 */
declare interface ISpfxDataflexProExplorerWebPartStrings {
  /** タイトル入力フィールドのプレースホルダ */
  titlePlaceholder: string;
  /** ドロップダウンが空の場合に表示されるプレースホルダ */
  emptyDropDownPlaceholder: string;
  /** Dataflex Pro APIエンドポイントURL入力コントロールのラベル */
  endpointPlaceholder: string;
  /** 実行ボタンテキスト */
  executeButtonText: string;
  /** 要求本文タブのラベル */
  requestBodyPivotLabel: string;
  /** 要求本文入力フィールドのプレースホルダ */
  requestBodyPlaceholder: string;
  /** 要求ヘッダタブのラベル */
  requestHeadersPivotLabel: string;
  /** 要求ヘッダ入力テーブル キー列のヘッダテキスト */
  requestHeadersKeyText: string;
  /** 要求ヘッダ入力テーブル 値列のヘッダテキスト */
  requestHeadersValueText: string;
  /** 要求ヘッダ キー入力フィールドのプレースホルダ */
  requestHeaderKeyPlaceholder: string;
  /** 要求ヘッダ 値入力フィールドのプレースホルダ */
  requestHeaderValuePlaceholder: string;
  /** 要求ヘッダ 行削除ボタンのタイトル */
  requestHeaderRowDeleteButtonTtitle: string;
  /** 応答本文タブのラベル */
  responseBodyPivotLabel: string;
  /** 応答ヘッダタブのラベル */
  responseHeadersPivotLabel: string;
  /** サンプルリクエストボタンのタイトル */
  presetRequestButtonTitle: string;
  /** サンプルリクエストダイアログのタイトル */
  presetRequestDialogTitle: string;
  /** サンプルリクエスト 環境 カテゴリ */
  presetRequestEnvironmentCategory: string;
  /** サンプルリクエスト 環境一覧取得 タイトル */
  presetRequestListEnvironmentTitle: string;
  /** サンプルリクエスト 環境一覧取得 説明 */
  presetRequestListEnvironmentDescription: string;
  /** サンプルリクエスト エンティティ カテゴリ */
  presetRequestEntityCategory: string;
  /** サンプルリクエスト エンティティ一覧取得 タイトル */
  presetRequestListEntityTitle: string;
  /** サンプルリクエスト エンティティ一覧取得 説明 */
  presetRequestListEntityDescription: string;
  /** サンプルリクエスト エンティティ詳細取得 タイトル */
  presetRequestGetEntityTitle: string;
  /** サンプルリクエスト エンティティ詳細取得 説明 */
  presetRequestGetEntityDescription: string;
}

/** locフォルダ配下で定義したローカライズ用ファイルの読取結果 */
declare module 'SpfxDataflexProExplorerWebPartStrings' {  
  const strings: ISpfxDataflexProExplorerWebPartStrings;
  export = strings;
}
