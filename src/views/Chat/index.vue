<script setup>
import { ref,watch } from 'vue';
import useWebSocket from './composable/useChat.js';

const newMessage = ref('');
const { message, error, send, close } = useWebSocket('ws://chat.server.url/');

const sendMessage = () => {
  if (newMessage.value) {
    send({
      user: 'currentUser',  // 发送用户名
      text: newMessage.value,
    });
    newMessage.value = '';
  }
};

watch(message, (msg) => {
  // 直接更新模板显示新消息
  addMessageToTemplate(msg); 
});

watch(error, (value) => {
  if (value) {
    close();
  }
});
</script>

<template>
  <!-- 显示所有用户的消息,带有用户名 -->
  <div v-for="message in messages">
    <div :class="message.user === 'currentUser' ? 'my-message' : 'other-message'">
      {{ message.user }}: {{ message.text }}
    </div>
  </div>
  <input type="text" v-model="newMessage" @keyup.enter="sendMessage" />
  <button @click="sendMessage">Send</button>
</template>


<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.messages {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
}

.my-message,
.other-message {
  display: block;
  padding: 0.5rem 1rem;
  margin: 0.5rem 0;
  border-radius: 1rem;
  max-width: 70%;
  word-wrap: break-word;
}

.my-message {
  background-color: #4caf50;
  color: white;
  text-align: right;
  margin-left: auto;
  border-bottom-right-radius: 0;
}

.other-message {
  background-color: #f1f1f1;
  color: black;
  text-align: left;
  margin-right: auto;
  border-bottom-left-radius: 0;
}

.input-container {
  display: flex;
  padding: 1rem;
}

input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 1rem;
  outline: none;
}
</style>