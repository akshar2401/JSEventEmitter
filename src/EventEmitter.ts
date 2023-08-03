import { createSubscriptionQueue } from "./SubscriptionQueue";
import {
  Callback,
  IEventEmitter,
  ISubscriptionQueue,
  Subscription,
} from "./types";

class EventEmitter implements IEventEmitter {
  private registry = new Map<string, ISubscriptionQueue>();

  subscribe(eventName: string, callback: Callback): Subscription {
    let subs = this.registry.get(eventName);
    if (!subs) {
      subs = createSubscriptionQueue();
      this.registry.set(eventName, subs);
    }
    return subs.subscribe(callback);
  }

  emit(eventName: string, ...args: any[]): any[] {
    const subs = this.registry.get(eventName);
    const results: any[] = [];
    if (subs) {
      for (const callback of subs) {
        results.push(callback(...args));
      }
    }
    return results;
  }
}

export function createEventEmitter(): IEventEmitter {
  return new EventEmitter();
}
