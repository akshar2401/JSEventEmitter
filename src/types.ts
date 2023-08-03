export type Callback = (...args: any[]) => any;

export type Subscription = {
  unsubscribe: () => void;
};

export interface ISubscriptionQueue extends Iterable<Callback> {
  subscribe(callback: Callback): Subscription;
}

export interface IEventEmitter {
  subscribe(eventName: string, callback: Callback): Subscription;
  emit(eventName: string, ...args: any[]): any[];
}
