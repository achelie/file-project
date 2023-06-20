<script setup>
import useWebSocket from './composable/useWebSocket';
import { ElMessage } from 'element-plus';
import { useUserStore } from "@/stores/user"
import { ref, onMounted, nextTick } from 'vue';
const userStore = useUserStore()

// 调整滚动条到最下面
const chatBox = ref(null);
const scrollToBottom = async () => {
  nextTick(() => {
    chatBox.value.scrollTop = chatBox.value.scrollHeight;
  })
};

const { messages, isConnected, send } = useWebSocket('ws://192.168.1.151:8686/socket/' + userStore.userState.username, scrollToBottom);
// 发送信息
const msg = ref('')
const sendmsg = () => {
  if (msg.value.trim() === '') {
    ElMessage.error('输入内容不能为空');
    return;
  }
  send(JSON.stringify({ from: userStore.userState.username, msg: msg.value }))
  msg.value = ''
}



</script>

<template>
  <div class="chatContent" ref="chatBox">
    <ul>
      <li v-for="(item, index) in messages" :key="index"
        :class="[item.from == userStore.userState.username ? 'right' : 'left']">
          <div class="avatar"><el-avatar :size="size" :src="`http://192.168.1.151:8686/image/${item.avatar}`" /></div>
          <div class="username">{{ item.from }}</div>
          <div class="usermsg" :class="[item.from == userStore.userState.username ? 'right' : 'left']"><span
              class="spanMsg">{{ item.msg }}</span></div>
      </li>
    </ul>
  </div>
  <div class="sendBox">
    <el-input v-model="msg" placeholder="请输入内容" class="input-with-select" type="textarea"
      :autosize="{ minRows: 7, maxRows: 7 }"></el-input>
    <el-button @click="sendmsg" style="height: 157px;" type="primary">发送</el-button>
  </div>
</template>

<style scoped>
.username {
  color: #b1b1b1
}

.sendBox {
  display: flex;
  align-items: stretch;
  margin-bottom: 20px;
}

.el-input {
  flex: 1;
  margin-right: 10px;
}

.el-button {
  flex-shrink: 0;
}

.chatContent {
  height: calc(100vh - 230px);
  overflow-x: hidden;
}

ul {
  list-style: none;
  padding: 20px;
  margin: 0;
  font-size: 14px;
  line-height: 20px;
}

li.left {
  margin-right: 20px;
}

.avatar{
  position: relative;
  top: 52px;
}

li.left .username{
  position: relative;
  left: 50px;
}
li.left .usermsg{
  position: relative;
  left: 50px;
}

li.left .spanMsg {
  display: inline-block;
  border-radius: 0 15px 15px;
  background-color: rgba(66, 196, 240, 0.1);
  padding: 10px 15px;
}

li.right {
  margin-left: 20px;
  text-align: right;
}

li.right .username{
  position: relative;
  right:  50px;
}
li.right .usermsg{
  position: relative;
  right:  50px;
}

li.right .spanMsg {
  display: inline-block;
  border-radius: 15px 0 15px 15px;
  background-color: rgba(73, 154, 41, 0.1);
  padding: 10px 15px;
}

li+li {
  margin-top: 20px;
}

.ql-container.ql-snow {
  border: 0;
}

.ql-editor {
  padding: 0;
}</style>