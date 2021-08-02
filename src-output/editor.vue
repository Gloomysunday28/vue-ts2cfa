<template>
<div>
  <quill-editor
    :class="['editor', fullscreen && 'fullscreen']"
    ref="myQuillEditor"
    :content="content"
    :options="editorOption"
    @change="onEditorChange($event)"
  >
    <div id="toolbar" slot="toolbar">
      <span class="ql-formats">
        <u-icon-button
          :iconFont="fullscreen ? 'recover' : 'fullscreen'"
          style="color: #000"
          @click="() => (fullscreen = !fullscreen)"
        ></u-icon-button>
      </span>

      <span class="ql-formats">
        <button class="ql-bold">Bold</button>
        <button class="ql-italic">Italic</button>
        <button class="ql-underline">underline</button>
      </span>

      <span class="ql-formats">
        <button class="ql-header" value="1">H1</button>
        <button class="ql-header" value="2">H2</button>
        <button class="ql-header" value="3">H3</button>
        <button class="ql-header" value="4">H4</button>
      </span>

      <span class="ql-formats">
        <button class="ql-list" value="ordered"></button>
        <button class="ql-list" value="bullet"></button
      ></span>

      <span class="ql-formats">
        <select class="ql-size">
          <option value="small"></option>
          <!-- Note a missing, thus falsy value, is used to reset to default -->
          <option selected></option>
          <option value="large"></option>
          <option value="huge"></option>
        </select>
      </span>

      <span class="ql-formats">
        <select class="ql-color">
          <option selected="selected"></option>
          <option value="#e60000"></option>
          <option value="#ff9900"></option>
          <option value="#ffff00"></option>
          <option value="#008a00"></option>
          <option value="#0066cc"></option>
          <option value="#9933ff"></option>
          <option value="#ffffff"></option>
          <option value="#facccc"></option>
          <option value="#ffebcc"></option>
          <option value="#ffffcc"></option>
          <option value="#cce8cc"></option>
          <option value="#cce0f5"></option>
          <option value="#ebd6ff"></option>
          <option value="#bbbbbb"></option>
          <option value="#f06666"></option>
          <option value="#ffc266"></option>
          <option value="#ffff66"></option>
          <option value="#66b966"></option>
          <option value="#66a3e0"></option>
          <option value="#c285ff"></option>
          <option value="#888888"></option>
          <option value="#a10000"></option>
          <option value="#b26b00"></option>
          <option value="#b2b200"></option>
          <option value="#006100"></option>
          <option value="#0047b2"></option>
          <option value="#6b24b2"></option>
          <option value="#444444"></option>
          <option value="#5c0000"></option>
          <option value="#663d00"></option>
          <option value="#666600"></option>
          <option value="#003700"></option>
          <option value="#002966"></option>
          <option value="#3d1466"></option>
        </select>
        <select class="ql-background">
          <option value="#000000"></option>
          <option value="#e60000"></option>
          <option value="#ff9900"></option>
          <option value="#ffff00"></option>
          <option value="#008a00"></option>
          <option value="#0066cc"></option>
          <option value="#9933ff"></option>
          <option selected="selected"></option>
          <option value="#facccc"></option>
          <option value="#ffebcc"></option>
          <option value="#ffffcc"></option>
          <option value="#cce8cc"></option>
          <option value="#cce0f5"></option>
          <option value="#ebd6ff"></option>
          <option value="#bbbbbb"></option>
          <option value="#f06666"></option>
          <option value="#ffc266"></option>
          <option value="#ffff66"></option>
          <option value="#66b966"></option>
          <option value="#66a3e0"></option>
          <option value="#c285ff"></option>
          <option value="#888888"></option>
          <option value="#a10000"></option>
          <option value="#b26b00"></option>
          <option value="#b2b200"></option>
          <option value="#006100"></option>
          <option value="#0047b2"></option>
          <option value="#6b24b2"></option>
          <option value="#444444"></option>
          <option value="#5c0000"></option>
          <option value="#663d00"></option>
          <option value="#666600"></option>
          <option value="#003700"></option>
          <option value="#002966"></option>
          <option value="#3d1466"></option>
        </select>
      </span>

      <span class="ql-formats">
        <select class="ql-align">
          <option selected="selected"></option>
          <option value="center"></option>
          <option value="right"></option>
          <option value="justify"></option>
        </select>
        <button class="ql-image" value="image"></button>
      </span>
    </div>
  </quill-editor>
  <form action method="post" enctype="multipart/form-data" id="uploadFormMulti">
    <input
      style="display: none"
      :id="uniqueId"
      type="file"
      name="file"
      multiple
      accept="image/jpg, image/jpeg, image/png, image/gif"
      @change="uploadImg('uploadFormMulti')"
    />
  </form>
</div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, reactive } from '@vue/composition-api';
import { Component, Vue, Prop, Watch, Ref } from 'vue-property-decorator';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css'; // https://github.surmon.me/vue-quill-editor/

import { quillEditor } from 'vue-quill-editor'; // https://www.kancloud.cn/liuwave/quill/1434142

import Quill from 'quill';
import ImageResize from 'quill-image-resize-module'; // 缩放

import { ImageDrop } from 'quill-image-drop-module'; // 拖动

import uploadRequest from './upload-request.js';
Quill.register('modules/imageDrop', ImageDrop);
Quill.register('modules/imageResize', ImageResize); // 注册

export default defineComponent({
  name: 's-editor',

  setup() {
    let fullscreen = false;
    let uniqueId = 'uniqueId';
    let content = '';
    let editorOption = reactive({
      placeholder: '请输入',
      theme: 'snow',
      modules: {
        imageDrop: true,
        imageResize: {
          displayStyles: {
            backgroundColor: 'black',
            border: 'none',
            color: 'white'
          },
          modules: ['Resize', 'DisplaySize', 'Toolbar']
        },
        toolbar: '#toolbar'
      }
    });
    onMounted(function () {
      const imgHandler = image => {
        if (image) {
          const $fileInput: any = document.getElementById(this.uniqueId);
          $fileInput.click();
        }
      };

      this.editor && this.editor.getModule('toolbar').addHandler('image', imgHandler);
    });
    return {
      fullscreen,
      uniqueId,
      content,
      editorOption
    };
  },

  props: {
    value: {}
  },

  created() {},

  methods: {
    uploadImg() {
      const formData = new FormData();
      const $fileInput: any = document.getElementById(this.uniqueId);
      formData.append('file', $fileInput.files[0]);

      try {
        uploadRequest({
          action: '/api/eis/v1/image/upload',
          file: $fileInput.files[0],
          onSuccess: (res: any) => {
            if (res && res.code === 0) {
              const url = res.result || '';
              const range = this.editor.getSelection();
              this.editor.insertEmbed(range != null ? range.index : 0, 'image', url);
            }
          }
        });
      } catch (e) {
        $fileInput.value = '';
      }
    },

    onEditorChange({
      html
    }) {
      this.content = html;
      this.$emit('change', this.content);
    }

  },
  watch: {
    'value': function defalutVal() {
      if (this.value) {
        this.content = this.value;
      }
    }
  }
});
</script>
  
<style lang="less">
.editor {
  line-height: normal !important;
  background: #fff;

  &.fullscreen {
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
  }
}
.ql-container {
  min-height: 350px;
  .ql-editor {
    min-height: 350px;
  }
}
.ql-snow .ql-tooltip[data-mode='link']::before {
  content: '请输入链接地址:';
}
.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
  border-right: 0px;
  content: '保存';
  padding-right: 0px;
}

.ql-snow .ql-tooltip[data-mode='video']::before {
  content: '请输入视频地址:';
}

.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: '14px';
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='small']::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='small']::before {
  content: '10px';
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='large']::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='large']::before {
  content: '18px';
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value='huge']::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value='huge']::before {
  content: '32px';
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: '文本';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='1']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='1']::before {
  content: '标题1';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='2']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='2']::before {
  content: '标题2';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='3']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='3']::before {
  content: '标题3';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='4']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='4']::before {
  content: '标题4';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='5']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='5']::before {
  content: '标题5';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value='6']::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value='6']::before {
  content: '标题6';
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: '标准字体';
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value='serif']::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value='serif']::before {
  content: '衬线字体';
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value='monospace']::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value='monospace']::before {
  content: '等宽字体';
}
</style>
