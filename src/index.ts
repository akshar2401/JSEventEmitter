import { createEventEmitter } from "./EventEmitter";

const emitter = createEventEmitter();
emitter.subscribe("event1", () => console.log("event1.one"));
emitter.subscribe("event2", () => console.log("event2.one"));
const event1Sub2 = emitter.subscribe("event1", () => console.log("event1.two"));
emitter.subscribe("event1", () => console.log("event1.three"));
emitter.subscribe("event2", () => console.log("event2.two"));
emitter.emit("event1");
emitter.emit("event2");
emitter.subscribe("event3", (a: number, b: number) =>
  console.log("event3.one:", a + b)
);
event1Sub2.unsubscribe();
emitter.emit("event1");
emitter.emit("event2");
emitter.emit("event3", 2, 3);

export { createEventEmitter };
