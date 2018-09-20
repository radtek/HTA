<template>
    <router-view/>
</template>

<script>
    export default {
        name: 'App',
    }
</script>
<style>
    * {
        margin: 0;
        padding: 0;
        font-family: normal;
    }
    a {
        text-decoration: none;
        color: black;
    }
    .bmt{
        margin-top: 20px;
    }
    .mt{
        margin-top: 10px;
    }
    .smt{
        margin-top: 5px;
    }
    .mint-cell-wrapper{
        font-size: 14px;
    }
    input,textarea{
        font-size: 14px;
        color: rgb(117,117,117);
    }
    ::-webkit-input-placeholder {
        color: rgb(172,169,169);
        font-size: 14px;
        text-align: left;
        font-family: normal;
    }
    :-moz-placeholder {
        color: rgb(172,169,169);
        font-size: 14px;
        text-align: left;
        font-family: normal;
    }
    ::-moz-placeholder {
        color: rgb(172,169,169);
        font-size: 14px;
        text-align: left;
        font-family: normal;
    }
    :-ms-input-placeholder {
        color: rgb(172,169,169);
        font-size: 14px;
        text-align: left;
        font-family: normal;
    }
</style>