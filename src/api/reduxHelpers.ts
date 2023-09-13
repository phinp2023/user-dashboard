import { SystemConfig } from 'common/type-state';

export enum APIHosts {
    Mockup = 'hostMockup',
}

export class ApiReduxHelpers {
    config = {} as SystemConfig;

    getHost = (apiHost: APIHosts): string => {
        if (!this.config[apiHost]) {
            return '';
        }
        return this.config[apiHost];
    };

    setConfig = (config: SystemConfig): this => {
        this.config = config;
        return this;
    };
}
