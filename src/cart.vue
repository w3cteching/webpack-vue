<template>
    <div>
        <div class='t'>购物车组件---{{ title }}</div>
    </div>
</template>

<script>
export default {
    name:'cart',
    data() {
        return {
            title:'购物车页面111222'
        }
    }
}
</script>

<style lang="less">
@bc:#0f0;
   .t {
       border:3px solid @bc;
   }

</style>