
const isDev = process.env.NODE_ENV === 'development'
export const myWebSocket = {
    url: isDev ? "ws://127.0.0.1:8081/api/webSocket/":"wss://friend.wcw231407.cn/api/websocket/${uid}/${stats.value.team.teamId}"
}

