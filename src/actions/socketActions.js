export const SOCKET_CONNECT = 'SOCKET_CONNECT'
export const SOCKET_AUTHENTICATING = 'SOCKET_AUTHENTICATING'
export const SOCKET_DISCONNECTED = 'SOCKET_DISCONNECTED'
export const SOCKET_AUTHENTICATED = 'SOCKET_AUTHENTICATED'


export function socketAuthenticated(articleId) {
    return {
        type: SOCKET_AUTHENTICATED,
        data: articleId
    }

}
export function socketDisconnected() {
    return {
        type: SOCKET_DISCONNECTED
    }
}
export function socketReconnectAttempt() {
    return {
        type: SOCKET_AUTHENTICATING
    }
}