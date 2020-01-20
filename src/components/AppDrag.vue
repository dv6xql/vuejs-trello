<template>
    <div @dragstart.prevent="onDrag">
        <slot/>
    </div>
</template>

<script>
    export default {
        name: "AppDrag",
        methods: {
            onDrag(e) {
                
            }
        }
    }
</script>

<style scoped>

</style>