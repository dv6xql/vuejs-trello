<template>
    <div class="board">
        <div class="flex flex-row items-start">
            <board-column
                    v-for="(column, $columnIndex) of board.columns"
                    :key="$columnIndex"
                    :column="column"
                    :columnIndex="$columnIndex"
                    :board="board"
            />

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
    import {ref, computed} from '@vue/composition-api'
    import BoardColumn from "../components/BoardColumn"

    export default {
        components: {
            BoardColumn
        },
        setup(props, context) {
            const newColumnName = ref('')
            const isTaskOpen = computed(() => context.root.$route.name === 'task')
            const board = computed(() => context.root.$store.state.board)

            function close() {
                context.root.$router.push({name: 'board'})
            }

            function createColumn() {
                context.root.$store.commit('CREATE_COLUMN', {
                    name: newColumnName.value
                })

                newColumnName.value = ''
            }

            return {
                newColumnName,
                isTaskOpen,
                board,
                close,
                createColumn
            }
        },
    }
</script>

<style lang="css">
    .board {
        @apply p-4 bg-teal-dark h-full overflow-auto;
    }

    .task-bg {
        @apply pin absolute;
        background: rgba(0, 0, 0, 0.5);
    }
</style>
