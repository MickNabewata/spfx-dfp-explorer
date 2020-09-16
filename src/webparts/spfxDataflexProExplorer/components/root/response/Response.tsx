import * as React from 'react';
import styles from './Response.module.scss';
import { HttpClientResponse } from '@microsoft/sp-http';
import { responseBodyPivotLabel, responseHeadersPivotLabel } from 'SpfxDataflexProExplorerWebPartStrings';
import { isEmpty } from '@microsoft/sp-lodash-subset';
import { Text, Pivot, PivotItem, TextField } from 'office-ui-fabric-react';
import Card from '../../card/Card';

/** 応答コンポーネント プロパティ(正常) */
export interface IParametersProps {
    /** 型名 */
    typeName: 'IParametersProps';
    /** 応答 */
    response: HttpClientResponse;
}

/** 応答コンポーネント プロパティ(エラー) */
export interface IParametersErrorProps {
    /** 型名 */
    typeName: 'IParametersErrorProps';
    /** エラー */
    error: Error;
}

/** 応答コンポーネント */
export default function Parameters(props: IParametersProps | IParametersErrorProps): JSX.Element {
    if(isEmpty(props)) return undefined;
    const [ body, setBody ] = React.useState<string>('');

    // コンポーネント描画完了 および 更新処理
    React.useEffect(() => {
        let unmounted = false;

        if(!unmounted && props.typeName === 'IParametersProps') {
            retriveResponse(props.response).then(
                (retrivedBody) => {
                    setBody(retrivedBody);
                }
            );
        }

        return () => { unmounted = true; };
    }, [ props ]);

    return (
        <Card className={styles.response}>
            {
                props.typeName === 'IParametersProps' ?
                    <Pivot>
                        { /** 応答本文タブ */ }
                        <PivotItem headerText={responseBodyPivotLabel} itemIcon='Reply' className={styles.tabContent}>
                            <TextField
                                value={body}
                                readOnly
                                multiline
                                autoAdjustHeight
                            />
                        </PivotItem>
                        { /** 応答ヘッダタブ */ }
                        <PivotItem headerText={responseHeadersPivotLabel} itemIcon='FileComment' className={styles.tabContent}>
                            <TextField
                                value={retriveResponseHeaders(props.response)}
                                readOnly
                                multiline
                                autoAdjustHeight
                            />
                        </PivotItem>
                    </Pivot> :
                    <Text variant='medium' className={styles.error}>{props.error ? props.error.message : ''}</Text>
            }
        </Card>
    );
}

/** 応答本文の読み取り */
async function retriveResponse(response: HttpClientResponse): Promise<string> {
    if(isEmpty(response)) return '';

    let ret: string = JSON.stringify(await response.json(), null, '\t');
    if(!response.ok) {
        ret = `error!\r\n\r\nstatus:${response.status}\r\nstatusText:${response.statusText}\r\n\r\n${ret}`;
    }

    return ret;
}

/** 応答ヘッダの読み取り */
function retriveResponseHeaders(response: HttpClientResponse): string {
    if(isEmpty(response)) return '';

    const headers = {};
    response.headers.forEach((key, value, parent) => {
        headers[key] = value;
    });

    return JSON.stringify(headers, null, '\t');
}