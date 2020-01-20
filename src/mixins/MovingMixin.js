export default {
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
        moveTaskOrColumn(transferData) {
            if (transferData.type === 'task') {
                this.moveTask(transferData)
            } else {
                this.moveColumn(transferData)
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
        moveColumn({fromColumnIndex}) {
            this.$store.commit('MOVE_COLUMN', {
                fromColumnIndex,
                toColumnIndex: this.columnIndex
            })
        },
    }
}