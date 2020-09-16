import * as React from 'react';
import styles from './Endpoint.module.scss';
import { emptyDropDownPlaceholder, endpointPlaceholder, executeButtonText, presetRequestButtonTitle } from 'SpfxDataflexProExplorerWebPartStrings';
import { isEmpty } from '@microsoft/sp-lodash-subset';
import { Stack, Dropdown, IDropdownOption, TextField, PrimaryButton, Text } from 'office-ui-fabric-react';
import IconButton from '../../iconButton/IconButton';

/** エンドポイントの指定コンポーネント プロパティ */
export interface IEndpointProps {
    /** Dataflex Pro 環境一覧 */
    dfpEnvironmentOptions: IDropdownOption[];
    /** Dataflex Pro 選択中のキー */
    dfpEnvironment: string;
    /** Dataflex Pro 選択変更イベント */
    onDfpEnvironmentChanged: (newValue: string) => void;
    /** HTTP メソッド */
    method: string;
    /** HTTP メソッド 選択変更イベント */
    onMethodChanged: (newValue: string) => void;
    /** エンドポイントURL */
    endpoint: string;
    /** エンドポイントURL 変更イベント */
    onEndpointChanged: (newValue: string) => void;
    /** 実行処理 */
    onExecute: () => Promise<void>;
    /** サンプルリクエストボタンクリックイベント */
    onPresetRequestButtonClicked: () => void;
    /** 無効フラグ */
    disabled: boolean;
}

/** HTTPメソッド */
export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

/** HTTPメソッド選択コントロールの選択肢 */
const methodOptions: IDropdownOption[] = [
    { key: 'GET', text: 'GET' },
    { key: 'POST', text: 'POST' },
    { key: 'PUT', text: 'PUT' },
    { key: 'PATCH', text: 'PATCH' },
    { key: 'DELETE', text: 'DELETE' }
];

/** エンドポイントの指定コンポーネント */
export default function Endpoint(props: IEndpointProps): JSX.Element {
    if(isEmpty(props)) return undefined;

    return (
        <div className={styles.endpoint}>
            <Stack horizontal verticalAlign='center' tokens={{ childrenGap: 10 }} >
                {/** サンプルリクエスト */}
                <IconButton
                    iconProps={{ iconName: 'FolderSearch' }}
                    onClick={props.onPresetRequestButtonClicked}
                    title={presetRequestButtonTitle}
                />
                {/** HTTPメソッド */}
                <Dropdown
                    options={methodOptions}
                    placeHolder={emptyDropDownPlaceholder}
                    onChange={(e, o, i) => { if(props.onMethodChanged) props.onMethodChanged(!isEmpty(o) && !isEmpty(o.key) ? o.key.toString() : undefined); }}
                    selectedKey={props.method}
                    disabled={props.disabled}
                />
                {/** Dataflex Pro環境 */}
                <Dropdown
                    options={props.dfpEnvironmentOptions}
                    placeHolder={emptyDropDownPlaceholder}
                    onChange={(e, o, i) => { if(props.onDfpEnvironmentChanged) props.onDfpEnvironmentChanged(!isEmpty(o) && !isEmpty(o.key) ? o.key.toString() : undefined); }}
                    selectedKey={props.dfpEnvironment}
                    disabled={props.disabled}
                />
                <Text variant='medium' >/</Text>
                {/** エンドポイントURL */}
                <TextField
                    placeholder={endpointPlaceholder}
                    value={props.endpoint}
                    onChange={(e, v) => { if(props.onEndpointChanged) props.onEndpointChanged(v); }}
                    className={styles.endpointUrl}
                    disabled={props.disabled}
                />
                {/** 実行 */}
                <PrimaryButton
                    text={executeButtonText}
                    onClick={async () => { 
                        if(props.onExecute) {
                            await props.onExecute();
                        }
                    }}
                    disabled={props.disabled || isEmpty(props.dfpEnvironment) || isEmpty(props.method) || isEmpty(props.endpoint)}
                />
            </Stack>
        </div>
    );
}