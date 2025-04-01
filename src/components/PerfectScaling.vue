<template>
    <div ref="scaled-father">
        <div :style="dynamicStyles" ref="scaled">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PerfectScaling',
    props: ["scale"],
    data() {
        return {
            observer: null, // MutationObserver实例
        };
    },
    mounted() {
        this.update();
        // 创建MutationObserver实例，并在插槽内容变化时执行update方法
        this.observer = new MutationObserver(() => {
            this.update();
        });
        this.observer.observe(this.$refs.scaled, { childList: true, subtree: true });
    },
    beforeUnmount() {
        // 组件卸载前停止观察Mutation
        this.observer.disconnect();
    },
    methods: {
        update() {
            this.$refs['scaled-father'].style.height = this.$refs['scaled'].getBoundingClientRect().height + 'px';
        }
    },
    computed: {
        dynamicStyles() {
            return {
                transform: 'scale(' + this.scale + ')',
                transformOrigin: 'left top',
                width: '125%'
            };
        },
    }
}
</script>
