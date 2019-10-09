interface IApnConfig {
    name: string;
    conf: string;
}

export interface IApnConfigObj {
    [configId: string]: IApnConfig;
}

interface IApnConfigD {
    id: string;
    title: string;
    subtitle: string;
}

export interface IApnOperatorsD {
    title: string;
    configs: IApnConfigD[];
}
