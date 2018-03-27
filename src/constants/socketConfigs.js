var socketBase = process.env.REACT_APP_SOCKET_SERVER || 'http://localhost:9000/api'

export const socketConfig = {
    socketServer: socketBase,
    send: {
        login: "login",
        article: {
            addArticle: "addArticle",
            updateArticle: "updateArticle",
            deleteArticle: "deleteArticle"
        }
    },
    receive: {
        article: {
            addArticle: "addArticle",
            updateArticle: "updateArticle",
            deleteArticle: "deleteArticle"
        }
    }
}