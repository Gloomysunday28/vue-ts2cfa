<template>
<div class="question-short-detail FBH FBAC">
  <div class="FBH FBAC">
    <a-icon type="edit"></a-icon>
    <span class="ml4 mr8" :title="item.questioner.email">{{item.questioner.fullName}}</span>
    <span class="mr8">提问于</span>
    <span>{{formatDate(item.createTime)}}</span>
  </div>
  <Divider type="vertical" v-if="item.lastReplyInfo"></Divider>
  <div class="FBH FBAC" v-if="item.lastReplyInfo">
    <img :src="replyIcon" width="14px">
    <span class="ml4 mr8">最新回答</span>
    <span>{{formatDate(item.updateTime)}}</span>
    <span class="ml8 mr8">来自</span>
    <span class="">{{$get(item, 'lastReplyInfo.replierName', '无')}}</span>
  </div>
  <Divider type="vertical"></Divider>
  <div class="FBH FBAC">
    <!-- <a-icon type="environment" /> -->
    <img :src="locationIcon" width="14px">
    <span class="ml4">{{item.serviceInfo.name}}</span>
  </div>
  <Divider type="vertical"></Divider>
  <div class="FBH FBAC">
    <a-tooltip placement="top" :title="`浏览次数：${item.viewNum}`">
      <div class="FBH FBAC mr8">
        <a-icon type="eye"></a-icon>
        <span class="ml4">{{item.viewNum}}</span>
      </div>
    </a-tooltip>
    <a-tooltip placement="top" :title="`关注人数：${itemCopy.followNum}，${itemCopy.followed ? '您已关注' : '您未关注'}`">
      <div class="FBH FBAC hand usnone" @click="debounceStarClick">
        <div class="star-container" :style="`color: ${itemCopy.followed ? 'rgb(255, 207, 0)' : ''}`">
          <a-icon type="star" theme="filled"></a-icon>
        </div>
        <span class="ml4">{{itemCopy.followNum}}</span>
      </div>
    </a-tooltip>
    <a-tooltip v-if="showAnswerNum" placement="top" :title="`回答次数：${item.replyNum}`">
      <div class="FBH FBAC ml8">
        <!-- <a-icon type="eye" /> -->
        <img :src="replyLineIcon" width="20px">
        <span class="">{{item.replyNum}}</span>
      </div>
    </a-tooltip>
  </div>
</div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
import { Divider, Tooltip } from 'ant-design-vue';
import { debounce } from 'lodash';
import { formatDate } from '@/utils/util';
import { followQuestion, unFollowQuestion } from '@/services/index';

const replyIcon = require('@/assets/reply.svg');

const replyLineIcon = require('@/assets/reply-line.svg');

const locationIcon = require('@/assets/location.svg');

export default defineComponent({
  "name": "QuestionShortDetail",
  components: {
    Divider,
    'a-tooltip': Tooltip
  },

  setup(props, context) {
    let _replyIcon = replyIcon;
    let _replyLineIcon = replyLineIcon;
    let _locationIcon = locationIcon;
    let _formatDate = formatDate;
    return {
      replyIcon: _replyIcon,
      replyLineIcon: _replyLineIcon,
      locationIcon: _locationIcon,
      formatDate: _formatDate
    };
  },

  props: {
    item: {},
    showAnswerNum: {
      default: false
    }
  },
  computed: {
    pagination() {
      const pagination = this.$store.state["question/pagination"];
      return pagination;
    }

  },

  data() {
    let // 属性保存一份copy
    _itemCopy = JSON.parse(JSON.stringify(this.item));

    let _debounceStarClick: any;

    return {
      itemCopy: _itemCopy,
      debounceStarClick: _debounceStarClick
    };
  },

  methods: {
    updatePaginationInfo(...rest) {
      return this.$store.commit.apply(this.$store, ["question/updatePaginationInfo"].concat(rest));
    },

    getTableList(...rest) {
      return this.$store.dispatch("question/getTableList", ...rest);
    },

    constructor(props: any) {
      super(props);
      this.debounceStarClick = debounce(this.onStarClick, 300);
    },

    async onStarClick() {
      console.log('onStarClick:', this.item.id);
      const operation = !this.itemCopy.followed ? followQuestion : unFollowQuestion; // 添加关注

      // 添加关注
      try {
        await operation({
          questionId: this.item.id
        }); // 改变颜色

        // 改变颜色
        this.itemCopy.followed = !this.itemCopy.followed; // 改变数字

        // 改变数字
        if (this.itemCopy.followed) {
          this.itemCopy.followNum += 1;
        } else {
          this.itemCopy.followNum -= 1;
        }
      } catch (error) {// this.itemCopy.followed = this.itemCopy.followed
      }
    },

    upateDetail(value) {
      this.itemCopy = JSON.parse(JSON.stringify(value));
    }

  },
  watch: {
    'item': {
      handler: "upateDetail"
    }
  }
});
</script>
  
<style lang="stylus" scoped="true">
.question-short-detail

  .star-container
    opacity 0.9

    &:hover
      opacity 1

</style>
