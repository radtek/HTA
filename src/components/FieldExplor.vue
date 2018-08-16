<template>
    <div>
        <mt-header title="现场勘查">
          <router-link to="/ListContent" slot="left">
            <mt-button icon="back"></mt-button>
          </router-link>
        </mt-header>
        <div style="padding:0 7%;">
            <div class="content">
                <mt-radio
                  title="1 油烟净化机是否能正常使用"
                  v-model="value"
                  :options="['是', '否']">
                </mt-radio>
            </div>
            <div class="content">
                <mt-radio
                  title="2 油烟净化机是否能定期清洗"
                  v-model="value"
                  :options="['是', '否']">
                </mt-radio>
            </div>
            <footer>
                

            </footer>
        </div>
    </div>


</template>
<style media="screen">
    .content{
        margin: 25px 0;
    }
    .mint-radiolist-title {
        font-size: 16px;
        margin: 8px;
        display: block;
        color: #303133;
    }
</style>
<script>
    import { Header, Radio  } from 'mint-ui';
    export default {
        name: 'home',
        data() {
            return {
                selected:'',
                value: ''
            }
        },
        components:{
            Header,
            Radio
        }
    }
</script>
