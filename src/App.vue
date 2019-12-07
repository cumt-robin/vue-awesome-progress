<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
export default {
    name: 'App',
    mounted() {
        console.log('挂载咯')
    }
}
</script>

<style scoped>
#app {
    position: relative;
}
</style>
