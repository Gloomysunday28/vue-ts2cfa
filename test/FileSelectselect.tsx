import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { Input, Dropdown, Icon } from 'ant-design-vue'

import SelectDropdownMenu, { SelectDropdownMenuData } from '../menu/SelectDropdownMenu'
import './select.less'
import { findRepeat } from '@/utils/util'

@Component({
  name: 'mm-filter-select',
  components: {
    'a-input': Input,
    'a-dropdown': Dropdown,
    'a-icon': Icon,
    'mm-select-dropdown-menu': SelectDropdownMenu,
  },
})
export default class FilterSelect extends Vue {
  @Prop({ default: '全部' }) placeholder: string // input 的 placeholder
  @Prop({ default: '，' }) separate: string // 是否展示label的冒号
  @Prop({ default: true }) colon: boolean // 是否展示label的冒号
  @Prop({ default: 2 }) showSeletedNum: number // 展示选择input的数量
  @Prop({ default: true }) showDeletedIcon: boolean // 选择后是否可以删除
  @Prop() public label!: string // 默认展示的主题，比如项目，则设置为“项目”
  @Prop({ default: 'value' }) inputKey: string // input框自定义，默认展示 item.value
  @Prop({ default: 'single' }) public mode!: 'multiple' | 'single'
  @Prop() public selectOptions!: SelectDropdownMenuData[]
  @Prop({ default: true }) public searchable!: boolean
  @Prop() public change!: (selected: SelectDropdownMenuData[]) => void
  @Prop() public overlayStyle!: object // 下拉根元素的样式
  @Prop() public initValue!: string[] | string // 初始选中的值
  @Prop({
    default: () => {
      return () => document.body
    },
  })

  public getPopupContainer!: (triggerNode: any) => any
  @Prop({ default: 'value' })
  public searchValue!: string | string[] // 根据哪个关键字进行搜索，默认是value，也可设置为key等其他opttions里面有的值,支持多个关键字
  public selected: SelectDropdownMenuData[] = []
  public initSelected: string[] = [] // dropdown框初始选中的值
  public inputPlaceholder = this.placeholder
  public visible = false
  public searchKey = ''
  public dropdownWidth = 150
  public minWidth = 150
  public value: string
  public inputWidth = 100

  constructor(props: any) {
    super(props)
    this.value = `${this.label}${this.colon ? '：' : ''}`
    const initValue = this.initValue
    if (!initValue) {
      this.value += this.placeholder
    } else {
      if (this.mode === 'single') {
        this.value += initValue as string
      }
      if (this.mode === 'multiple') {
        this.value += (initValue as string[]).join(this.separate)
      }
    }
    this.findSelected(this.initValue)
    this.updateInputWidth()
    this.toggleHandler = this.toggleHandler.bind(this)
  }

  @Watch('initValue')
  public updateValue(value: string[] | string) {
    this.updateLabel(value)
  }

  // 下拉选择框改变的时候，更新
  @Watch('selectOptions')
  public updateSelectOptions(value) {
    this.selectOptions = value
    this.updateLabel(this.initValue)
  }

  updateLabel(value) {
    this.initValue = value
    this.value = `${this.label}${this.colon ? '：' : ''}`
    let initLabel
    // const initLabel = value
    if (!value) {
      this.value += this.placeholder
    } else {
      if (this.mode === 'single') {
        // 找出对应要展示的label
        initLabel = this.selectOptions.find(item => item.key === value)[this.inputKey]
        this.value += initLabel.length > 32 ? initLabel.slice(0, 32) + '...' : initLabel
      }
      if (this.mode === 'multiple') {
        initLabel = findRepeat(this.selectOptions, value, 'key').map(item => item[this.inputKey])
        this.value = (initLabel as string[])
          .map((val: string) => {
            return val.length > 32 ? val.slice(0, 32) + '...' : val
          })
          .join(this.separate)
      }
    }
    this.findSelected(value)
    this.handleValue()
    this.updateInputWidth()
  }

  public handleValue() {
    const { inputKey } = this

    this.value = `${this.label}${this.colon ? '：' : ''}`
    if (this.mode === 'multiple') {
      if (!this.selected.length) {
        this.value += this.placeholder
      } else if (this.selected.length < this.showSeletedNum + 1) {
        this.value += this.selected
          .map((item: SelectDropdownMenuData) =>
            item[inputKey].length > 32 ? item[inputKey].slice(0, 32) + '...' : item[inputKey],
          )
          .join(this.separate)
      } else {
        this.value +=
          this.selected
            .slice(0, this.showSeletedNum)
            .map((item: SelectDropdownMenuData) =>
              item[inputKey].length > 32 ? item[inputKey].slice(0, 32) + '...' : item[inputKey],
            )
            .join(this.separate) + '+' + (this.selected.length - this.showSeletedNum)
      }
    } else {
      this.value += this.selected.length
        ? this.selected[0][inputKey].length > 32
          ? this.selected[0][inputKey].slice(0, 32) + '...'
          : this.selected[0][inputKey]
        // : ''
        : this.placeholder
      this.visible = false
    }
  }

  @Watch('visible')
  public updateVisible(newVisible: boolean, oldVisible: boolean) {
    if (oldVisible === true && newVisible === false) {
      this.handleValue()
    }
  }

  public mounted() {
    document.addEventListener('click', this.toggleHandler)
    const selectBox = this.$refs.select
    const selctBoxWidth = (selectBox as Element).clientWidth
    this.dropdownWidth = selctBoxWidth
    this.updateInputWidth()
  }
  public beforeDestroy() {
    document.removeEventListener('click', this.toggleHandler)
  }
  public updateInputWidth() {
    setTimeout(() => {
      const spanBox: any = this.$refs.span
      if (spanBox) {
        this.inputWidth = spanBox.scrollWidth + 40
      } else {
        this.inputWidth = this.minWidth
      }
    })
  }

  public findSelected(value) {
    if (!value || !this.selectOptions) return
    // this.selected = []
    // this.initSelected = []
    let selected: any = []
    if (this.mode === 'single') {
      selected = this.selectOptions.filter((item: SelectDropdownMenuData) => {
        return item.key === value
      })
      // selected = [value]
    } else {
      selected = this.selectOptions.filter((item: SelectDropdownMenuData) => {
        return value.indexOf(item.key) !== -1
      })
      // selected = value
    }
    this.selected = selected
    this.initSelected = selected.map(item => item.key)
  }

  public toggleHandler(e: any) {
    const dropdownBox: Vue = this.$refs.dropdownBox as Vue
    const selectInputBox: Element = this.$refs.select as Element
    if (!selectInputBox.contains(e.target) && dropdownBox && !dropdownBox.$el.contains(e.target)) {
      if (this.visible) {
        this.visible = false
      }
    }
  }
  
  public openDropdown() {
    if (!this.visible) {
      this.visible = true
    }
  }

  public focus() {
    this.openDropdown()
    if (this.value && this.searchable) {
      this.inputPlaceholder = this.value
      this.value = ''
      this.searchKey = ''
    }
  }

  public input(e: any) {
    const value = e.target.value
    this.value = value
    this.searchKey = value.replace(/^(\s+)|(\s+)$/, '')
  }

  public selectItem(selected: SelectDropdownMenuData[]) {
    this.selected = selected
    this.handleValue()
    this.updateInputWidth()
    this.$emit('change', this.selected)
    if (this.change) {
      this.change(this.selected)
    }
  }
  public clearSelected() {
    this.initSelected = []
    this.selected = []
    this.handleValue()
    this.updateInputWidth()
    this.$emit('change', this.selected)
    if (this.change) {
      this.change(this.selected)
    }
  }

  public render() {
    const triBoxClass = this.visible ? 'mm-filter-tribox focus' : 'mm-filter-tribox'
    return (
      <div class="mm-select" ref="select">
        <div style={{ opacity: 0, position: 'fixed', left: '-999999px' }} ref="span">
          {this.value}
        </div>
        <a-dropdown
          trigger={['click']}
          visible={this.visible}
          getPopupContainer={this.getPopupContainer}
          overlayStyle={this.overlayStyle ? this.overlayStyle : { width: this.dropdownWidth + 'px' }}
        >
          <div 
            class={triBoxClass}
            on-click={() => {
              this.openDropdown()
            }}
          >
            <a-input
              placeholder={this.inputPlaceholder}
              value={this.value}
              style={{ width: Math.max(this.inputWidth, this.minWidth) + 'px', padding: '4px 8px' }}
              class="filter-input"
              read-only={!this.searchable}
              
              on-mouseEnter={() => {
                console.log('hover')
              }}
              on-focus={() => {
                this.focus()
              }}
              on-input={(e: any) => {
                this.$emit('input', e)
                this.input(e)
              }}
            />
            <a-icon class={'icon-down'} type="down" />
            {/* {!this.selected.length && <a-icon class={'icon-down'} type="down" />} */}
            {!!this.selected.length && this.showDeletedIcon && (
              <a-icon class="icon-close" type="close-circle" theme="filled" on-click={this.clearSelected} />
            )}
          </div>
          <div slot="overlay">
            <mm-select-dropdown-menu
              ref="dropdownBox"
              data={this.selectOptions}
              mode={this.mode}
              filterKey={this.searchKey}
              filterValue={this.searchValue}
              initSelected={this.initSelected}
              select={this.selectItem}
            />
          </div>
        </a-dropdown>
      </div>
    )
  }
}
