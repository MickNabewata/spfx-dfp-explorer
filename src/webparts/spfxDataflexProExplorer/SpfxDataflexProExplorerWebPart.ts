import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, Environment, EnvironmentType } from '@microsoft/sp-core-library';
import { AadHttpClient, HttpClientResponse } from '@microsoft/sp-http';
import { update } from '@microsoft/sp-lodash-subset';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'SpfxDataflexProExplorerWebPartStrings';
import Root, { IRootProps } from './components/root/Root';
import { IDropdownOption } from 'office-ui-fabric-react';
import { getEnvironments, IEnvironment } from '../../datas/dfpEnvironment/cds';
import { getEnvironmentTestDatas } from '../../datas/dfpEnvironment/testdata';

/** マニフェストで定義したプロパティの型定義 */
export interface ISpfxDataflexProExplorerWebPartProps {
  /** タイトル */
  title: string;
}

/** Dataflex Pro エクスプローラー Webパーツ */
export default class SpfxDataflexProExplorerWebPart extends BaseClientSideWebPart<ISpfxDataflexProExplorerWebPartProps> {

  /** 描画 */
  public render(): void {
    const element: React.ReactElement<IRootProps> = React.createElement(
      Root,
      {
        title: this.properties.title,
        mode: this.displayMode,
        titleChanged: this.titleChanged.bind(this),
        getDfpEnvironmentOptions: this.getDfpEnvironmentOptions.bind(this),
        onExecute: this.onExecute.bind(this)
      }
    );

    ReactDom.render(element, this.domElement);
  }

  /** Webパーツのタイトル変更イベント */
  private titleChanged(title: string) {
    update(this.properties, 'title', (): any => { return title; });
  }

  /** Dataflex Pro 環境一覧取得処理 */
  private async getDfpEnvironmentOptions(): Promise<IDropdownOption[]> {
    // グローバル検出サービスから環境一覧を取得
    let results: IEnvironment[];
    switch(Environment.type) {
      case EnvironmentType.Local:
      case EnvironmentType.Test:
        results = await getEnvironmentTestDatas();
        break;
      case EnvironmentType.ClassicSharePoint:
      case EnvironmentType.SharePoint:
        results = await getEnvironments(await this.context.aadHttpClientFactory.getClient('https://globaldisco.crm.dynamics.com'));
        break;
    }

    // 戻り値を定義
    const options: IDropdownOption[] = [];
    
    // API実行結果を加工
    if(results) {
      results.forEach((result) => {
        options.push({ key: result.ApiUrl, text: result.ApiUrl, data: result });
      });
    }

    // グローバル検出サービスを固定で追加
    options.push({ key: 'https://globaldisco.crm.dynamics.com', text: 'https://globaldisco.crm.dynamics.com' });

    // 返却
    return options;
  }

  /** 実行処理 */
  private async onExecute(dfpEnvironment: string, method: string, endpoint: string, headers: Record<string, string>, body: string): Promise<HttpClientResponse> {
    const client = await this.context.aadHttpClientFactory.getClient(dfpEnvironment);
    if(method === 'GET') body = undefined;
    return await client.fetch(
      `${dfpEnvironment}/${endpoint}`,
      AadHttpClient.configurations.v1,
      {
        method: method,
        headers: headers,
        body: body
      });
  }

  /** プロパティウィンドウ定義 */
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: []
    };
  }

  /** Webパーツ破棄イベント */
  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  /** データバージョン取得 */
  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
}
