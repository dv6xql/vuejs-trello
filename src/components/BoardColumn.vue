<template>
    <app-drop @drop="moveTaskOrColumn()">
        <app-drag class="column" :transferData="getTransferData(columnIndex)">
            <div class="flex items-center mb-2 font-bold">
                {{ column.name }}
            </div>
            <div class="list-reset">
                <ColumnTask
                        v-for="(task, $taskIndex) of column.tasks"
                        :key="$taskIndex"
                        :task="task"
                        :taskIndex="$taskIndex"
                        :column="column"
                        :columnIndex="columnIndex"
                        :board="board"
                />

                <input type="text" class="block p-2 w-full bg-transparent" placeholder="+ Enter new task"
                       @keyup.enter="createTask($event, column.tasks)">
            </div>
        </app-drag>
    </app-drop>
</template>

<script>
    import ColumnTask from "./ColumnTask"
    import MovingMixin from "../mixins/MovingMixin"
    import AppDrag from "./AppDrag"
    import AppDrop from "./AppDrop"

    export default {
        name: "BoardColumn",
        data() {
          return {
              transferData: {}
          }
        },
        components: {
            ColumnTask, AppDrag, AppDrop
        },
        mixins: [MovingMixin],
        methods: {
            getTransferData(columnIndex) {
                return {
                    type: "column",
                    fromColumnIndex: columnIndex
                }
            },
            pickupColumn(e, fromColumnIndex) {
                e.dataTransfer.effectAllowed = 'move'
                e.dataTransfer.dropEffect = 'move'

                e.dataTransfer.setData('from-column-index', fromColumnIndex)
                e.dataTransfer.setData('type', 'column')
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
    .column {
        @apply bg-grey-light p-2 mr-4 text-left shadow rounded;
        min-width: 350px;
    }
</style>