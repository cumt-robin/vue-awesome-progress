<template>
    <div class="wrapper">
        <vue-awesome-progress
            :circle-width="4"
            :line-width="8"
            :percentage="75"
            :font-size="18"
            :use-gradient="false"
            :point-radius="0"
            line-color="#ff4949"
            :circle-radius="66"
            easing="0,0,0.45,0.53"
        />
        <vue-awesome-progress
            :circle-width="6"
            :line-width="8"
            :duration="0.6"
            :font-size="24"
            :percentage="percent"
            :circle-radius="80"
            easing="0.17,0.67,0.83,0.67"
        />
        <div class="btns__wrapper">
            <button @click="decrease">-</button>
            <button @click="increase">+</button>
        </div>
    </div>
</template>

<script>
import VueAwesomeProgress from "vue-awesome-progress"

export default {
    name: 'Home',
    components: {
        VueAwesomeProgress
    },
    data() {
        return {
            percent: 50,
        }
    },
    // #region snippetForPercentControl
    methods: {
        increase() {
            this.percent += 10;
            if (this.percent > 100) {
                this.percent = 100;
            }
        },
        decrease() {
            this.percent -= 10;
            if (this.percent < 0) {
                this.percent = 0;
            }
        }
    }
    // #endregion snippetForPercentControl
}
</script>

<style lang="scss" scoped>
.wrapper {
    text-align: center;
}

.btns__wrapper {
    padding: 20px 8px;
    button {
        background-color: #3b77e3;
        color: #fff;
        padding: 4px 16px;
        outline: none;
        border: 1px solid #3b77e3;
        font-size: 30px;
        font-weight: 700;
        border-radius: 4px;
        cursor: pointer;
        &:hover {
            opacity: 0.8;
        }
        +button {
            margin-left: 10px;
        }
    }
}
</style>