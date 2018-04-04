var socketBase = process.env.REACT_APP_SOCKET_SERVER || 'http://localhost:9000/'

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
    },
    create_room: "create room",
    join_room: "joined room",
    update_total_number: "total_number"

}