import {Subscription} from "rxjs";

export class SubscriptionContainer {
  private _subscriptions: Subscription[] = [];

  public set add(subscription: Subscription) {
    this._subscriptions.push(subscription);
  }

  public dispose() {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
