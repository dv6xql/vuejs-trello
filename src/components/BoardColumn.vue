<template>
    <div class="column"
         draggable
         @drop="moveTaskOrColumn($event, column.tasks, columnIndex)"
         @dragover.prevent
         @dragenter.prevent
         @dragstart.self="pickupColumn($event, columnIndex)">
        <div class="flex items-center mb-2 font-bold">
            {{ column.name }}
        </div>
        <div class="list-reset">
            <div class="task"
                 v-for="(task, $taskIndex) of column.tasks"
                 :key="$taskIndex"
                 @click="goToTask(task)"
                 draggable
                 @dragstart="pickupTask($event, $taskIndex, columnIndex)"
                 @dragover.prevent
                 @dragenter.prevent
                 @drop.stop="moveTaskOrColumn($event, column.tasks, columnIndex, $taskIndex)">
                        <span class="w-full flex-no-shrink font-bold">
                            {{ task.name }}
                        </span>
                <p class="w-full flex-no-shrink mt-1 text-sm" v-if="task.description">
                    {{ task.description }}
                </p>
            </div>

            <input type="text" class="block p-2 w-full bg-transparent" placeholder="+ Enter new task"
                   @keyup.enter="createTask($event, column.tasks)">
        </div>
    </div>
</template>

<script>
    export default {
        name: "BoardColumn",
        props: {
            column: {
                type: Object,
                required: true,
            },
            columnIndex: {
                type: Number,
                required: true
            },
            board: {
                type: Object,
                required: true
            }
        },
        methods: {
            goToTask(task) {
                this.$router.push({name: 'task', params: {id: task.id}})
            },
            moveTaskOrColumn(e, toTasks, toColumnIndex, toTaskIndex) {
                const type = e.dataTransfer.getData('type')
                if (type === 'task') {
                    this.moveTask(e, toTasks, toTaskIndex !== undefined ? toTaskIndex : toTasks.length)
                } else {
                    this.moveColumn(e, toColumnIndex)
                }
            },
            moveTask(e, toTasks, toTaskIndex) {
                const fromColumnIndex = e.dataTransfer.getData('from-column-index')
                const fromTasks = this.board.columns[fromColumnIndex].tasks
                const fromTaskIndex = e.dataTransfer.getData('from-task-index')

                this.$store.commit('MOVE_TASK', {
                    fromTasks,
                    fromTaskIndex,
                    toTasks,
                    toTaskIndex
                })
            },
            moveColumn(e, toColumnIndex) {
                const fromColumnIndex = e.dataTransfer.getData('from-column-index')

                this.$store.commit('MOVE_COLUMN', {
                    fromColumnIndex,
                    toColumnIndex
                })
            },
            pickupColumn(e, fromColumnIndex) {
                e.dataTransfer.effectAllowed = 'move'
                e.dataTransfer.dropEffect = 'move'

                e.dataTransfer.setData('from-column-index', fromColumnIndex)
                e.dataTransfer.setData('type', 'column')
            },
            pickupTask(e, taskIndex, fromColumnIndex) {
                e.dataTransfer.effectAllowed = 'move'
                e.dataTransfer.dropEffect = 'move'

                e.dataTransfer.setData('from-task-index', taskIndex)
                e.dataTransfer.setData('from-column-index', fromColumnIndex)
                e.dataTransfer.setData('type', 'task')
            },
            createTask(e, tasks) {
                this.$store.commit('CREATE_TASK', {
                    tasks,
                    name: e.target.value
                })
                e.target.value = ''
            },
        }
    }
</script>

<style>
    .task {
        @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-grey-darkest no-underline;
    }

    .column {
        @apply bg-grey-light p-2 mr-4 text-left shadow rounded;
        min-width: 350px;
    }
</style>