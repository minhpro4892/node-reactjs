import {
    SOCKET_AUTHENTICATED,
    SOCKET_DISCONNECTED,
    SOCKET_AUTHENTICATING
} from '../actions/socketActions'
const init = {
    authented: false,
    connected: false,
    fleetId: '',
    reconnecting: 0
}
export default function socket(state = init, action = {}) {
    switch (action.type) {
        case SOCKET_AUTHENTICATED:
            return { ...state, fleetId: action.data, authented: true, connected: true, reconnecting: 0 }
        case SOCKET_DISCONNECTED:
            return { ...state, connected: false }
        case SOCKET_AUTHENTICATING:
            return { ...state, connected: false, reconnecting: (state.reconnecting + 1) }
        default:
            return state;
    }
}