import { Callback, ISubscriptionQueue, Subscription } from "./types";

class SubscriptionQueueNode {
  prev: SubscriptionQueueNode | null;
  next: SubscriptionQueueNode | null;

  constructor(public readonly callback: Callback) {
    this.prev = null;
    this.next = null;
  }
}

class SubscriptionQueue implements ISubscriptionQueue {
  private head: SubscriptionQueueNode | null = null;
  private tail: SubscriptionQueueNode | null = null;

  public subscribe(callback: Callback): Subscription {
    const node = new SubscriptionQueueNode(callback);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail!.next = node;
      node.prev = this.tail;
      this.tail = node;
    }

    return {
      unsubscribe: () => {
        this.unsubscribe(node);
      },
    };
  }

  private unsubscribe(node: SubscriptionQueueNode) {
    if (!this.head) return;
    if (node == this.head) {
      this.head = node.next;
    }

    if (node == this.tail) {
      this.tail = node.prev;
    }

    if (node.prev) {
      node.prev.next = node.next;
    }

    if (node.next) {
      node.next.prev = node.prev;
    }
  }

  *[Symbol.iterator]() {
    let current = this.head;
    while (current) {
      yield current.callback;
      current = current.next;
    }
  }
}

export function createSubscriptionQueue(): ISubscriptionQueue {
  return new SubscriptionQueue();
}
