<template>
  <div class="chat-container">
    <van-nav-bar
        title="奇遇旅途客服"
        left-text="返回"
        left-arrow
        @click-left="router.back()"
    />

    <!-- 聊天内容区域 -->
    <div class="message-list">
      <!-- 系统自动发送的注意事项 -->
      <div class="message-item">
        <van-image
            round
            width="36"
            height="36"
            src="https://fastly.jsdelivr.net/npm/@vant/assets/logo.png"
        />
        <div class="message-content">
          <div class="message-bubble system-message">
            <h4>欢迎使用奇遇旅途客服！</h4>
            <p>以下是您需要了解的注意事项：</p>
            <ol>
              <li>预订成功后请及时查看订单详情</li>
              <li>入住前3天会发送房东联系方式</li>
              <li>取消政策因房源不同可能有差异</li>
              <li>遇到问题请第一时间联系平台客服</li>
            </ol>
            <p>常见问题解答：</p>
            <ul class="faq-links">
              <li @click="showAnswer(1)">1. <a href="javascript:;">什么是奇遇旅途？</a></li>
              <li @click="showAnswer(2)">2. <a href="javascript:;">如何预订民宿？</a></li>
              <li @click="showAnswer(3)">3. <a href="javascript:;">如何联系房东？</a></li>
              <li @click="showAnswer(4)">4. <a href="javascript:;">取消政策说明</a></li>
            </ul>
          </div>
          <div class="message-time">{{ new Date().toLocaleTimeString() }}</div>
        </div>
      </div>

      <!-- 用户消息 -->
      <div
          v-for="msg in messages"
          :key="msg.id"
          class="message-item own-message"
      >
        <div class="message-content">
          <div class="message-bubble">{{ msg.content }}</div>
          <div class="message-time">{{ msg.time }}</div>
        </div>
      </div>

      <!-- 客服自动回复 -->
      <div
          v-for="reply in replies"
          :key="reply.id"
          class="message-item"
      >
        <van-image
            round
            width="36"
            height="36"
            src="https://fastly.jsdelivr.net/npm/@vant/assets/logo.png"
        />
        <div class="message-content">
          <div class="message-bubble">{{ reply.content }}</div>
          <div class="message-time">{{ reply.time }}</div>
        </div>
      </div>
    </div>

    <!-- 输入区域 -->
    <div class="input-area">
      <van-field
          v-model="newMessage"
          placeholder="输入您的问题..."
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
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const newMessage = ref('');
const messages = ref([]);
const replies = ref([]);

// 预定义问答库
const qaList = {
  1: {
    question: "什么是奇遇旅途？",
    answer: "奇遇旅途是专业的线上民宿预订平台，我们致力于为您提供独特的住宿体验，精选全国优质民宿房源，让您的每次旅行都成为奇妙冒险。"
  },
  2: {
    question: "如何预订民宿？",
    answer: `预订五步曲：
    1. 搜索目的地和日期
    2. 浏览精选房源
    3. 查看房源详情和评价
    4. 填写订单并支付
    5. 接收确认信息`
  },
  3: {
    question: "如何联系房东？",
    answer: "成功预订后，您可以在：\n1. 订单详情页查看房东联系方式\n2. 入住前3天系统会自动发送房东联系方式\n3. 通过平台消息系统直接联系"
  },
  4: {
    question: "取消政策说明",
    answer: "取消政策因房源不同可能有差异：\n• 宽松政策：入住前3天免费取消\n• 适中政策：入住前7天免费取消\n• 严格政策：入住前14天免费取消\n具体政策请查看房源详情页"
  }
};

const showAnswer = (id) => {
  const answer = qaList[id].answer;
  replies.value.push({
    id: Date.now(),
    content: answer,
    time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
  });
};

const sendMessage = () => {
  if (!newMessage.value.trim()) return;

  // 用户消息
  messages.value.push({
    id: Date.now(),
    content: newMessage.value,
    time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
  });

  // 模拟自动回复
  setTimeout(() => {
    replies.value.push({
      id: Date.now(),
      content: "感谢您的咨询！如需人工服务请直接留言，我们将在2分钟内响应。",
      time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    });
  }, 1000);

  newMessage.value = '';
};

// 进入时自动滚动到底部
onMounted(() => {
  const container = document.querySelector('.message-list');
  container.scrollTop = container.scrollHeight;
});
</script>

<style lang="less" scoped>

.chat-container {
  height: 100vh;
  display: flex;
  flex-direction: column;

  .message-list {
    flex: 1;
    overflow-y: auto;
    background: #f5f5f5;
    // 给输入框留出空间
    padding: 16px 16px 80px 16px;
  }

  .fixed-input {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    padding: 12px 16px;
    box-shadow: 0 -2px 12px rgba(0,0,0,0.05);

    .van-field {
      background: #f8f8f8;
      border-radius: 20px;
    }
  }
}

// 优化消息样式
.message-item {
  display: flex;
  margin-bottom: 16px;

  .van-image {
    flex-shrink: 0;
    margin-right: 12px;
  }

  &.own-message {
    flex-direction: row-reverse;

    .message-bubble {
      background: #07c160;
      color: white;
      border-radius: 16px 16px 4px 16px;
    }
  }

  .message-bubble {
    background: white;
    padding: 12px 16px;
    border-radius: 16px 16px 16px 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    line-height: 1.5;

    &.system-message {
      background: #f0f9eb;
      color: #333;
      border: 1px solid #e1f3d8;

      h4 {
        color: #67c23a;
        margin-bottom: 8px;
      }

      ol, ul {
        margin: 8px 0;
        padding-left: 20px;
      }

      .faq-links {
        li {
          margin: 8px 0;

          a {
            color: #409eff;
            transition: color 0.2s;

            &:active {
              color: #79bbff;
            }
          }
        }
      }
    }
  }
}

</style>