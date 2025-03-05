<template>
    <div class="message">
        <van-nav-bar title="消息中心" left-text="返回" @click-left="onClickLeft" left-arrow>
            <template #right>
                <div class="right">
                    <van-icon class="icon" name="friends-o" size="30" @click="toCustomerService"/>
                </div>
            </template>
        </van-nav-bar>
      <!-- 聊天列表 -->
      <van-cell-group>
        <van-cell
            v-for="item in messageList"
            :key="item.id"
            :title="item.name"
            :label="item.lastMessage"
            :to="`/msg/${item.id}?name=${item.name}`"
            clickable
        >
          <template #icon>
            <van-image
                round
                width="40"
                height="40"
                :src="item.avatar"
                style="margin-right: 10px"
            />
          </template>
          <template #right-icon>
            <div class="right-info">
              <div class="time">{{ item.time }}</div>
              <van-tag v-if="item.unread" type="danger">{{ item.unread }}</van-tag>
            </div>
          </template>
        </van-cell>
      </van-cell-group>
    </div>
</template>

<script setup>

import { useRouter } from 'vue-router';
import {ref} from "vue";

const router = useRouter();

//返回上一层
const onClickLeft = (() => {
    router.push('/home');
})

// 聊天页面模拟数据
const messageList = ref([
  {
    id: 'system',
    name: '系统通知',
    avatar: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
    lastMessage: '您有新的版本可以更新',
    time: '12:30',
    unread: 1
  },
  {
    id: 'activity',
    name: '活动通知',
    avatar: 'https://fastly.jsdelivr.net/npm/@vant/assets/dog.jpeg',
    lastMessage: '双十一活动即将开始',
    time: '昨天',
    unread: 0
  },
  {
    id: 'friend1',
    name: '张三',
    avatar: 'https://fastly.jsdelivr.net/npm/@vant/assets/logo.png',
    lastMessage: '晚上一起吃饭吗？',
    time: '09:45',
    unread: 3
  }
]);

// 跳转到联系客服页面
const toCustomerService = () => {
  router.push('/msg/customer');
};

</script>

<style lang="less" scoped>
.right {
    padding: 0;
    margin-top: 16px;
    .icon {
        line-height: 0px;
    }

    span {
        line-height: 0px;
    }
}

.right-info {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 12px;
  color: #969799;

  .van-tag {
    margin-top: 5px;
  }
}
.van-cell__title {
  margin-left: 10px;
}
</style>