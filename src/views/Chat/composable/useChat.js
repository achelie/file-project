import { ref, onMounted, onUnmounted } from 'vue';
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'

export default function useWebSocket(url) {
    const ws = ref(null);
    const message = ref(null);
    const error = ref(null);
    const connected = ref(false);

    const connect = () => {
        ws.value = new WebSocket(url);
        ws.value.onopen = () => {
            connected.value = true;
        };
        ws.value.onmessage = (event) => {
            message.value = JSON.parse(event.data);
        };
        ws.value.onerror = () => {
            error.value = true;
            connected.value = false;
        };
        ws.value.onclose = ws.value.onclose = () => {
            connected.value = false;
        };
    };
    const send = (data) => {
        if (ws.value.readyState === ws.value.OPEN) {
            ws.value.send(JSON.stringify(data));
        } else {
            // 提示用户重连
        }
    };
    const close = () => {
        ws.value.close();
    };
    onMounted(() => {
        connect();
    });
    onUnmounted(() => {
        close();
    });
    return {
        message,
        error,
        send,
        close,
        connected
    };
}