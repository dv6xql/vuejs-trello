<template>
    <div class="board">
        <board-column
                v-for="(column, $columnIndex) of board.columns"
                :key="$columnIndex"
                :column="column"
                :columnIndex="$columnIndex"
        ></board-column>

        <div class="flex flex-row items-start">
            <div class="column flex">
                <input type="text" class="p-2 mr-2 flex-grow" placeholder="New Column Name" v-model="newColumnName"
                       @keyup.enter="createColumn()">
            </div>
        </div>

        <div class="task-bg" v-if="isTaskOpen" @click.self="close()">
            <router-view/>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import BoardColumn from "../components/BoardColumn"

    export default {
        components: {
            BoardColumn
        },
        data() {
            return {
                newColumnName: ''
            }
        },
        computed: {
            ...mapState(['board']),
            isTaskOpen() {
                return this.$route.name === 'task'
            }
        },
        methods: {
            goToTask(task) {
                this.$router.push({name: 'task', params: {id: task.id}})
            },
            close() {
                this.$router.push({name: 'board'})
            },
            createTask(e, tasks) {
                this.$store.commit('CREATE_TASK', {
                    tasks,
                    name: e.target.value
                })
                e.target.value = ''
            },
            pickupTask(e, taskIndex, fromColumnIndex) {
                e.dataTransfer.effectAllowed = 'move'
                e.dataTransfer.dropEffect = 'move'

                e.dataTransfer.setData('from-task-index', taskIndex)
                e.dataTransfer.setData('from-column-index', fromColumnIndex)
                e.dataTransfer.setData('type', 'task')
            },
            pickupColumn(e, fromColumnIndex) {
                e.dataTransfer.effectAllowed = 'move'
                e.dataTransfer.dropEffect = 'move'

                e.dataTransfer.setData('from-column-index', fromColumnIndex)
                e.dataTransfer.setData('type', 'column')
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
            createColumn() {
                this.$store.commit('CREATE_COLUMN', {
                    name: this.newColumnName
                })

                this.newColumnName = ''
            },
            moveColumn(e, toColumnIndex) {
                const fromColumnIndex = e.dataTransfer.getData('from-column-index')

                this.$store.commit('MOVE_COLUMN', {
                    fromColumnIndex,
                    toColumnIndex
                })
            }
        }
    }
</script>

<style lang="css">
    .task {
        @apply flex items-center flex-wrap shadow mb-2 py-2 px-2 rounded bg-white text-grey-darkest no-underline;
    }

    .board {
        @apply p-4 bg-teal-dark h-full overflow-auto;
    }

    .task-bg {
        @apply pin absolute;
        background: rgba(0, 0, 0, 0.5);
    }
</style>
