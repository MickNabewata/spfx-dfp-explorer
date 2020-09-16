import { AadHttpClient } from '@microsoft/sp-http';
import * as moment from 'moment';

/** HTTPメソッド */
export type Method = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

/** 環境情報(API接続用) */
interface IRawEnvironment {
    ApiUrl: string;
    EnvironmentId: string;
    FriendlyName: string;
    Id: string;
    IsUserSysAdmin: string;
    LastUpdated: string;
    OrganizationType: number;
    Purpose: string;
    Region: string;
    State: number;
    StatusMessage: number;
    TenantId: string;
    TrialExpirationDate: string;
    UniqueName: string;
    Url: string;
    UrlName: string;
    Version: string;
}

/** 環境情報 */
export interface IEnvironment {
    ApiUrl: string;
    EnvironmentId: string;
    FriendlyName: string;
    Id: string;
    IsUserSysAdmin: boolean;
    LastUpdated: Date;
    OrganizationType: number;
    Purpose: string;
    Region: string;
    State: number;
    StatusMessage: number;
    TenantId: string;
    TrialExpirationDate: Date;
    UniqueName: string;
    Url: string;
    UrlName: string;
    Version: string;
}

/** Dataflex Pro環境一覧取得 */
export async function getEnvironments(client: AadHttpClient): Promise<IEnvironment[]> {
    const response = await client.get('https://globaldisco.crm.dynamics.com/api/discovery/v2.0/Instances', AadHttpClient.configurations.v1);
    if(response.ok) {
        const rawBody = await response.json();
        if(!rawBody) return undefined;
        
        const rawEnv: IRawEnvironment[] = rawBody.value;
        return retriveEnv(rawEnv);
    } else {
        Promise.reject(`${response.status}:${await response.text()}`);
    }
}

/** APIから得られた値を返却用の値に変換 */
function retriveEnv(rawEnv: IRawEnvironment[]): IEnvironment[] {
    if(!rawEnv) return undefined;

    return rawEnv.map((env) => {
        return {
            ApiUrl: env.ApiUrl,
            EnvironmentId: env.EnvironmentId,
            FriendlyName: env.FriendlyName,
            Id: env.Id,
            IsUserSysAdmin: env.IsUserSysAdmin ? Boolean(env.IsUserSysAdmin) : undefined,
            LastUpdated: env.LastUpdated ? moment(env.LastUpdated).toDate() : undefined,
            OrganizationType: env.OrganizationType,
            Purpose: env.Purpose,
            Region: env.Region,
            State: env.State,
            StatusMessage: env.StatusMessage,
            TenantId: env.TenantId,
            TrialExpirationDate: env.TrialExpirationDate ? moment(env.TrialExpirationDate).toDate() : undefined,
            UniqueName: env.UniqueName,
            Url: env.Url,
            UrlName: env.UrlName,
            Version: env.Version
        } as IEnvironment;
    });
}