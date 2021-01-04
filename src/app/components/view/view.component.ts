import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ViewBase } from './view.base';

@Component({
    selector: 'app-view',
    templateUrl: './view.component.html',
    styleUrls: ['./view.component.scss'],
})
export class ViewComponent extends ViewBase implements OnInit, OnDestroy {
    @Input() busy = false;
    @Input() error: string = undefined;
    @Input() warning: string = undefined;
    _subscriptions: Subscription[] = [];

    constructor() {
        super();
    }

    ngOnInit(): void {
        // if (this.error || this.warning) {
        //     this.setFocus('error');
        // }
    }

    ngOnDestroy(): void {
        this._subscriptions.forEach((s) => s.unsubscribe());
    }

    subscriptions(subscription: Subscription): void {
        this._subscriptions.push(subscription);
    }
}
