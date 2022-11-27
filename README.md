# Typed Events
A zero Dependency drop-in replacement for NodeJS EventEmitter to support strictly typed events without modifying the EventEmitter namespace.

## Why?
When using NodeJS's EventEmitter, typings are not enforced. This means that you can listen to events that don't exist and might encounter unexpected event arguments when listening to an event.

After searching for a while I couldn't find an open source library that helps with this, so I decided to create one myself.

## When to use it
If you are working with typescript and know exactly what events will be emitted and what data they will pass along: This lobrary is exactly for you!

Not only does it enable valuable intellisense during development, it also ensures your events are type safe and easy to use for people who use your project.

## Installation
Using npm:
```bash
$ npm i -g npm
$ npm i @astrogd/typed-events
```

## Usage
Import the package
```typescript
import { TypedEventEmitter, CustomEvents } from '@astrogd/typed-events';
```

Declare your events
```typescript
interface MyEvents extends CustomEvents {
  'my-event': (myArg: string) => void;
  'my-other-event': (myArg: boolean, mySecondArg?: number) => void;
}
```

Create a new instance of the TypedEventEmitter and start using it like the NodeJS EventEmitter
```typescript
const events = new TypedEventEmitter<MyEvents>();
```

## Example
```typescript
import { TypedEventEmitter, CustomEvents } from '@astrogd/typed-events';

// You can define your events as an interface...
interface MyEvents extends CustomEvents {
    'my-event': (someArgument: boolean) => void;
    'removeListener': (customArgument: boolean) => void;
}

// ...or as a custom type
type MyEventsType = {
    'my-event': (someArgument: boolean) => void;
    'removeListener': (customArgument: boolean) => void;
}

const events = new TypedEventEmitter<MyEvents>();
events.emit("my-event", true); // Our own events work
events.emit("newListener", "my-event", () => {}); // Default events from NodeJS's EventEmitter are supported too!

// You can also merge a custom implementation of a default event and types will be supported
events.emit("removeListener", "my-event", () => {});
events.emit("removeListener", true);

// Types for the listener function are inferred and ready to use!
events.on("my-event", (customArgument) => {
    console.log(customArgument);
})

events.on("removeListener", (firstArg: boolean | string | symbol, secondArg?: Function) => {
    // Yeay we merged the default listener types with the custom implementation!
});

// You can also attach the typed event emitter to your custom class:
class MyCoolClass extends TypedEventEmitter<MyEventsType> {
    constructor() {
        super();

        this.emit("my-event", true); // Works out of the box
    }
}
```

## Copyright
```
Copyright (c) AstroGD Lukas Weber. All rights reserved.

This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.

Covered Software is provided under this License on an "as is"
basis, without warranty of any kind, either expressed, implied, or
statutory, including, without limitation, warranties that the
Covered Software is free of defects, merchantable, fit for a
particular purpose or non-infringing. The entire risk as to the
quality and performance of the Covered Software is with You.
Should any Covered Software prove defective in any respect, You
(not any Contributor) assume the cost of any necessary servicing,
repair, or correction. This disclaimer of warranty constitutes an
essential part of this License. No use of any Covered Software is
authorized under this License except under this disclaimer.
```