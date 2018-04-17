import EventBase from '../core/events/EventsBase';

class UserEvents extends EventBase {
    constructor() {
        super();
        this.USER_INBANDEVENT_RECEIVED = 'userInbandEventReceived';
        this.USER_DLS_SIGNAL = 'userDlsSignal';
    }
}
let Userevents = new UserEvents();
export default Userevents;