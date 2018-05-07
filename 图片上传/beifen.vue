<template>
  <div class="index-card index-card-root" :style="{fontSize: rootFontSize + 'px'}">
    <div class="index-card-inner">
      <div class="index-card__title" :style="titleStyles">
        {{ title }}
      </div>
      <div class="index-card__value" :style="valueStyles">
        {{ num }}<slot name="postfix"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import elementResizeEvent from 'element-resize-event'
import { THEMES } from '@/consts/theme'

export default {
  name: 'IndexCard',

  props: {
    title: {
      type: String,
      default: ''
    },
    num: {
      type: Number,
      default: 0
    },
    styles: {
      type: Object
    }
  },

  data () {
    return {
      rootFontSize: 0
    }
  },

  computed: {
    fullScreenTheme () {
      return this.$store.getters['theme/fullScreenTheme']
    },
    titleColor () {
      return THEMES.LIGHT === this.fullScreenTheme ? '#666' : '#AAA'
    },
    valueColor () {
      return THEMES.LIGHT === this.fullScreenTheme ? '#000' : '#DDD'
    },
    titleStyles () {
      let styles = {
        color: this.titleColor
      }
      if (this.styles) {
        let {titleColor, titleFontSize, titleFontWeight, titleTextAlign} = this.styles
        if (titleColor) {
          styles.color = titleColor
        }
        if (titleFontSize) {
          styles.fontSize = titleFontSize
        }
        if (titleFontWeight) {
          styles.fontWeight = titleFontWeight
        }
        if (titleTextAlign) {
          styles.textAlign = titleTextAlign
        }
      }
      return styles
    },
    valueStyles () {
      let styles = {
        color: this.valueColor
      }
      if (this.styles) {
        let {valueColor, valueFontSize, valueFontWeight, valueTextAlign} = this.styles
        if (valueColor) {
          styles.color = valueColor
        }
        if (valueFontSize) {
          styles.fontSize = valueFontSize
        }
        if (valueFontWeight) {
          styles.fontWeight = valueFontWeight
        }
        if (valueTextAlign) {
          styles.textAlign = valueTextAlign
        }
      }
      return styles
    }
  },

  mounted () {
    setTimeout(() => {
      elementResizeEvent(this.$el, e => {
        this.resetFontSize()
      })
      this.resetFontSize()
    })
  },

  methods: {
    resetFontSize () {
      window.clearTimeout(this.resetFontSizeTimeId)
      this.resetFontSizeTimeId = setTimeout(() => {
        let width = parseInt(this.$el && this.$el.clientWidth) || 0
        let height = parseInt(this.$el && this.$el.clientHeight) || 0
        let unit = Math.min(width, height) / 100
        if (unit < 1.5) { // 限制最小字体
          unit = 1.5
        }
        this.rootFontSize = unit
      }, 50)
    }
  }
}
</script>

<style lang="stylus">
@import '~@/styles/common'

.index-card-root
  position relative
  width 100%
  height 100%
  text-align center

  .index-card-inner
    position absolute
    left 50%
    top 50%
    transform translate(-50%, -50%)
    width 100%

  .index-card-inner
    display inline-block
    padding 5px 0

  .index-card__title
    font-size 7em
    color gray
    text-align left
    white-space nowrap

  .index-card__value
    font-size 20em
</style>
