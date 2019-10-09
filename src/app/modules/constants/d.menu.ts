import { IMenuItem } from '@modules/types/menu.i';

export const MENU_EXTRAS: IMenuItem[] = [
    {
        path: 'ap-network',
        title: 'Оператор',
        icon: 'wifi',
        extended: false
    },
    {
        path: 'server-ip',
        title: 'Сервер',
        icon: 'globe',
        extended: false
    },
    {
        path: 'time-lang',
        title: 'Дата, время, язык',
        icon: 'time',
        extended: false
    },
    {
        path: 'masters',
        title: 'Довер. номера',
        icon: 'contact',
        extended: true
    },
    {
        path: 'sos-nums',
        title: 'Номера SOS',
        icon: 'help-buoy',
        extended: true
    },
    {
        path: 'quick-nums',
        title: 'Быстрый набор',
        icon: 'switch',
        extended: true
    },
    {
        path: 'eavesdrop',
        title: 'Звонок и прослушка',
        icon: 'call',
        extended: true
    },
    {
        path: 'watch-conf',
        title: 'Параметры',
        icon: 'cog',
        extended: true
    },
    {
        path: 'contacts',
        title: 'Контакты',
        icon: 'contacts',
        extended: false
    },
    {
        path: 'help-full',
        title: 'Справка',
        icon: 'help-circle-outline',
        extended: false
    },
    {
        path: 'factory',
        title: 'Сброс настроек',
        icon: 'trash',
        extended: true
    },
    {
        path: 'about',
        title: 'О приложении',
        icon: 'information-circle-outline',
        extended: false
    }
];
