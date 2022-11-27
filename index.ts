/***********************************************************************
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
***********************************************************************/

import EventEmitter from "node:events";

export type CustomEvents = Record<string, (...args: any[]) => void>;

type DefaultEventEmitterEvents = {
    "newListener": (eventName: string | symbol, listener: Function) => void;
    "removeListener": (eventName: string | symbol, listener: Function) => void;
};

type ListenerType<K extends EventNames<T>, T extends CustomEvents> = T[Extract<K, keyof T>] extends never ? DefaultEventEmitterEvents[Extract<K, keyof DefaultEventEmitterEvents>] extends never ? never : DefaultEventEmitterEvents[Extract<K, keyof DefaultEventEmitterEvents>] : DefaultEventEmitterEvents[Extract<K, keyof DefaultEventEmitterEvents>] extends never ? T[Extract<K, keyof T>] : T[Extract<K, keyof T>] & DefaultEventEmitterEvents[Extract<K, keyof DefaultEventEmitterEvents>];
type EventNames<T extends CustomEvents> = Extract<keyof T | keyof DefaultEventEmitterEvents, string>;
type ArgsType<K extends EventNames<T>, T extends CustomEvents> = T[Extract<K, keyof T>] extends never ? DefaultEventEmitterEvents[Extract<K, keyof DefaultEventEmitterEvents>] extends never ? never : Parameters<DefaultEventEmitterEvents[Extract<K, keyof DefaultEventEmitterEvents>]> : DefaultEventEmitterEvents[Extract<K, keyof DefaultEventEmitterEvents>] extends never ? Parameters<T[Extract<K, keyof T>]> : Parameters<T[Extract<K, keyof T>]> | Parameters<DefaultEventEmitterEvents[Extract<K, keyof DefaultEventEmitterEvents>]>;

export default class TypedEventEmitter<T extends CustomEvents> extends EventEmitter {
    constructor() {
        super();
    }

    override addListener<K extends EventNames<T>>(event: K, listener: ListenerType<K, T>) {
        return super.addListener(event, listener);
    }

    override emit<K extends EventNames<T>>(eventName: K, ...args: ArgsType<K, T>): boolean {
        return super.emit(eventName, ...args);
    }

    override off<K extends EventNames<T>>(eventName: K, listener: ListenerType<K, T>): this {
        return super.off(eventName, listener);
    }

    override on<K extends EventNames<T>>(eventName: K, listener: ListenerType<K, T>): this {
        return super.on(eventName, listener);
    }

    override once<K extends EventNames<T>>(eventName: K, listener: ListenerType<K, T>): this {
        return super.once(eventName, listener);
    }

    override prependListener<K extends EventNames<T>>(eventName: K, listener: ListenerType<K, T>): this {
        return super.prependListener(eventName, listener);
    }

    override prependOnceListener<K extends EventNames<T>>(eventName: K, listener: ListenerType<K, T>): this {
        return super.prependOnceListener(eventName, listener);
    }

    override removeAllListeners<K extends EventNames<T>>(event?: K): this {
        return super.removeAllListeners(event);
    }

    override removeListener<K extends EventNames<T>>(eventName: K, listener: ListenerType<K, T>): this {
        return super.removeListener(eventName, listener);
    }

    override rawListeners<K extends EventNames<T>>(eventName: K): Function[] {
        return super.rawListeners(eventName);
    }

}

export {
    TypedEventEmitter
}