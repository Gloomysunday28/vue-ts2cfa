<template>
  <div class="form pt24">
    <FormPage :formItems="formItems"
              :onCancel="() => {}"
              :hasFooter="false"
              :formItemLayout="formItemLayout"
              :colon="false"
              ref="formNode"
    >
    </FormPage>

    <div class="FBH FBJC">
      <div>
        <a-button
          class="cancel-button mr12"
          @click="onCancelClick"
          >取消</a-button>
        <a-button
          type="primary"
          class="mr12 submit-button"
          icon="check"
          :loading="isSubmitButtonLoading"
          @click="onSubmitClick"
        >提交</a-button>
      </div>
    </div>
  </div>
</template>

<script lang="tsx">
import { Component, Vue, Watch, Prop, Ref } from 'vue-property-decorator'
import { mapState, mapMutations } from 'vuex'
import {
  namespace,
  State,
} from 'vuex-class'

import FormPage from '@/components/blocks/FormPage.vue'
import { addQuestion } from '@/services'
import { UserInfo, ProjectInfo, ProjectItemDto } from '@/types/app.type'

const CommonM = namespace('common')
const QuestionM = namespace('question')

@Component({
  components: {
    FormPage,
  },
})

export default class Form2 extends Vue {
  @State('project') project: ProjectInfo

  @Ref() formNode!: FormPage
  @Prop() detail
  @Prop() formItemLayout
  @Prop() isEditStatus

  @CommonM.State products

  @QuestionM.State searchInfo

  editorValue = ''

  // 提交按钮是否加载中
  isSubmitButtonLoading = false

  form = null

  mounted() {
    this.form = this.formNode.form
  }

  get formItems() {
    const { detail, isEditStatus, project } = this
    // console.log('this.project', this.project)

    const res = [
      {
        label: '关联产品',
        key: 'serviceId',
        type: 'select',
        placeholder: '请选择关联的产品',
        options: {
          initialValue: isEditStatus ? detail.serviceInfo.id : (+localStorage.getItem('easyqa-productType') || undefined),
          rules: [
            { required: true, message: '此项为必填项' },
          ],
        },
        selectOptions: this.products.data,
      },
      {
        label: '标题名称',
        key: 'title',
        type: 'input',
        placeholder: '1~128个字符',
        options: {
          initialValue: isEditStatus ? detail.title : undefined,
          rules: [
            { required: true, message: '此项为必填项' },
            { max: 128, message: '不可超过128个字符' },
            // {
            //   validator: (rule, value, callback) => {
            //     this.debounceUnique({
            //       type: 'name',
            //       value,
            //       callback,
            //       message: '指标名称重名',
            //     })
            //   },
            // },
          ],
        },
      },
      {
        label: '问题内容',
        key: 'content',
        type: 'editor',
        eapi: `/api/ea/images/v1?productId=${project.productId}&clusterId=${project.clusterId}`,
        options: {
          initialValue: isEditStatus ? detail.content : undefined,
          rules: [
            { required: true, message: '此项为必填项' },
          ],
        },
      },
    ]
    return res
  }

  onCancelClick() {
    this.$router.back()
  }

  onSubmitClick() {
    this.isSubmitButtonLoading = true

    // 表单提交校验
    this.form.validateFieldsAndScroll({ force: true }, (err: any, values: any) => {
      console.log('error: ', err)
      if (!err) {
        console.log('校验通过表单1：', values)

        addQuestion(values, this.isEditStatus ? this.detail.id : undefined)
          .then(() => {
            if (this.isEditStatus) {
              this.$router.back()
            } else {
              // 返回列表
              this.$message.success('创建成功')
              this.$router.push('/')
            }
          })
          .finally(() => {
            this.isSubmitButtonLoading = false
          })
      } else {
        console.log('校验不通过')
        this.isSubmitButtonLoading = false
      }
    })
  }
}
</script>

<style scoped lang="stylus">
.form
  overflow-y scroll
</style>
