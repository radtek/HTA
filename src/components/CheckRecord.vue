<template>
    <div>
        <mt-header title="检查记录">
          <router-link to="" slot="left">
            <mt-button icon="back" @click="$router.go(-1);"></mt-button>
          </router-link>
        </mt-header>
        <div style="padding:0 7%;">
            <div style="height: 85vh; overflow:scroll;">
                <v-loadmore :bottom-method="loadBottom"
                            bottomPullText="下拉加载" bottomDropText="释放加载更多"  bottomLoadingText="加载中···"
                            :bottom-all-loaded="allLoaded" :auto-fill="true" ref="loadmore">
                    <div class="check-list" v-for="item in pageList">
                        <div class="check-cont">
                            <h3> {{ item.typeDesc }} </h3>
                            <mt-cell :title="item.inspDesc" :value="item.inspResult"></mt-cell>
                            <mt-cell :title="item.inspStatus" :value="item.officerName"></mt-cell>
                        </div>
                    </div>
                </v-loadmore>
            </div>
        </div>
    </div>
</template>
<style media="screen">
    .check-list{
        width: 100%;
        height: 150px;
        background: #EBEEF5;
        margin: 10px 0;
        border-radius: 5px;
        overflow: hidden;
    }
    .check-cont > h3{
        font-size: 20px;
        color: #606266;
        text-align: center;
    }
    .check-cont{
        width: 94%;
        padding: 3% 3% 0;
    }
    .check-cont .mint-cell{
         background-color: rgba(0,0,0,0);
    }
</style>
<script>
    import { Header,Loadmore,Toast } from 'mint-ui';
    export default {
        name: 'home',
        data() {
            return {
                id:'',
                searchCondition:{  //分页属性
                    pageNo:"1",
                    pageSize:"5"
                },

                pageList:[],
                allLoaded: false, //是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
                scrollMode:"auto" //移动端弹性滚动效果，touch为弹性滚动，auto是非弹性滚动
            }
        },
        components:{
            Header,
            Toast,
            'v-loadmore':Loadmore
        },
        methods:{
            loadBottom() {
                // 上拉加载
                this.more();// 上拉触发的分页查询
                this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
            },
            loadPageList(){
                this.pageList = [
                    {
                        "id":"123",
                        "inspCode":"302728",
                        "typeDesc":"餐饮油烟检查",
                        "inspDesc":"油烟净化器是否正常使用",
                        "inspResult":"是",
                        "inspStatus":"符合要求",
                        "officerName":"xxx,xxxx"
                    },
                    {
                        "id":"123",
                        "inspCode":"302728",
                        "typeDesc":"餐饮油烟检查",
                        "inspDesc":"油烟净化器是否正常使用",
                        "inspResult":"是",
                        "inspStatus":"符合要求",
                        "officerName":"xxx,xxxx"
                    },
                    {
                        "id":"123",
                        "inspCode":"302728",
                        "typeDesc":"餐饮油烟检查",
                        "inspDesc":"油烟净化器是否正常使用",
                        "inspResult":"是",
                        "inspStatus":"符合要求",
                        "officerName":"xxx,xxxx"
                    },
                    {
                        "id":"123",
                        "inspCode":"302728",
                        "typeDesc":"餐饮油烟检查",
                        "inspDesc":"油烟净化器是否正常使用",
                        "inspResult":"是",
                        "inspStatus":"符合要求",
                        "officerName":"xxx,xxxx"
                    },
                ];

                if (this.pageList) return;
                //TODO::删去前面的

                let self = this;
                $.post( realmName + 'sf_zhzf/msys/inspnotes/list',{
                    execobjId   : self.id,
                    pageNum     : self.searchCondition.pageNo,
                    numPerPage  : self.searchCondition.pageSize
                },function(data,status){
                    if(data.statusCode == 200){
                        self.pageList = data.list;

                    }else if(data.statusCode == 310){
                        //登录超时
                        localStorage.clear();
                        window.location.href = "login.html";
                    }else{
                        Toast(data.message);
                    }
                });
            },
            more(){

                this.pageList = this.pageList.concat([
                    {
                        "id":"123",
                        "inspCode":"302728",
                        "typeDesc":"餐饮油烟检查",
                        "inspDesc":"油烟净化器是否正常使用",
                        "inspResult":"是",
                        "inspStatus":"符合要求",
                        "officerName":"xxx,xxxx"
                    },
                    {
                        "id":"123",
                        "inspCode":"302728",
                        "typeDesc":"餐饮油烟检查",
                        "inspDesc":"油烟净化器是否正常使用",
                        "inspResult":"是",
                        "inspStatus":"符合要求",
                        "officerName":"xxx,xxxx"
                    },
                    {
                        "id":"123",
                        "inspCode":"302728",
                        "typeDesc":"餐饮油烟检查",
                        "inspDesc":"油烟净化器是否正常使用",
                        "inspResult":"是",
                        "inspStatus":"符合要求",
                        "officerName":"xxx,xxxx"
                    },
                    {
                        "id":"123",
                        "inspCode":"302728",
                        "typeDesc":"餐饮油烟检查",
                        "inspDesc":"油烟净化器是否正常使用",
                        "inspResult":"是",
                        "inspStatus":"符合要求",
                        "officerName":"xxx,xxxx"
                    },
                ]);

                return;

                //分页查询
                this.searchCondition.pageNo = parseInt(this.searchCondition.pageNo) + 1;

                let self = this;
                $.post(realmName + 'sf_zhzf/msys/inspnotes/list',{
                    execobjId   : self.id,
                    pageNum     :self.searchCondition.pageNo,
                    numPerPage  :self.searchCondition.pageSize
                },function(data,status){
                    if(data.statusCode == 200){
                        self.pageList = self.pageList.concat(data.list);
                    }else if(data.statusCode == 310){
                        localStorage.clear();
                        window.location.href = "login.html";
                    }else{
                        Toast(data.message);
                    }
                });
            },
        },
        mounted(){
            this.id = this.$route.params.id;
            this.loadPageList();
        }
    }
</script>
