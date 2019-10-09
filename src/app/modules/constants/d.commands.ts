import { ICommandButton } from '@modules/types/commands.i';

export const BUTTONS_SIMPLE: ICommandButton[] = [
    {
        command: 'ts',
        title: 'Тек. настройки',
        icon: 'construct',
        color: 'success'
    },
    {
        command: 'tt',
        title: 'Reg. code',
        icon: 'barcode',
        color: 'success'
    },
    {
        command: 'url',
        title: 'Геопозиция',
        icon: 'pin',
        color: 'primary'
    },
    {
        command: 'find',
        title: 'Подать звук',
        icon: 'volume-high',
        color: 'primary'
    },
    {
        command: 'poweroff',
        title: 'Выключение',
        icon: 'power',
        color: 'danger'
    },
    {
        command: 'reset',
        title: 'Перезапуск',
        icon: 'refresh',
        color: 'danger'
    }
];
