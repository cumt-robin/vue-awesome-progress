# vue-awesome-progress

基于`vue`和`canvas`的环形进度条组件，支持和很多自定义的属性和动画效果

# Installation and Usage

## Installation

```shell
npm install --save vue-awesome-progress
```

## Usage

### 全局注册

```javascript
import Vue from 'vue'
import VueAwesomeProgress from "vue-awesome-progress"
Vue.use(VueAwesomeProgress)
```

### 局部引入组件

```javascript
import VueAwesomeProgress from "vue-awesome-progress"

export default {
    components: {
        VueAwesomeProgress
    },
    // 其他代码
}
```

### 使用实例

```html
<vue-awesome-progress label="188人" :duration="16" />

<vue-awesome-progress
  label="36℃"
  circle-color="#FF4949"
  :line-color-stops="colorStops"
  :angle-range="[60, 180]"
  easing="1,0.28,0.17,0.53"
  :duration="10"
/>

<vue-awesome-progress
  label="报警"
  circle-color="#FF4949"
  :line-color-stops="colorStops"
  :angle-range="[320, 50]"
/>

<vue-awesome-progress label="58%" :font-size="16" :angle-range="[90, 180]" />

<vue-awesome-progress label="33mg/m³" :angle-range="[30, 260]" />

// js
colorStops: [
  { percent: 0, color: '#FF9933' },
  { percent: 1, color: '#FF4949' }
]
```



# 支持的组件属性

| 参数             | 说明                        | 类型   | 是否必传 | 可选值 | 默认值                                                       |
| ---------------- | --------------------------- | ------ | -------- | ------ | :----------------------------------------------------------- |
| circle-radius    | 圆环的半径                  | Number | false    |        | 40                                                           |
| circle-width     | 圆环的线宽                  | Number | false    |        | 2                                                            |
| circle-color     | 圆环的颜色                  | String | false    |        | \#3B77E3                                                     |
| line-width       | 进度弧线的宽度              | Number | false    |        | 8                                                            |
| line-color-stops | 进度弧线渐变色断点          | Array  | false    |        | [{"percent":0,"color":"#13CDE3"},{"percent":1,"color":"#3B77E3"}] |
| angle-range      | 起止角度                    | Array  | false    |        | [270, 90]                                                    |
| label            | 环内文字                    | String | true     |        |                                                              |
| point-radius     | 圆点半径                    | Number | false    |        | 6                                                            |
| font-size        | 环内字体大小                | Number | false    |        | 14                                                           |
| easing           | 缓动函数，默认是ease-in效果 | String | false    |        | 0.42,0,1,1                                                   |
| duration         | 动画周期，单位为秒          | Number | false    |        | 1                                                            |

