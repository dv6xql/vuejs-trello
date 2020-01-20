<template>
    <app-drop @drop="moveTaskOrColumn()">
        <app-drag class="task" :transferData="getTransferData(columnIndex, taskIndex)" @click="goToTask(task)">
            <span class="w-full flex-no-shrink font-bold">{{ task.name }}</span>
            <p class="w-full flex-no-shrink mt-1 text-sm" v-if="task.description">
                {{ task.description }}
            </p>
        </app-drag>
    </app-drop>
</template>

<script>
    import MovingMixin from "../mixins/MovingMixin"
    import AppDrag from "./AppDrag"
    import AppDrop from "./AppDrop";

    export default {
        name: "ColumnTask",
        components: {AppDrag, AppDrop},
        mixins: [MovingMixin],
        props: {
            task: {
                type: Object,
                required: true,
            },
            taskIndex: {
                type: Number,
                required: true,
            },
        },
        methods: {
            getTransferData(columnIndex, taskIndex) {
                return {
                    type: "task",
                    fromColumnIndex: columnIndex,
                    fromTaskIndex: taskIndex,
                }
            },
            goToTask(task) {
                this.$router.push({name: 'task', params: {id: task.id}})
            },
        }
    }
</script>

<style>
    .task {
        @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-grey-darkest no-underline;
    }
</style>