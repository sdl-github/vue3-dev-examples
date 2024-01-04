<template>
    <div class="page">
        <template v-for="item in total">
            <div @click="emits('goTo', item)" v-if="arrs.includes(item)" class="item"
                :class="{ active: current === (item - 1) }">
                {{ item }}
            </div>
        </template>
    </div>
</template>


<script lang="ts" setup>
const emits = defineEmits(['goTo'])
const props = defineProps({
    showSize: {
        type: Number,
        default: 4
    },
    total: {
        type: Number,
        default: 0
    },
    current: {
        type: Number,
        default: 0
    }
})

const arrs = computed(() => {
    return findArray(new Array(props.total).fill(0).map((item, index) => index + 1), props.showSize, props.current + 1)
})


function findArray(data: number[], size: number, number: number) {
    let startIndex = 0;

    while (startIndex < data.length) {
        let endIndex = startIndex + size;
        if (endIndex > data.length) {
            endIndex = data.length;
        }

        if (data[startIndex] <= number && number <= data[endIndex - 1]) {
            return data.slice(startIndex, endIndex);
        }

        startIndex += size;
    }
    return [];
}
</script>


<style scoped lang="scss">
.page {
    display: flex;

    .item {
        cursor: pointer;
        width: 30px;
        height: 30px;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .active {
        background: #386ACD;
    }
}
</style>