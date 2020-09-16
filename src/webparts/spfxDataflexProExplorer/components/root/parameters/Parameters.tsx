import * as React from 'react';
import styles from './Parameters.module.scss';
import { requestBodyPivotLabel, requestHeadersPivotLabel, requestBodyPlaceholder, requestHeadersKeyText, requestHeadersValueText, requestHeaderKeyPlaceholder, requestHeaderValuePlaceholder, requestHeaderRowDeleteButtonTtitle } from 'SpfxDataflexProExplorerWebPartStrings';
import { isEmpty } from '@microsoft/sp-lodash-subset';
import { Pivot, PivotItem, TextField, IconButton, Checkbox, ITextField } from 'office-ui-fabric-react';
import Card from '../../card/Card';

/** 要求パラメータの指定 プロパティ */
export interface IParametersProps {
    /** 要求ヘッダ */
    headers: IHeader[];
    /** 要求本文 */
    body: string;
    /** 入力内容の変更イベント */
    onChange: (headers: IHeader[], body: string) => void;
    /** 無効フラグ */
    disabled: boolean;
}

/** ヘッダ */
export interface IHeader {
    /** キー */
    key: string;
    /** 値 */
    value: string;
    /** 有効フラグ */
    enabled: boolean;
}

/** テキストフィールドフォーカス */
interface IFocus {
    /** 対象フィールド */
    field: 'key' | 'value';
    /** 要素数 */
    index: number;
}

/** 要求パラメータの指定コンポーネント */
export default function Parameters(props: IParametersProps): JSX.Element {
    if(isEmpty(props)) return undefined;
    const [focus, setFocus] = React.useState<IFocus>();
    const [keyFieldRef, setKeyFieldRef] = React.useState<React.RefObject<ITextField>[]>([]);
    const [valueFieldRef, setValueFieldRef] = React.useState<React.RefObject<ITextField>[]>([]);

    /** プロパティのheadersと独立したIHeader配列を生成 */
    let headers: IHeader[] = !isEmpty(props.headers) ? JSON.parse(JSON.stringify(props.headers)) : [];

    /** headersの要素数が変更されたらcreateRefをやり直す */
    React.useEffect(
        () => {
            // headersの要素数分だけrefを生成
            setKeyFieldRef(headers.map(() => { return React.createRef(); }));
            setValueFieldRef(headers.map(() => { return React.createRef(); }));
        },
        [ headers.length ]
    );

    /** valueFieldRefの要素数が変更されたらフォーカスを当てなおす */
    React.useEffect(
        () => {
            if(focus && focus.index < valueFieldRef.length) {
                const ref = focus.field === 'key' ? keyFieldRef[focus.index] : valueFieldRef[focus.index];
                // refの中身が入るまで再帰実行
                const applyFocus = () => {
                    if(ref && ref.current) {
                        ref.current.focus();
                        setFocus(undefined);
                    } else {
                        setTimeout(() => { applyFocus(); }, 500);
                    }
                };
                applyFocus();
            }
        },
        [ valueFieldRef.length ]
    );

    return (
        <Card className={styles.palameters}>
            <Pivot>
                { /** 要求本文の入力タブ */ }
                <PivotItem headerText={requestBodyPivotLabel} itemIcon='Send' className={styles.tabContent}>
                    <TextField
                        placeholder={requestBodyPlaceholder}
                        value={props.body}
                        onChange={(e, v) => {
                            if(props.onChange) {
                                props.onChange(headers, v);
                            }
                        }}
                        autoAdjustHeight
                        multiline
                        disabled={props.disabled}
                    />
                </PivotItem>
                { /** 要求ヘッダの入力タブ */ }
                <PivotItem headerText={requestHeadersPivotLabel} itemIcon='FileComment'>
                    <table className={styles.headerTable} >
                        <thead>
                            <tr>
                                <th></th>
                                <th>{requestHeadersKeyText}</th>
                                <th>{requestHeadersValueText}</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                !isEmpty(headers) ?
                                    headers.map((header, i) => {
                                        const rowEnabled = !isEmpty(header) ? header.enabled : true;
                                        return (
                                            <tr key={`spfx-dfp-explorer-request-header-table-row${i}`} className={rowEnabled ? '' : styles.headerDisabled}>
                                                <td>
                                                    { /** 有効フラグ */ }
                                                    <Checkbox
                                                        checked={rowEnabled}
                                                        onChange={(ev, checked) => {
                                                            headers[i].enabled = checked;
                                                            if(props.onChange) props.onChange(headers, props.body);
                                                        }}
                                                        disabled={props.disabled}
                                                    />
                                                </td>
                                                <td>
                                                    { /** キー入力フィールド */ }
                                                    <TextField
                                                        placeholder={requestHeaderKeyPlaceholder}
                                                        value={!isEmpty(header) ? header.key : ''}
                                                        onChange={(e, v) => {
                                                            if(props.onChange) {
                                                                headers[i].key = v;
                                                                props.onChange(headers, props.body);
                                                            }
                                                        }}
                                                        componentRef={keyFieldRef[i]}
                                                        disabled={props.disabled}
                                                    />
                                                </td>
                                                <td>
                                                    { /** 値入力フィールド */ }
                                                    <TextField
                                                        placeholder={requestHeaderValuePlaceholder}
                                                        value={!isEmpty(header) ? header.value : ''}
                                                        onChange={(e, v) => {
                                                            if(props.onChange) {
                                                                headers[i].value = v;
                                                                props.onChange(headers, props.body);
                                                            }
                                                        }}
                                                        componentRef={valueFieldRef[i]}
                                                        disabled={props.disabled}
                                                    />
                                                </td>
                                                <td>
                                                    { /** 行削除ボタン */}
                                                    <IconButton
                                                        title={requestHeaderRowDeleteButtonTtitle}
                                                        iconProps={{ iconName: 'Delete' }}
                                                        onClick={() => {
                                                            headers.splice(i, 1);
                                                            props.onChange(headers, props.body);
                                                        }}
                                                        disabled={props.disabled}
                                                    />
                                                </td>
                                            </tr>
                                        );
                                    }) :
                                    undefined
                            }
                            <tr>
                                <td></td>
                                <td>
                                    { /** キー入力フィールド */ }
                                    <TextField
                                        placeholder={requestHeaderKeyPlaceholder}
                                        onChange={(e, v) => {
                                            setFocus({ field: 'key', index: headers.length });
                                            if(props.onChange) {
                                                headers.push({ key: v, value: '', enabled: true });
                                                props.onChange(headers, props.body);
                                            }
                                        }}
                                        value=''
                                        disabled={props.disabled}
                                    />
                                </td>
                                <td>
                                { /** 値入力フィールド */ }
                                    <TextField
                                        placeholder={requestHeaderValuePlaceholder}
                                        onChange={(e, v) => {
                                            setFocus({ field: 'value', index: headers.length });
                                            if(props.onChange) {
                                                headers.push({ key: '', value: v, enabled: true });
                                                props.onChange(headers, props.body);
                                            }
                                        }}
                                        value=''
                                        disabled={props.disabled}
                                    />
                                </td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </PivotItem>
            </Pivot>
        </Card>
    );
}