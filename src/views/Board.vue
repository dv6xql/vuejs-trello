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
                <input type="text" class="p-2 mr-2 flex-grow" placeholder="New Column Name" v-model="state.newColumnName"
                       @keyup.enter="createColumn()">
            </div>
        </div>

        <div class="task-bg" v-if="state.isTaskOpen" @click.self="close()">
            <router-view/>
        </div>
    </div>
</template>

<script>
    import {reactive, computed} from '@vue/composition-api'
    import {mapState} from 'vuex'
    import BoardColumn from "../components/BoardColumn"

    export default {
        components: {
            BoardColumn
        },
        setup(props, context) {
            const state = reactive({
                newColumnName: '',
                isTaskOpen: computed(() => context.root.$route.name === 'task')
            })

            function close() {
                context.root.$router.push({name: 'board'})
            }

            function createColumn() {
                context.root.$store.commit('CREATE_COLUMN', {
                    name: state.newColumnName
                })

                state.newColumnName = ''
            }

            return {state, close, createColumn}
        },
        computed: {
            ...mapState(['board']),
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
