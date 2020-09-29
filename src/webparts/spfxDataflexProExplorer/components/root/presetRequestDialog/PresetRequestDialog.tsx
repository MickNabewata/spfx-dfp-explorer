import * as React from 'react';
import styles from './PresetRequestDialog.module.scss';
import { isEmpty } from '@microsoft/sp-lodash-subset';
import { useId } from '@uifabric/react-hooks';
import { presetRequestDialogTitle, presetRequestEnvironmentCategory, presetRequestEntityCategory, presetRequestListEnvironmentTitle, presetRequestListEnvironmentDescription, presetRequestListEntityTitle, presetRequestListEntityDescription, presetRequestGetEntityTitle, presetRequestGetEntityDescription } from 'SpfxDataflexProExplorerWebPartStrings';
import { PrimaryButton, Modal, Stack } from 'office-ui-fabric-react';
import IconButton from '../../iconButton/IconButton';
import { IHeader } from '../parameters/Parameters';
import { Method } from '../endpoint/Endpoint';
import Accordion from '../../accordion/Accordion';

/** サンプルリクエストダイアログコンポーネント プロパティ */
export interface IPresetRequestDialogProps {
    /** 開閉状態 */
    isOpen: boolean;
    /** サンプルリクエスト選択イベント */
    onSelectRequest: (request: IPresetRequest) => void;
    /** クローズイベント */
    onClose: () => void;
}

/** サンプルリクエスト */
export interface IPresetRequest {
    /** 組織サービスか否か */
    isGlobal: boolean;
    /** HTTPメソッド */
    method: Method;
    /** エンドポイントURL */
    endpoint: string;
    /** 要求ヘッダ */
    headers: IHeader[];
    /** 要求本文 */
    body: string;
}

/** サンプルリクエストデータ */
interface IRequestData extends IPresetRequest {
    /** タイトル */
    title: string;
    /** 説明 */
    description: string;
}

/** サンプルリクエストデータカテゴリ */
interface IRequestCategory {
    /** タイトル */
    title: string;
    /** サンプルリクエストデータ一覧 */
    requests: IRequestData[];
}

/** サンプルリクエストデータ一覧 */
const presets: IRequestCategory[] = [
    {
        title: presetRequestEnvironmentCategory,
        requests: [
            {
                title: presetRequestListEnvironmentTitle,
                description: presetRequestListEnvironmentDescription,
                isGlobal: true,
                method: 'GET',
                endpoint: 'api/discovery/v2.0/Instances',
                headers: [],
                body: ''
            }
        ]
    },
    {
        title: presetRequestEntityCategory,
        requests: [
            {
                title: presetRequestListEntityTitle,
                description: presetRequestListEntityDescription,
                isGlobal: false,
                method: 'GET',
                endpoint: 'api/data/v9.0',
                headers: [],
                body: ''
            },
            {
                title: presetRequestGetEntityTitle,
                description: presetRequestGetEntityDescription,
                isGlobal: false,
                method: 'GET',
                endpoint: 'api/data/v9.0/accounts',
                headers: [],
                body: ''
            }
        ]
    }
];

/** サンプルリクエストダイアログコンポーネント */
export default function PresetRequestDialog(props: IPresetRequestDialogProps): JSX.Element {
    if(isEmpty(props)) return undefined;
    const titleId = useId('title');
    
    return (
        <Modal
            titleAriaId={titleId}
            isOpen={props.isOpen}
            isBlocking={false}
            onDismiss={props.onClose}
            containerClassName={styles.presetRequestDialog}
        >
            <div>
                <Stack horizontal horizontalAlign='space-between'>
                    <h2 id={titleId}>{presetRequestDialogTitle}</h2>
                    <Stack verticalAlign='center'>
                        <IconButton
                            iconProps={{ iconName: 'Cancel' }}
                            onClick={props.onClose}
                        />
                    </Stack>
                </Stack>
            </div>
            <div>
                {presets.map((preset, i) => {
                    return (
                        <Accordion title={preset.title} key={`spfx-dfp-explorer-preset-category-${i}`}>
                            <Stack horizontal horizontalAlign='center' tokens={{ childrenGap: 10 }}>
                                {preset.requests.map((request, j) => {
                                    return (
                                        <PrimaryButton
                                            text={request.title}
                                            title={request.description}
                                            onClick={() => {
                                                props.onSelectRequest({
                                                    isGlobal: request.isGlobal,
                                                    method: request.method,
                                                    endpoint: request.endpoint,
                                                    headers: request.headers,
                                                    body: request.body
                                                });
                                            }}
                                            key={`spfx-dfp-explorer-preset-request-${i}-${j}`}
                                        />
                                    );
                                })}
                            </Stack>
                        </Accordion>
                    );
                })}
            </div>
        </Modal>
    );
}