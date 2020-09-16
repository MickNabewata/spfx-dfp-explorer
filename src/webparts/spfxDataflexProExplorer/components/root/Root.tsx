import * as React from 'react';
import { DisplayMode } from '@microsoft/sp-core-library';
import styles from './Root.module.scss';
import { titlePlaceholder } from 'SpfxDataflexProExplorerWebPartStrings';
import { isEmpty } from '@microsoft/sp-lodash-subset';
import { TextField, Stack, IDropdownOption, Text } from 'office-ui-fabric-react';
import Endpoint from './endpoint/Endpoint';
import Parameters, { IHeader } from './parameters/Parameters';
import Response from './response/Response';
import { HttpClientResponse } from '@microsoft/sp-http';
import PresetRequestDialog from './presetRequestDialog/PresetRequestDialog';

/** ルートコンポーネント プロパティ */
export interface IRootProps {
  /** タイトル */
  title: string;
  /** 表示モード */
  mode: DisplayMode;
  /** タイトル変更イベント */
  titleChanged: (title: string) => void;
  /** Dataflex Pro 環境一覧取得処理 */
  getDfpEnvironmentOptions: () => Promise<IDropdownOption[]>;
  /** 実行処理 */
  onExecute: (dfpEnvironment: string, method: string, endpoint: string, headers: Record<string, string>, body: string) => Promise<HttpClientResponse>;
}

/** エンドポイント指定 */
interface IEndpoint {
  /** Dataflex Pro 環境URL */
  dfpEnvironment: string;
  /** HTTP メソッド */
  method: string;
  /** エンドポイントURL */
  endpoint: string;
}

/** 要求パラメータ */
interface IRequestParams {
  /** 要求ヘッダ */
  headers: IHeader[];
  /** 要求本文 */
  body: string;
}

/** ルートコンポーネント */
export default function Root(props: IRootProps): JSX.Element {
  if(isEmpty(props)) return undefined;
  const [dfpEnvironmentOptions, setDfpEnvironmentOptions] = React.useState<IDropdownOption[]>([]);
  const [dfpEnvironment, setDfpEnvironment] = React.useState<string>();
  const [method, setMethod] = React.useState<string>('GET');
  const [endpoint, setEndpoint] = React.useState<string>('');
  const [requestParams, setRequestParams] = React.useState<IRequestParams>();
  const [response, setResponse] = React.useState<HttpClientResponse>();
  const [responseError, setResponseError] = React.useState<Error>();
  const [presetRequestDialogOpened, setPresetRequestDialogOpened] = React.useState<boolean>(false);
  const [initialized, setInitialized] = React.useState<boolean>(false);
  const [initializeError, setInitializeError] = React.useState<Error>();

  // コンポーネントがマウントされた時にDataflex Pro環境一覧を取得する
  React.useEffect(() => {
    let unmounted = false;

    try {
      if(!unmounted) {
        setInitialized(false);
  
        if(props.getDfpEnvironmentOptions) {
          props.getDfpEnvironmentOptions().then(
            (options) => { 
              setDfpEnvironmentOptions(options);
              setInitialized(true);
             },
            (ex) => { 
              setInitializeError(ex);
              setInitialized(true);
             }
          );
        }
      }
    } catch(ex) {
      setInitializeError(ex);
      setInitialized(true);
    }

    return () => { unmounted = true; };
  }, [props.mode]);

  /** Dataflex Pro 環境の選択肢が変更された時に現在の選択値を変更 */
  React.useEffect(
    () => {
        const dfp = dfpEnvironmentOptions && dfpEnvironmentOptions.length > 0 ? dfpEnvironmentOptions[0] : undefined;
        if(dfp && dfp.key) setDfpEnvironment(dfp.key.toString());
    }, 
    [ dfpEnvironmentOptions ]);

  /** パラメータの何れかが変更された時に応答を削除する */
  React.useEffect(
    () => {
      setResponse(undefined);
      setResponseError(undefined);
    },
    [ dfpEnvironment, method, endpoint, requestParams ]
  );
  
  return (
    <div className={styles.root}>
      <div className={(props.mode === DisplayMode.Edit) ? `${styles.container} ${styles.containerEdit}` : styles.container}>
        { /** タイトル領域 */ }
        <div className={styles.titleArea}>
          {
            props.mode === DisplayMode.Read ?
              isEmpty(props.title) ? undefined: <p className={styles.title}>{props.title}</p> :
              <TextField
                borderless 
                placeholder={titlePlaceholder}
                value={props.title}
                className={styles.titleInput}
                onChange={(e, v) => { if(props.titleChanged) props.titleChanged(v); }} 
              />
          }
        </div>
        { /** コンテンツ領域 */ }
        <div>
          <Stack tokens={{ childrenGap: 10 }} >
            { /** 初期化エラー */ }
            {
              initializeError ?
                <Text variant='medium' className={styles.error}>{ initializeError.message }</Text> :
                undefined
            }
            { /** エンドポイントの指定 */ }
            <Endpoint
              dfpEnvironment={dfpEnvironment}
              method={method}
              endpoint={endpoint}
              dfpEnvironmentOptions={dfpEnvironmentOptions}
              onDfpEnvironmentChanged={(newValue) => { setDfpEnvironment(newValue); }}
              onMethodChanged={(newValue) => { setMethod(newValue); }}
              onEndpointChanged={(newValue) => { setEndpoint(newValue); }}
              onExecute={async () => {
                if(!props || !props.onExecute || !endpoint) return;

                setInitialized(false);

                let headers: Record<string, string> = {};
                if(requestParams && requestParams.headers) {
                  requestParams.headers.forEach((header) => {
                    if(header && header.enabled === true) {
                      headers[header.key] = header.value;
                    }
                  });
                }
              
                try {
                  const dfpResponse = await props.onExecute(
                    dfpEnvironment,
                    method,
                    endpoint,
                    headers,
                    requestParams ? requestParams.body : undefined
                  ).catch((ex) => { throw ex; });

                  setResponseError(undefined);
                  setResponse(dfpResponse);
                } catch(ex) {
                  setResponseError(ex);
                  setResponse(undefined);
                }

                setInitialized(true);
              }}
              onPresetRequestButtonClicked={() => {
                setPresetRequestDialogOpened(true);
              }}
              disabled={!initialized}
            />
            { /** 要求パラメータの指定 */ }
            <Parameters
              headers={!isEmpty(requestParams) ? requestParams.headers : []}
              body={!isEmpty(requestParams) ? requestParams.body : ''}
              onChange={(headers, body) => {
                const newRequestParams: IRequestParams = !isEmpty(requestParams) ? JSON.parse(JSON.stringify(requestParams)) : { headers: [], body: '' };
                newRequestParams.headers = headers;
                newRequestParams.body = body;
                setRequestParams(newRequestParams);
              }}
              disabled={!initialized}
            />
            { /** 応答 */ }
            {
              responseError ?
                <Response
                  typeName='IParametersErrorProps'
                  error={responseError}
                /> :
                response ?
                  <Response
                    typeName='IParametersProps'
                    response={response}
                  /> :
                  undefined
            }
            <PresetRequestDialog
              isOpen={presetRequestDialogOpened}
              onSelectRequest={(request) => {
                if(!request) return;

                // パラメータをセット
                if(dfpEnvironmentOptions && dfpEnvironmentOptions.length > 0) {
                  const globalOptionIndex = request.isGlobal === true ? dfpEnvironmentOptions.length - 1 : 0;
                  const globalOption = dfpEnvironmentOptions[globalOptionIndex];
                  const globalKey = globalOption && globalOption.key ? globalOption.key.toString() : undefined;
                  setDfpEnvironment(globalKey);
                }
                setMethod(request.method);
                setEndpoint(request.endpoint);
                setRequestParams({ headers: request.headers, body: request.body });

                // ダイアログを閉じる
                setPresetRequestDialogOpened(false);
              }}
              onClose={() => { setPresetRequestDialogOpened(false); }}
            />
          </Stack>
        </div>
      </div>
    </div>
  );
}