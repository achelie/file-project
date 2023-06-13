<script setup>
import useChat from './composable/useChat';
const { messages, newMessage, currentUser, sendMessage } = useChat();
</script>

<template>
  <!-- 聊天室模板，根据您的需求进行调整 -->
  <div>
    <div v-for="(message, index) in messages" :key="index">
      <div :class="message.user === currentUser ? 'my-message' : 'other-message'">
        {{ message.text }}
      </div>
    </div>
    <input type="text" v-model="newMessage" @keyup.enter="sendMessage" />
    <button @click="sendMessage">Send</button>
  </div>
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