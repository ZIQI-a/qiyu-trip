<template>
<!--  聊天详情页面-->
  <div class="chat-container">
    <van-nav-bar
        :title="contactName"
        left-text="返回"
        left-arrow
        @click-left="router.back()"
    />

    <!-- 聊天内容区域 -->
    <div class="message-list">
      <div
          v-for="msg in messages"
          :key="msg.id"
          class="message-item"
          :class="{ 'own-message': msg.isOwn }"
      >
        <van-image
            v-if="!msg.isOwn"
            round
            width="36"
            height="36"
            :src="contactAvatar"
        />
        <div class="message-content">
          <div class="message-bubble">{{ msg.content }}</div>
          <div class="message-time">{{ msg.time }}</div>
        </div>
      </div>
    </div>

    <!-- 输入区域 -->
    <div class="input-area">
      <van-field
          v-model="newMessage"
          placeholder="输入消息..."
          @keyup.enter="sendMessage"
      >
        <template #button>
          <van-button
              size="small"
              type="primary"
              @click="sendMessage"
          >发送</van-button>
        </template>
      </van-field>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const contactName = computed(() => route.query.name || '未知用户');
const contactAvatar = ref('https://fastly.jsdelivr.net/npm/@vant/assets/logo.png');

const newMessage = ref('');
const messages = ref([
  { id: 1, content: '你好呀！', time: '09:45', isOwn: false },
  { id: 2, content: '你好！晚上一起吃饭吗？', time: '09:46', isOwn: true },
  { id: 3, content: '可以啊，去哪里吃？', time: '09:47', isOwn: false }
]);

const sendMessage = () => {
  if (!newMessage.value.trim()) return;

  messages.value.push({
    id: Date.now(),
    content: newMessage.value,
    time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }),
    isOwn: true
  });

  newMessage.value = '';
};
</script>

<style scoped>
.chat-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.message-list {
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  background-color: #f5f5f5;
}

.message-item {
  display: flex;
  margin-bottom: 15px;
  align-items: flex-start;

  &.own-message {
    flex-direction: row-reverse;

    .message-content {
      align-items: flex-end;
    }

    .message-bubble {
      background-color: #07c160;
      color: white;
    }
  }
}

.message-content {
  max-width: 70%;
  margin: 0 10px;
}

.message-bubble {
  padding: 10px;
  border-radius: 8px;
  background-color: white;
  word-break: break-word;
}

.message-time {
  font-size: 12px;
  color: #969799;
  margin-top: 5px;
}

.input-area {
  border-top: 1px solid #eee;
  background-color: white;
}
</style>