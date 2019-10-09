import { IApnConfigObj, IApnOperatorsD } from '@modules/types/operators.i';

export const APN_CONFIGS: IApnConfigObj = {
    mt_1: {
        name: 'логин/пароль: mts',
        conf: 'internet.mts.ru,mts,mts'
    },
    mt_2: {
        name: 'логин/пароль: –',
        conf: 'internet.mts.ru,,'
    },
    mg_1: {
        name: 'логин/пароль: –',
        conf: 'internet,,'
    },
    mg_2: {
        name: 'логин/пароль: gdata',
        conf: 'internet,gdata,gdata'
    },
    bl_1: {
        name: 'internet.beeline.ru',
        conf: 'internet.beeline.ru,beeline,beeline'
    },
    bl_2: {
        name: 'home.beeline.ru',
        conf: 'home.beeline.ru,beeline,beeline'
    },
    t2_1: {
        name: 'internet.tele2.ru',
        conf: 'internet.tele2.ru,,'
    },
    yo_1: {
        name: 'internet.yota',
        conf: 'internet.yota,,'
    }
};

export const MOBILE_OPS: IApnOperatorsD[] = [
    {
        title: 'МТС',
        configs: [
            { id: 'mt_1', title: 'Вариант 1', subtitle: APN_CONFIGS.mt_1.name },
            { id: 'mt_2', title: 'Вариант 2', subtitle: APN_CONFIGS.mt_2.name }
        ]
    },
    {
        title: 'Мегафон',
        configs: [
            { id: 'mg_1', title: 'Вариант 1', subtitle: APN_CONFIGS.mg_1.name },
            { id: 'mg_2', title: 'Вариант 2', subtitle: APN_CONFIGS.mg_2.name }
        ]
    },
    {
        title: 'Билайн',
        configs: [
            { id: 'bl_1', title: 'Вариант 1', subtitle: APN_CONFIGS.bl_1.name },
            { id: 'bl_2', title: 'Вариант 2', subtitle: APN_CONFIGS.bl_2.name }
        ]
    },
    {
        title: 'Теле 2',
        configs: [
            { id: 't2_1', title: 'Вариант 1', subtitle: APN_CONFIGS.t2_1.name }
        ]
    },
    {
        title: 'Yota',
        configs: [
            { id: 'yo_1', title: 'Вариант 1', subtitle: APN_CONFIGS.yo_1.name }
        ]
    }
];
