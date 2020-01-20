<template>
    <div class="column"
         draggable
         @drop="moveTaskOrColumn($event, column.tasks, $columnIndex)"
         @dragover.prevent
         @dragenter.prevent
         @dragstart.self="pickupColumn($event, $columnIndex)">
        <div class="flex items-center mb-2 font-bold">
            {{ column.name }}
        </div>
        <div class="list-reset">
            <div class="task"
                 v-for="(task, $taskIndex) of column.tasks"
                 :key="$taskIndex"
                 @click="goToTask(task)"
                 draggable
                 @dragstart="pickupTask($event, $taskIndex, $columnIndex)"
                 @dragover.prevent
                 @dragenter.prevent
                 @drop.stop="moveTaskOrColumn($event, column.tasks, $columnIndex, $taskIndex)">
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
        name: "BoardColumn"
    }
</script>

<style>
    .column {
        @apply bg-grey-light p-2 mr-4 text-left shadow rounded;
        min-width: 350px;
    }
</style>