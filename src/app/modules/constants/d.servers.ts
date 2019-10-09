import { IServerConfigObj, IServerConfigsD } from '@modules/types/servers.i';

export const SERVER_CONFIGS: IServerConfigObj = {
    seEur: {
        ip: '52.28.132.157', port: '8001'
    },
    findMy_tcp: {
        ip: 'tcp.findmykids.org', port: '8001'
    },
    aibeile: {
        ip: 'a6.gps18.com', port: '7755'
    },
    mayak: {
        ip: 'im-ok.net', port: '8001'
    },
    findMy_ip: {
        ip: '92.53.87.162', port: '8001'
    },
    wokka: {
        ip: '188.227.74.231', port: '12300'
    },
    asgard: {
        ip: '87.118.101.202', port: '5565'
    },
    liveGps: {
        ip: '5.9.136.109', port: '3359'
    },
    seAsia: {
        ip: '54.169.10.136', port: '8001'
    },
    seAmerN: {
        ip: '54.153.6.9', port: '8001'
    },
    seAmerS: {
        ip: '54.207.93.14', port: '8001'
    },
    seHk: {
        ip: '58.96.181.173', port: '8001'
    }
};

export const SERVER_OPS: IServerConfigsD[] = [
    {
        title: 'Популярные',
        configs: [
            { id: 'seEur', title: 'SeTracker (Европа)' },
            { id: 'findMy_tcp', title: 'Где мои дети (tcp)' },
            { id: 'aibeile', title: 'Aibeile' },
            { id: 'mayak', title: 'Маяк' }
        ]
    },
    {
        title: 'Прочие',
        configs: [
            { id: 'findMy_ip', title: 'Где мои дети (ip)' },
            { id: 'wokka', title: 'Wokka Lokka' },
            { id: 'asgard', title: 'Asgard' },
            { id: 'liveGps', title: 'LiveGPS' },
            { id: 'seAsia', title: 'SeTracker (Азия)' },
            { id: 'seAmerN', title: 'SeTracker (Сев. Америка)' },
            { id: 'seAmerS', title: 'SeTracker (Юж. Америка)' },
            { id: 'seHk', title: 'SeTracker (Гонконг)' }
        ]
    }
];
