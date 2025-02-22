<template>
    <div class="animate-pulse space-y-4">
        <div
            v-for="n in count"
            :key="n"
            class="bg-gray-100 rounded-lg p-4 relative overflow-hidden"
        >
            <div class="h-5 bg-gray-200 rounded w-2/3 mb-2"></div>
            <div class="h-4 bg-gray-200 rounded w-3/4"></div>
            <div class="absolute right-4 top-1/2 -translate-y-1/2">
                <div class="h-8 w-16 bg-gray-200 rounded"></div>
            </div>

            <div class="shimmer"></div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        count: {
            type: Number,
            default: 3
        }
    }
}
</script>

<style scoped>
.shimmer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.3) 50%,
        rgba(255, 255, 255, 0) 100%
    );
    animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
    0% {
        transform: translateX(-100%);
    }
    100% {
        transform: translateX(100%);
    }
}
</style>
