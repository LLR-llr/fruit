<template>
    <ul class="pages">
        <li :class="{active:current===i}" v-for="i in pageNumber" :key="i" @click="pagechange(i)">{{i}} </li>
    </ul>
</template>

<script>
    export default {
        name: "my-page"
    }
</script>

<style scoped>

</style>
