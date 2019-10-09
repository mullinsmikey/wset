import { Component, OnInit } from '@angular/core';
import * as _const from '@modules/constants/utf-enc';

import { LifecycleService, MessagesService, NavigationService, SharedNativeService } from '@app/services';

interface IContact {
    name: string;
    number: string;
}

@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.page.html',
    styleUrls: ['./contacts.page.scss']
})
export class ContactsPage implements OnInit {

    // noinspection JSUnusedGlobalSymbols
    constructor(
        public navigation: NavigationService,
        public lifecycle: LifecycleService,
        public sharedNative: SharedNativeService,
        private messages: MessagesService
    ) {
    }

    // noinspection JSUnusedGlobalSymbols
    // initDone = false;

    numbers: IContact[] = [
        { name: '', number: '' },
        { name: '', number: '' },
        { name: '', number: '' },
        { name: '', number: '' },
        { name: '', number: '' }
    ];

    // DOM interaction
    // ---------------------------------------------------

    encodeEngine(text: string, uniDic: string[], utfDic: string[]) {
        uniDic.forEach((uniChar: string, uniIx: number) => {
            text = text.replace(new RegExp(uniChar, 'g'), utfDic[uniIx]);
        });
        return text;
    }

    encodeUtf16(text: string) {
        if (text === '') { return ''; }
        text = this.encodeEngine(text, _const.uniLatUp, _const.utfLatUp);
        text = this.encodeEngine(text, _const.uniLatLow, _const.utfLatLow);
        text = this.encodeEngine(text, _const.uniCyrUp, _const.utfCyrUp);
        text = this.encodeEngine(text, _const.uniCyrLow, _const.utfCyrLow);
        return text;
    }

    async exec() {
        const ph1 = this.numbers[0].number + ',' + this.encodeUtf16(this.numbers[0].name) + ',';
        const ph2 = this.numbers[1].number + ',' + this.encodeUtf16(this.numbers[1].name) + ',';
        const ph3 = this.numbers[2].number + ',' + this.encodeUtf16(this.numbers[2].name) + ',';
        const ph4 = this.numbers[3].number + ',' + this.encodeUtf16(this.numbers[3].name) + ',';
        const ph5 = this.numbers[4].number + ',' + this.encodeUtf16(this.numbers[4].name);
        await this.messages.fnSendParam('phb', ph1 + ph2 + ph3 + ph4 + ph5);
    }

    // Data processing
    // ---------------------------------------------------

    // async loadPage() {
    // }

    // Lifecycle
    // ---------------------------------------------------

    async ngOnInit() {
        // await this.lifecycle.init(this);
    }

}
