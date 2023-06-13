import { ref, onMounted, onUnmounted } from 'vue';
import { io } from 'socket.io-client';
import {useUserStore} from "@/stores/user"
export default function useChat() {
  const userStore = useUserStore()
  const messages = ref([]);
  const newMessage = ref('');
  const currentUser = ref(userStore.userState.username);

  let socket;

  onMounted(() => {
    socket = io(`ws://192.168.1151:8686/socket/${userStore.userState.username}`); // 替换为您的Socket.io服务器URL

    socket.on('message', (message) => {
      messages.value.push(message);
    });
  });

  onUnmounted(() => {
    if (socket) {
      socket.disconnect();
    }
  });

  function sendMessage() {
    if (newMessage.value.trim() !== '') {
      const message = { user: currentUser.value, text: newMessage.value.trim() };
      messages.value.push(message);

      socket.emit('message', message);

      newMessage.value = '';
    }
  }

  return {
    messages,
    newMessage,
    currentUser,
    sendMessage,
  };
}