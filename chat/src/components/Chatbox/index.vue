<template>
  <section>
    <div id="chat-circle" class="btn btn-raised" v-show="!show" @click="openChatbox">
      <div id="chatbox__overlay"></div>
      <i class="fa fa-comment" />
    </div>

    <transition>
      <div class="chatbox" v-show="show">
        <div class="chatbox__header">
          OGANI
          <span class="chatbox__toggle" @click="show = !show"><i class="fa fa-close" />
          </span>
        </div>
        <div class="chatbox__body">
          <div class="chatbox__overlay"></div>
          <!--chat logs -->
          <div class="chat__logs">
            <div
:id="`cm-msg-${i}`" v-for="(message, i) in messageArr" :key="i"
              :class="`chatbox__msg ${message.type}`">
              <div class="cm-msg-text" :class="{ 'cm-msg-item': typeof message.content === 'object' }">
                <div
v-if="typeof message.content === 'object'" class="chatbox__item-content cursor-pointer"
                  @click="openNewTab(message.content)">
                  <img :alt="message.content?.name" :src="message.content?.list_img?.[0]?.url" />
                  <div class="chatbox__item-text">
                    <div class="chatbox__item-title">
                      {{ message.content?.name }}
                    </div>
                    <div class="chatbox__item-price">
                      ${{ message.content?.price }}
                    </div>
                  </div>
                </div>
                <div v-else>
                  {{ message.content }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="chatbox__item" v-if="item">
          <div class="chatbox__item-content">
            <img :alt="item.name" :src="item.list_img?.[0]?.url" />
            <div class="chatbox__item-text">
              <div class="chatbox__item-title">
                {{ item.name }}
              </div>
              <div class="chatbox__item-price">${{ item.price }}</div>
            </div>
          </div>
          <i @click="removeItem" class="chatbox__item-close fa fa-close" />
        </div>
        <div class="chat__input">
          <form>
            <input type="text" id="chat__input" v-model="input" placeholder="Send a message..." />
            <button type="submit" @click="submitMessage" class="chat-submit" id="chat-submit">
              <i class="fa fa-paper-plane" />
            </button>
          </form>
        </div>
      </div>
    </transition>
  </section>
</template>
<script lang="ts">
import { defineComponent } from "vue";
//@ts-ignore
import { IProduct } from "@components/Product/product.type.ts";
import globalStorage from "@/utils/loadStorage";

export default defineComponent({
  name: "Chatbox",
  props: {
    navigate: Function
  },
  data() {
    const msgArr = globalStorage.getChatData()
    return {
      item: null as IProduct,
      index: 0,
      input: "",
      show: false,
      messageArr: msgArr || [],
    };
  },
  watch: {
    messageArr() {
      this.$nextTick(() => { this.scrollToEnd() });
    }
  },
  mounted() {
    document.body.addEventListener("show-chat-item", (e: any) => this.showItemInChat(e.detail.chatData), true);
  },
  updated() {
    this.$nextTick(() => { this.scrollToEnd() });
  },
  methods: {
    showItemInChat(data: any) {
      this.item = data.item;
      this.show = data.show;
    },
    scrollToEnd() {
      const el = this.$el.getElementsByClassName('chat__logs')[0]
      el.scrollTop = el.lastElementChild?.offsetTop;
    },
    generateMessage(msg: string, type: any) {
      const vm: any = this;
      vm.index++;
      const newMessageArr = [...vm.messageArr]
      if (vm.item) {
        newMessageArr.push({
          type,
          content: vm.item,
        });
        vm.removeItem();
      }
      newMessageArr.push({
        type,
        content: msg,
      });
      vm.messageArr = newMessageArr
      globalStorage.addMessage(vm.messageArr)
      if (type == "self") {
        vm.input = "";
      }
    },
    submitMessage(e: Event) {
      e.preventDefault();
      let msg = this.input;
      if (msg.trim() == "") {
        return false;
      }
      this.generateMessage(msg, "self");
    },
    openChatbox(_e?: Event, item?: any) {
      if (item) {
        this.item = item;
      } else {
        this.removeItem();
      }
      this.show = true;
    },
    removeItem() {
      this.item = null;
    },
    openNewTab(item: any) {
      window.open(`/shop/${item?.id}`, '_blank')
    }
  },
});
</script>
<style lang="scss">
@import "@/assets/scss/variables";

.cursor-pointer {
  cursor: pointer;
}

/* Transition */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

/* Chatbox */
#chat-circle {
  position: fixed;
  bottom: 50px;
  z-index: 1;
  right: 50px;
  background: $primary-color;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  color: white;
  padding: 28px;
  cursor: pointer;
  box-shadow: 0px 3px 16px 0px rgba(0, 0, 0, 0.6),
    0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.btn#my-btn {
  background: white;
  padding-top: 13px;
  padding-bottom: 12px;
  border-radius: 45px;
  padding-right: 40px;
  padding-left: 40px;
  color: $primary-color;
}

#chatbox__overlay {
  background: rgba(255, 255, 255, 0.1);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.chatbox {
  background: #efefef;
  z-index: 1;
  position: fixed;
  right: 30px;
  bottom: 50px;
  width: 350px;
  max-width: 85vw;
  max-height: 100vh;
  border-radius: 5px;
  /*   box-shadow: 0px 5px 35px 9px #464a92; */
  box-shadow: 0px 5px 35px 9px #ccc;
}

.chatbox__toggle {
  float: right;
  margin-right: 15px;
  cursor: pointer;
}

.chatbox__header {
  background: $primary-color;
  height: 70px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  color: white;
  text-align: center;
  font-size: 20px;
  padding-top: 17px;
}

.chatbox__body {
  position: relative;
  height: 370px;
  border: 1px solid #ccc;
  overflow: hidden;
}

.chatbox__body:after {
  content: "";
  background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTAgOCkiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+PGNpcmNsZSBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS4yNSIgY3g9IjE3NiIgY3k9IjEyIiByPSI0Ii8+PHBhdGggZD0iTTIwLjUuNWwyMyAxMW0tMjkgODRsLTMuNzkgMTAuMzc3TTI3LjAzNyAxMzEuNGw1Ljg5OCAyLjIwMy0zLjQ2IDUuOTQ3IDYuMDcyIDIuMzkyLTMuOTMzIDUuNzU4bTEyOC43MzMgMzUuMzdsLjY5My05LjMxNiAxMC4yOTIuMDUyLjQxNi05LjIyMiA5LjI3NC4zMzJNLjUgNDguNXM2LjEzMSA2LjQxMyA2Ljg0NyAxNC44MDVjLjcxNSA4LjM5My0yLjUyIDE0LjgwNi0yLjUyIDE0LjgwNk0xMjQuNTU1IDkwcy03LjQ0NCAwLTEzLjY3IDYuMTkyYy02LjIyNyA2LjE5Mi00LjgzOCAxMi4wMTItNC44MzggMTIuMDEybTIuMjQgNjguNjI2cy00LjAyNi05LjAyNS0xOC4xNDUtOS4wMjUtMTguMTQ1IDUuNy0xOC4xNDUgNS43IiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS4yNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHBhdGggZD0iTTg1LjcxNiAzNi4xNDZsNS4yNDMtOS41MjFoMTEuMDkzbDUuNDE2IDkuNTIxLTUuNDEgOS4xODVIOTAuOTUzbC01LjIzNy05LjE4NXptNjMuOTA5IDE1LjQ3OWgxMC43NXYxMC43NWgtMTAuNzV6IiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS4yNSIvPjxjaXJjbGUgZmlsbD0iIzAwMCIgY3g9IjcxLjUiIGN5PSI3LjUiIHI9IjEuNSIvPjxjaXJjbGUgZmlsbD0iIzAwMCIgY3g9IjE3MC41IiBjeT0iOTUuNSIgcj0iMS41Ii8+PGNpcmNsZSBmaWxsPSIjMDAwIiBjeD0iODEuNSIgY3k9IjEzNC41IiByPSIxLjUiLz48Y2lyY2xlIGZpbGw9IiMwMDAiIGN4PSIxMy41IiBjeT0iMjMuNSIgcj0iMS41Ii8+PHBhdGggZmlsbD0iIzAwMCIgZD0iTTkzIDcxaDN2M2gtM3ptMzMgODRoM3YzaC0zem0tODUgMThoM3YzaC0zeiIvPjxwYXRoIGQ9Ik0zOS4zODQgNTEuMTIybDUuNzU4LTQuNDU0IDYuNDUzIDQuMjA1LTIuMjk0IDcuMzYzaC03Ljc5bC0yLjEyNy03LjExNHpNMTMwLjE5NSA0LjAzbDEzLjgzIDUuMDYyLTEwLjA5IDcuMDQ4LTMuNzQtMTIuMTF6bS04MyA5NWwxNC44MyA1LjQyOS0xMC44MiA3LjU1Ny00LjAxLTEyLjk4N3pNNS4yMTMgMTYxLjQ5NWwxMS4zMjggMjAuODk3TDIuMjY1IDE4MGwyLjk0OC0xOC41MDV6IiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMS4yNSIvPjxwYXRoIGQ9Ik0xNDkuMDUgMTI3LjQ2OHMtLjUxIDIuMTgzLjk5NSAzLjM2NmMxLjU2IDEuMjI2IDguNjQyLTEuODk1IDMuOTY3LTcuNzg1LTIuMzY3LTIuNDc3LTYuNS0zLjIyNi05LjMzIDAtNS4yMDggNS45MzYgMCAxNy41MSAxMS42MSAxMy43MyAxMi40NTgtNi4yNTcgNS42MzMtMjEuNjU2LTUuMDczLTIyLjY1NC02LjYwMi0uNjA2LTE0LjA0MyAxLjc1Ni0xNi4xNTcgMTAuMjY4LTEuNzE4IDYuOTIgMS41ODQgMTcuMzg3IDEyLjQ1IDIwLjQ3NiAxMC44NjYgMy4wOSAxOS4zMzEtNC4zMSAxOS4zMzEtNC4zMSIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjEuMjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvZz48L3N2Zz4=");
  opacity: 0.1;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  height: 100%;
  position: absolute;
  z-index: -1;
}

#chat__input {
  background: #f4f7f9;
  width: 100%;
  position: relative;
  height: 47px;
  padding-top: 10px;
  padding-right: 50px;
  padding-bottom: 10px;
  padding-left: 15px;
  border: none;
  resize: none;
  outline: none;
  border: 1px solid #ccc;
  color: #888;
  border-top: none;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  overflow: hidden;
}

.chat__input>form {
  margin-bottom: 0;
}

#chat__input::-webkit-input-placeholder {
  /* Chrome/Opera/Safari */
  color: #ccc;
}

#chat__input::-moz-placeholder {
  /* Firefox 19+ */
  color: #ccc;
}

#chat__input:-ms-input-placeholder {
  /* IE 10+ */
  color: #ccc;
}

#chat__input:-moz-placeholder {
  /* Firefox 18- */
  color: #ccc;
}

.chat-submit {
  position: absolute;
  bottom: 6px;
  right: 10px;
  background: transparent;
  box-shadow: none;
  border: none;
  border-radius: 50%;
  color: $primary-color;
  width: 35px;
  height: 35px;
}

.chat__logs {
  padding: 15px;
  height: 370px;
  overflow-y: scroll;
  overflow-x: hidden;
  padding-bottom: 60px;
}

.chat__logs::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #f5f5f5;
}

.chat__logs::-webkit-scrollbar {
  width: 5px;
  background-color: #f5f5f5;
}

.chat__logs::-webkit-scrollbar-thumb {
  background-color: $primary-color;
}

@media only screen and (max-width: 500px) {
  .chat__logs {
    height: 40vh;
  }
}

.chatbox__msg.user>.msg-avatar img {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  float: left;
  width: 15%;
}

.chatbox__msg.self>.msg-avatar img {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  float: right;
  width: 15%;
}

.cm-msg-text {
  background: white;
  padding: 10px 15px 10px 15px;
  color: #666;
  max-width: 75%;
  float: left;
  margin-left: 10px;
  position: relative;
  margin-bottom: 10px;
  border-radius: 30px;
  word-break: break-wrold;
}

.chatbox__msg {
  clear: both;
}

.chatbox__msg.self {
  &>.cm-msg-text {
    float: right;
    margin-right: 10px;
    background: $primary-color;
    color: white;
  }

  &>.cm-msg-item {
    background: white;
  }
}

.cm-msg-button>ul>li {
  list-style: none;
  float: left;
  width: 50%;
}

.cm-msg-button {
  clear: both;
  margin-bottom: 70px;
}

.chatbox__item-content {
  display: flex;
  position: relative;
  align-items: center;

  img {
    width: 50px;
    height: 50px;
  }

  .chatbox__item-text {
    display: flex;
    flex-direction: column;
    margin-left: 8px;

    .chatbox__item-title {
      max-width: 166px;
      font-size: 12px;
      line-height: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      word-break: break-all;
      color: #333;
    }

    .chatbox__item-price {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;
      font-weight: 500;
      margin-top: 4px;
      margin-top: 8px;

      font-size: 12px;
      line-height: 14px;
      font-weight: 500;
      color: #ee4d2d;

      max-width: 166px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}

.chatbox__item {
  position: relative;
  width: 100%;
  height: 76px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #f7f8fb;
  border: 1px solid #ccc;

  .chatbox__item-close {
    position: absolute;
    top: 8px;
    right: 8px;
    height: 10px;
    width: 10px;
    margin-left: 28px;
    color: #bbb;
    cursor: pointer;
  }
}
</style>
