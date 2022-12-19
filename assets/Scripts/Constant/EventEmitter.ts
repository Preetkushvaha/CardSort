export class EventEmitter {
    events: any;
    hosts: any;

    constructor() {
        this.events = {};
        this.hosts = {};
    }

    on(event: string, listener: any, host: any) {
        if (typeof this.events[event] !== 'object') {
            this.events[event] = [];
            this.hosts[event] = [];
        }

        this.events[event].push(listener);
        this.hosts[event].push(host);
    }

    removeListener(event: string, listener: any, host: any) {
        var idx;
       
        if (typeof this.events[event] === 'object' && typeof this.hosts[event] === 'object') {
            idx = this.events[event].indexOf(listener);
            if (idx > -1) {
                this.events[event].splice(idx, 1);
                this.hosts[event].splice(idx, 1);
            }
        

        }
    }

    emit(event: string, ...args: any[]) {
        var i, hosts, listeners, length;

        if (typeof this.events[event] === 'object') {
            listeners = this.events[event].slice();
            hosts = this.hosts[event].slice();
            length = listeners.length;

            for (i = 0; i < length; i++) {
                if (this.events[listeners[i]] !== null) {
                    listeners[i].apply(hosts[i], args);
                }
                else {
                    listeners[i].apply(this, args);
                }
            }
        }
    }

    once(event: string, listener: any, host: any) {
        this.on(event, () => {
            this.removeListener(event, listener, host);
            listener.apply(this, arguments);
        }, host);
    }
    
}

export const Event = new EventEmitter();

