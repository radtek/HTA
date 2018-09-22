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

    /*修改mint-ui默认样式*/
    .mint-header {
        background-color: rgb(110,193,191);;
    }
    .mint-button:not(.is-disabled):active::after {
        opacity: .2;
    }
    .mint-button--primary {
        background-color: rgb(110,193,191);
    }
    .mint-button--primary.is-plain {
        border: 1px solid rgb(110,193,191);
        color: rgb(110,193,191);
    }
    .mint-badge.is-primary {
        background-color: rgb(110,193,191);
    }
    .mint-switch-input:checked + .mint-switch-core {
        border-color: rgb(110,193,191);
        background-color: rgb(110,193,191);
    }
    .mint-navbar .mint-tab-item.is-selected {
        border-bottom: 3px solid rgb(110,193,191);
        color: rgb(110,193,191);
    }
    .mint-tabbar > .mint-tab-item.is-selected {
        color: rgb(110,193,191);
    }
    .mint-searchbar-cancel {
        color: rgb(110,193,191);
    }
    .mint-checkbox-input:checked + .mint-checkbox-core {
        background-color: rgb(110,193,191);
        border-color: rgb(110,193,191);
    }
    .mint-radio-input:checked + .mint-radio-core {
        background-color: rgb(110,193,191);
        border-color: rgb(110,193,191);
    }
    .mt-range-progress {
        background-color: rgb(110,193,191);
    }
    .mt-progress-progress {
        background-color: rgb(110,193,191);
    }
    .mint-msgbox-confirm {
        color: rgb(110,193,191);
    }
    .mint-msgbox-confirm:active {
        color: rgb(110,193,191);
    }
    .mint-datetime-action {
        color: rgb(110,193,191);
    }
    .mint-cell-wrapper, .mint-cell:last-child {
        background-image: none;
    }

    /*element-ui*/
    .select .el-input-group__append{
        color: white;
        background-color: rgb(94,186,185);
    }
</style>