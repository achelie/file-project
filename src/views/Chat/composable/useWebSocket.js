import { ref, onMounted, onUnmounted } from 'vue';

export default function useWebSocket(url) {
  const ws = ref(null);
  const messages = ref([]);
  const isConnected = ref(false);

  const connect = () => {
    ws.value = new WebSocket(url);

    ws.value.onopen = () => {
      console.log('WebSocket connection opened.');
      isConnected.value = true;
    };

    ws.value.onmessage = (event) => {
      console.log('WebSocket message received:', event.data)
      if(JSON.parse(event.data).data){
          messages.value = JSON.parse(JSON.parse(event.data).data)
      }
      else{
          messages.value.push(JSON.parse(event.data));
      }
      console.log(messages.value);
    };

    ws.value.onerror = (error) => {
      console.error('WebSocket error occurred:', error);
    };

    ws.value.onclose = () => {
      console.log('WebSocket connection closed.');
      isConnected.value = false;
    };
  };

  const send = (data) => {
    if (ws.value.readyState === WebSocket.OPEN) {
      ws.value.send(data);
    } else {
      console.error('WebSocket connection not open.');
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
    messages,
    isConnected,
    send,
    close,
  };
}