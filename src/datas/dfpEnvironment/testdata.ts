import { IEnvironment } from './cds';

/** Dataflex Pro環境一覧テストデータ取得 */
export async function getEnvironmentTestDatas(): Promise<IEnvironment[]> {
    const ret: any = [];

    return await new Promise<any>((resolve: (testData: any) => void) => {
        setTimeout(() => { resolve(ret); }, 1000);
    });
}