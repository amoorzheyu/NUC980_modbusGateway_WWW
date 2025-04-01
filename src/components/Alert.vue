<template>
    <div class="alert position-fixed top-0 start-50 mt-5 translate-middle-x shadow d-flex align-items-center" role="alert" :class="{ 'visually-hidden': is_hidden , 'alert-warning' : color==='warning', 'alert-success' : color==='success'}">
        <span>{{ context }}</span>
        <div class="spinner-border ms-2" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
</template>


<script>
export default {
    name: 'Alert',
    props: {
        context: String,
        color: String,
        is_hidden: Boolean
    },
    data() {
        return {
        }
    },
    methods: {
     
    },

}
</script>
