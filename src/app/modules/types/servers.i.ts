interface IServerConfig {
    ip: string;
    port: string;
}

export interface IServerConfigObj {
    [configId: string]: IServerConfig;
}

export interface IServerConfigD {
    id: string;
    title: string;
}

export interface IServerConfigsD {
    title: string;
    configs: IServerConfigD[];
}
