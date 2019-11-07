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
<vue-awesome-progress
  circle-color="#e5e9f2"
  :circle-width="4"
  :line-width="4"
  :duration="2"
  easing="0,0,1,1"
/>

<vue-awesome-progress
  circle-color="#e5e9f2"
  :circle-width="4"
  :line-width="4"
  :circle-radius="60"
  :point-radius="0"
  :animated="false"
/>

<vue-awesome-progress
  label="36℃"
  :circle-radius="100"
  :circle-width="4"
  :line-width="4"
  :with-gradient="false"
  :font-size="48"
  line-color="#FF4949"
  font-color="#FF4949"
  :point-radius="0"
  :angle-range="[60, 180]"
  :duration="5"
/>
```


# 支持的组件属性

| 参数             | 说明                        | 类型    | 是否必传 | 可选值 | 默认值                                                       |
| ---------------- | --------------------------- | ------- | -------- | ------ | :----------------------------------------------------------- |
| circle-radius    | 圆环的半径                  | Number  | false    |        | 40                                                           |
| circle-width     | 圆环的线宽                  | Number  | false    |        | 2                                                            |
| circle-color     | 圆环的颜色                  | String  | false    |        | #e5e5e5                                                      |
| line-width       | 进度弧线的宽度              | Number  | false    |        | 8                                                            |
| with-gradient    | 是否使用渐变色绘制进度弧线  | Boolean | false    |        | true                                                         |
| line-color-stops | 进度弧线渐变色断点          | Array   | false    |        | [{"percent":0,"color":"#13CDE3"},{"percent":1,"color":"#3B77E3"}] |
| line-color       | 进度弧线颜色                | String  | false    |        | #3B77E3                                                      |
| angle-range      | 起止角度                    | Array   | false    |        | [270, 90]                                                    |
| label            | 环内文字，不传则不显示文字  | String  | false    |        |                                                              |
| font-size        | 环内字体大小                | Number  | false    |        | 14                                                           |
| font-color       | 环内字体颜色                | String  | false    |        | #3B77E3                                                      |
| point-radius     | 圆点半径，值<=0则不显示圆点 | Number  | false    |        | 6                                                            |
| point-color      | 圆点填充色                  | String  | false    |        | \#3B77E3                                                     |
| animated         | 是否使用动画效果            | Boolean | false    |        | true                                                         |
| easing           | 缓动函数，默认是ease-in效果 | String  | false    |        | 0.42,0,1,1                                                   |
| duration         | 动画周期，单位为秒          | Number  | false    |        | 1                                                            |
