export class SignalRHubConnesso {
    static readonly type = '[signalR] Hub Connesso';
}

export class SignalRHubDisconnesso {
    static readonly type = '[signalR] Hub Disconnesso';
}

export class SetConnectionId {
    static readonly type = '[signalR] Set Connection ID';

    constructor(public connectionId: string) {
    }
}
