class EventEmitter {

    constructor() {
        this.events = {};
    }

    chain(events, value) {
        if (!events || !(events instanceof Array))
            throw new Error('Events array chain must be declared');
        if (!(events.length > 1))
            throw new Error('Events chain must contain more than one event');
        events.reduce((acc, event) => this.publish(event, acc), value);
    }

    create(name, callback = function () {}) {
        if (!name)
            throw new Error('Event name must be specified');
        if (!(callback instanceof Function))
            throw new Error('Event callback must be a function');

        if (this.events.hasOwnProperty(name)) {
            this.events[name].callback = callback
            return;
        }
        this.events[name] = {
            subscribers: [],
            callback: callback
        };
    }


    publish(name, value = null) {
        if (!this.events.hasOwnProperty(name))
            throw new Error('Event is not registered');
        let event = this.events[name];
        let ret = event.callback(value);
        event.subscribers.forEach((subscriber) => {
            subscriber.element.innerHTML = (!subscriber.callback) ? ret : subscriber.callback(ret);
        })
        return ret;
    }

    subscribe(name, subscriber, custom_callback = null) {
        if (!this.events.hasOwnProperty(name))
            throw new Error(`${name} Event is not registered`);
        if (!subscriber)
            throw new Error('Event subscriber not defined');
        let event = this.events[name];
        let callback = custom_callback ? custom_callback : null;
        event.subscribers.push({
            'element': subscriber,
            callback: callback
        });
    }


}