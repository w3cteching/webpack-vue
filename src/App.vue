<template>
    <div>
        <div class='tt'>App.vue页面--{{ msg }}</div>
        <Cart></Cart>
    </div>
</template>

<script>
import Cart from './cart'
export default {
    name:'App',
    data() {
        return {
            msg:'hello,vuejs--mvvm'
        }
    },
    components:{
        Cart,
    }
}
</script>

<style>
   .tt {
       background:#00f;
   } 
</style>