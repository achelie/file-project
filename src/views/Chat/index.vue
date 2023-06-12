<script setup>
import { io } from 'socket.io-client';

const socket = io('ws://192.168.1.151:8686/socket/1');

socket.on('connect', () => {
    console.log('Connected to WebSocket server');
});

socket.on('message', (data) => {
    console.log('Received message:', data);
});

socket.emit('message', 'Hello, WebSocket server!');
</script>
<template></template>