<template>
    <canvas ref="canvasDemo" :style="{width: canvasSize, height: canvasSize}" />
</template>

<script>
import BezierEasing from "bezier-easing";
import { debounce } from "lodash-es";

export default {
    name: 'VueAwesomeProgress',
    props: {
        startDeg: {
            type: Number,
            default: 270,
            validator: function(value) {
                return value >= 0 && value < 360
            }
        },
        percentage: {
            type: Number,
            default: 0,
            validator: function(value) {
                return value >= 0 && value <= 100
            }
        },
        circleRadius: {
            type: Number,
            default: 40
        },
        circleWidth: {
            type: Number,
            default: 2
        },
        circleColor: {
            type: String,
            default: '#e5e5e5'
        },
        lineWidth: {
            type: Number,
            default: 8
        },
        useGradient: {
            type: Boolean,
            default: false
        },
        lineColor: {
            type: String,
            default: '#3B77E3'
        },
        lineColorStops: {
            type: Array,
            default: function() {
                return [
                    { percent: 0, color: '#13CDE3' },
                    { percent: 1, color: '#3B77E3' }
                ]
            }
        },
        showText: {
            type: Boolean,
            default: true
        },
        fontSize: {
            type: Number,
            default: 14
        },
        fontColor: {
            type: String,
            default: '#444'
        },
        pointRadius: {
            type: Number,
            default: 6
        },
        pointColor: {
            type: String,
            default: '#3B77E3'
        },
        animated: {
            type: Boolean,
            default: true
        },
        easing: {
            type: String,
            // ease-in
            default: '0.42,0,1,1',
            validator: function(value) {
                return /^(\-?\d+(\.\d+)?,){3}\-?\d+(\.\d+)?$/.test(value)
            }
        },
        duration: {
            type: Number,
            // 浏览器大约是60FPS，因此1s大约执行60次requestAnimationFrame
            default: 0.6
        },
        format: {
            type: Function
        }
    },
    data() {
        return {
            gradient: null,
            easingFunc: null,
            animationId: null,
            canvasInstance: null,
            ctx: null
        }
    },
    computed: {
        // 外围半径
        outerRadius() {
            return this.pointRadius > 0 ? (this.circleRadius + this.pointRadius) : (this.circleRadius + this.lineWidth / 2)
        },
        // 画布大小（逻辑像素）
        canvasSize() {
            return 2 * this.outerRadius + 'px'
        },
        // 执行的总步数
        steps() {
            return this.duration * 60
        }
    },
    watch: {
        percentage(val, oldVal) {
            if (val >= 0 && val <= 100) {
                window.cancelAnimationFrame(this.animationId)
                // 更新进度条的时候，直接给定0.3s时间，即18帧
                this.animateDrawArc(oldVal, val, 1, 18)
            } else {
                throw new Error('进度百分比的范围必须在1~100内')
            }
        }
    },
    mounted() {
        const easingParams = this.easing.split(',').map(item => Number(item))
        this.easingFunc = BezierEasing(...easingParams);
        this.initCanvas()
    },
    beforeDestroy() {
        window.cancelAnimationFrame(this.animationId)
        window.removeEventListener('resize', this.handleResize)
    },
    methods: {
        // 初始化canvas
        initCanvas() {
            this.canvasInstance = this.$refs.canvasDemo;
            this.ctx = this.canvasInstance.getContext('2d');

            // 设置渐变色
            if (this.useGradient) {
                this.gradient = this.ctx.createLinearGradient(this.circleRadius, 0, this.circleRadius, this.circleRadius * 2);
                this.lineColorStops.forEach(item => {
                    this.gradient.addColorStop(item.percent, item.color);
                });
            }

            // 处理dpx
            this.handleDpr();

            // 监控resize
            window.addEventListener('resize', this.handleResize)

            this.renderContent();
        },
        handleResize: debounce(function() {
            this.handleDpr();
            this.renderContent();
        }, 300),
        handleDpr() {
            const dpr = Math.max(window.devicePixelRatio, 1);
            // 调整画布物理像素
            this.canvasInstance.width = this.outerRadius * 2 * dpr;
            this.canvasInstance.height = this.outerRadius * 2 * dpr;
            // 同时用scale处理倍率
            this.ctx.scale(dpr, dpr);
        },
        renderContent() {
            if (this.percentage === 0) {
                this.animateDrawArc(0, 0, 0, 0);
            } else {
                if (this.animated) {
                    // 用动画来画动态内容
                    this.animateDrawArc(0, this.percentage, 1, this.steps);
                } else {
                    this.animateDrawArc(0, this.percentage, this.steps, this.steps);
                }
            }
        },
        // 利用raf控制动画绘制
        animateDrawArc(beginPercent, endPercent, stepNo, stepTotal) {
            this.ctx.clearRect(0, 0, this.canvasInstance.width, this.canvasInstance.height);
            const nextPercent = beginPercent + (endPercent - beginPercent) * this.easingFunc(stepNo / stepTotal)
            const nextDeg = this.getTargetDegByPercentage(nextPercent)
            const startArc = this.deg2Arc(this.startDeg);
            const nextArc = this.deg2Arc(nextDeg);
            // 画圆环
            this.ctx.strokeStyle = this.circleColor;
            this.ctx.lineWidth = this.circleWidth;
            this.ctx.beginPath();
            this.ctx.arc(this.outerRadius, this.outerRadius, this.circleRadius, 0, this.deg2Arc(360));
            this.ctx.stroke();
            // 画文字
            if (this.showText) {
                this.ctx.font = `${this.fontSize}px Arial,"Microsoft YaHei"`
                this.ctx.fillStyle = this.fontColor;
                this.ctx.textAlign = 'center'
                this.ctx.textBaseline = 'middle'
                let label;
                if (typeof this.format === 'function') {
                    label = this.format(nextPercent)
                } else {
                    label = Math.round(nextPercent) + '%'
                }
                this.ctx.fillText(label, this.outerRadius, this.outerRadius);
            }
            // 画进度弧线
            if (stepTotal > 0) {
                this.ctx.strokeStyle = this.useGradient ? this.gradient : this.lineColor;
                this.ctx.lineWidth = this.lineWidth;
                this.ctx.lineCap = "round";
                this.ctx.beginPath();
                this.ctx.arc(this.outerRadius, this.outerRadius, this.circleRadius, startArc, nextArc);
                this.ctx.stroke();
            }
            // 画点
            if (this.pointRadius > 0) {
                this.ctx.fillStyle = this.pointColor;
                const pointPosition = this.getPositionsByDeg(nextDeg);
                this.ctx.beginPath();
                this.ctx.arc(pointPosition.x + this.pointRadius, pointPosition.y + this.pointRadius, this.pointRadius, 0, this.deg2Arc(360));
                this.ctx.fill();
            }
            if (stepNo !== stepTotal) {
                stepNo++;
                this.animationId = window.requestAnimationFrame(this.animateDrawArc.bind(null, beginPercent, endPercent, stepNo, stepTotal))
            } else {
                window.cancelAnimationFrame(this.animationId)
            }
        },
        // 根据开始角度和进度百分比求取目标角度
        getTargetDegByPercentage(percentage) {
            if (percentage === 100) {
                return this.startDeg + 360
            } else {
                const targetDeg = (this.startDeg + 360 * percentage / 100) % 360
                return targetDeg
            }
        },
        // 根据角度获取点的位置
        getPositionsByDeg(deg) {
            let x = 0;
            let y = 0;
            if (deg >= 0 && deg <= 90) {
                // 0~90度
                x = this.circleRadius * (1 + Math.cos(this.deg2Arc(deg)))
                y = this.circleRadius * (1 + Math.sin(this.deg2Arc(deg)))
            } else if (deg > 90 && deg <= 180) {
                // 90~180度
                x = this.circleRadius * (1 - Math.cos(this.deg2Arc(180 - deg)))
                y = this.circleRadius * (1 + Math.sin(this.deg2Arc(180 - deg)))
            } else if (deg > 180 && deg <= 270) {
                // 180~270度
                x = this.circleRadius * (1 - Math.sin(this.deg2Arc(270 - deg)))
                y = this.circleRadius * (1 - Math.cos(this.deg2Arc(270 - deg)))
            } else {
                // 270~360度
                x = this.circleRadius * (1 + Math.cos(this.deg2Arc(360 - deg)))
                y = this.circleRadius * (1 - Math.sin(this.deg2Arc(360 - deg)))
            }
            return { x, y }
        },
        // deg转弧度
        deg2Arc(deg) {
            return deg / 180 * Math.PI
        }
    }
}
</script>
