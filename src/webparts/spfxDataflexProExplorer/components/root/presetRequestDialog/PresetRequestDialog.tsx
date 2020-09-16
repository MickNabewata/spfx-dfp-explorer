import * as React from 'react';
import styles from './PresetRequestDialog.module.scss';
import { isEmpty } from '@microsoft/sp-lodash-subset';
import { useId } from '@uifabric/react-hooks';
import { presetRequestDialogTitle } from 'SpfxDataflexProExplorerWebPartStrings';
import { Button, Modal, Stack } from 'office-ui-fabric-react';
import IconButton from '../../iconButton/IconButton';
import { IHeader } from '../parameters/Parameters';
import { Method } from '../endpoint/Endpoint';

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
                TODO : サンプルの作成
                <Button
                    text='test'
                    onClick={() => {
                        props.onSelectRequest({
                            isGlobal: true,
                            method: 'GET',
                            endpoint: 'api/discovery/v2.0/Instances',
                            headers: [],
                            body: ''
                        });
                    }}
                />
            </div>
        </Modal>
    );
}