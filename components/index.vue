<template>
    <canvas ref="canvasDemo" :width="canvasSize" :height="canvasSize" />
</template>

<script>
import BezierEasing from "bezier-easing";
export default {
    name: 'VueAwesomeProgress',
    props: {
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
        withGradient: {
            type: Boolean,
            default: true
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
        angleRange: {
            type: Array,
            default: function() {
                return [270, 90]
            }
        },
        fontSize: {
            type: Number,
            default: 14
        },
        fontColor: {
            type: String,
            default: '#3B77E3'
        },
        label: {
            type: String
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
                return /^(\d+(\.\d+)?,){3}\d+(\.\d+)?$/.test(value)
            }
        },
        duration: {
            type: Number,
            // 浏览器大约是60FPS，因此1s大约执行60次requestAnimationFrame
            default: 1
        }
    },
    data() {
        return {
            gradient: null,
            easingFunc: null
        }
    },
    computed: {
        outerRadius() {
            return this.pointRadius > 0 ? (this.circleRadius + this.pointRadius) : (this.circleRadius + this.lineWidth / 2)
        },
        canvasSize() {
            return 2 * this.outerRadius + 'px'
        },
        steps() {
            return this.duration * 60
        }
    },
    mounted() {
        const easingParams = this.easing.split(',').map(item => Number(item))
        this.easingFunc = BezierEasing(...easingParams);
        this.$nextTick(() => {
            this.initCanvas()
        })
    },
    methods: {
        initCanvas() {
            var canvas = this.$refs.canvasDemo;
            var ctx = canvas.getContext('2d');
            if (this.withGradient) {
                this.gradient = ctx.createLinearGradient(this.circleRadius, 0, this.circleRadius, this.circleRadius * 2);
                this.lineColorStops.forEach(item => {
                    this.gradient.addColorStop(item.percent, item.color);
                });
            }
            if (this.animated) {
                // 用动画来画动态内容
                this.animateDrawArc(canvas, ctx, this.angleRange[0], this.angleRange[1], 1, this.steps);
            } else {
                this.animateDrawArc(canvas, ctx, this.angleRange[0], this.angleRange[1], this.steps, this.steps);
            }
        },
        animateDrawArc(canvas, ctx, startDeg, endDeg, stepNo, stepTotal) {
            window.requestAnimationFrame(() => {
                ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
                const nextDeg = this.getTargetDeg(startDeg, endDeg, stepNo, stepTotal);
                const startArc = this.deg2Arc(startDeg);
                const nextArc = this.deg2Arc(nextDeg);
                // 画圆环
                ctx.strokeStyle = this.circleColor;
                ctx.lineWidth = this.circleWidth;
                ctx.beginPath();
                ctx.arc(this.outerRadius, this.outerRadius, this.circleRadius, 0, this.deg2Arc(360));
                ctx.stroke();
                // 画文字
                if (this.label) {
                    ctx.font = `${this.fontSize}px Arial,"Microsoft YaHei"`
                    ctx.fillStyle = this.fontColor;
                    ctx.textAlign = 'center'
                    ctx.textBaseline = 'middle'
                    ctx.fillText(this.label, canvas.clientWidth / 2, canvas.clientWidth / 2);
                }
                // 画进度弧线
                ctx.strokeStyle = this.withGradient ? this.gradient : this.lineColor;
                ctx.lineWidth = this.lineWidth;
                ctx.beginPath();
                ctx.arc(this.outerRadius, this.outerRadius, this.circleRadius, startArc, nextArc);
                ctx.stroke();
                // 画点
                if (this.pointRadius > 0) {
                    ctx.fillStyle = this.pointColor;
                    const pointPosition = this.getPositionsByDeg(nextDeg);
                    ctx.beginPath();
                    ctx.arc(pointPosition.x + this.pointRadius, pointPosition.y + this.pointRadius, this.pointRadius, 0, this.deg2Arc(360));
                    ctx.fill();
                }
                if (stepNo !== stepTotal) {
                    stepNo++;
                    this.animateDrawArc(canvas, ctx, startDeg, endDeg, stepNo, stepTotal)
                }
            })
        },
        // 顺时针方向，根据开始deg，结束deg，以及步进值step，求取目标deg
        getTargetDeg(startDeg, endDeg, stepNo, stepTotal) {
            startDeg = startDeg % 360;
            endDeg = endDeg % 360;
            if (startDeg > endDeg) {
                const diff = endDeg + 360 - startDeg
                let nextDeg = startDeg + diff * this.easingFunc(stepNo / stepTotal)
                if (nextDeg > 360) {
                    nextDeg = nextDeg - 360
                    return nextDeg > endDeg ? endDeg : nextDeg
                }
                return nextDeg
            } else {
                const diff = endDeg - startDeg
                let nextDeg = startDeg + diff * this.easingFunc(stepNo / stepTotal)
                if (nextDeg > endDeg) {
                    return endDeg
                } else if (nextDeg > 360) {
                    return nextDeg - 360
                }
                return nextDeg
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
