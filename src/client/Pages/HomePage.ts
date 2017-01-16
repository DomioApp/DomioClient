import * as moment from 'moment/moment';

export class HomePage {
    private timestampLabels: any;

    constructor() {
        this.init();
    }

    private init() {
        this.start();
    }

    private start() {
        this.updateTimestampLabels();
        setInterval(this.updateTimestampLabels.bind(this), 1000 * 60);
    }

    private updateTimestampLabels() {
        this.timestampLabels = document.querySelectorAll('[data-time-ago]');
        (<any>this.timestampLabels).forEach((el: HTMLElement) => {
            const timestamp = el.getAttribute('data-time-ago');
            el.textContent = moment(parseInt(timestamp)).fromNow();
        });
    }
}
