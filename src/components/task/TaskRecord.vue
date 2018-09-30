<template>
    <div>
        <header>
            <h3>任务管理</h3>
        </header>
        <div class="nav">
            <div class="abroad">
                <div class="content-choice">
                    <el-menu
                            :default-active="activeIndex2"
                            class="el-menu-demo"
                            mode="horizontal"
                            @select="handleSelect"
                            text-color="#8C8888"
                            active-text-color="#089593">
                        <el-menu-item index="2" class="right">待办任务</el-menu-item>
                        <el-menu-item index="1" class="left">已办任务</el-menu-item>
                    </el-menu>
                </div>
            </div>

            <div style="padding: 15px 0;background-color: #F8F9F9!important;width: 100%;" v-if="show">
                <!--<el-input placeholder="请输入内容" class="input-with-select search" size="small">-->
                    <!--<el-button slot="append" icon="el-icon-search" class="submit" size="small"></el-button>-->
                <!--</el-input>-->
                <!--<div class="list">-->
                    <!--<v-loadmore :bottom-method="loadBottom"-->
                                <!--bottomPullText="下拉加载" bottomDropText="释放加载更多" bottomLoadingText="加载中···"-->
                                <!--:bottom-all-loaded="allLoaded" :auto-fill="false" ref="loadmore">-->
                    <!--</v-loadmore>-->
                <!--</div>-->
            </div>
        </div>

        <div class="back-color">
            <div class="choice-list" v-if="pageList.length != 0 && activeIndex == 1 " v-for="item in pageList">
                <div class="cont">
                    <h3>{{ item.title }}</h3>
                    <p>完成期限： <span>{{ item.p1 }}</span></p>
                    <p>任务来源： <span>{{ item.p2 }}</span></p>
                    <router-link to="/TaskInfor">
                        <div class="go">
                            <img src="../../assets/img/into.png" alt="无法加载">
                        </div>
                    </router-link>
                </div>
            </div>

            <div class="choice-list" v-if="otherList.length != 0 && activeIndex == 2 " v-for="item in otherList">
                <div class="cont">
                    <h3>{{ item.title }}</h3>
                    <p>完成期限： <span>{{ item.p1 }}</span></p>
                    <p>任务来源： <span>{{ item.p2 }}</span></p>
                    <router-link to="/TaskDealWith">
                        <div class="go">
                            <img src="../../assets/img/into.png" alt="无法加载">
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
        <my-menu active="1"></my-menu>
    </div>
</template>

<script>
    import { Loadmore } from 'mint-ui';
    import myMenu from "../customComponent/myMenu";

    export default {
        data() {
            return {
                objName: "",
                taskList: [],
                activeIndex: '1',
                activeIndex2: '1',
                show: true,
                pageList: [],
                otherList: [],
                allLoaded: true, //是否可以上拉属性，false可以上拉，true为禁止上拉，就是不让往上划加载数据了
                scrollMode: "auto"
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                this.activeIndex = key;
                console.log(this.activeIndex);
            },
            getData(key){
                if(key == 1){
                    $.get(getUrl(''), {

                    })
                }else if(key == 2){
                    $.get(getUrl(''), {

                    })
                }
            },
            loadBottom() {
                // 上拉加载
                this.more();// 上拉触发的分页查询
                this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
            },
            loadPageList() {
                let self = this;
               $.get(getUrl('sf_zhzf/msys/task/list'), {
                   objName: self.objName,
               }, function (data, status) {
                   if (data.statusCode == 200) {
                       console.log(data.list);
                       for (let i = 0 ; i < data.list.length ; i++ ) {

                          if (data.list[i].statusName == "未确认") {
                               console.log("未确认");
                               self.otherList.push(
                                   {
                                       title:data.list[i].deptName,
                                       p1:data.list[i].limitDate,
                                       p2:data.list[i].publisher,
                                       name:data.list[i].statusName,
                                   }
                               );
                          }  else {
                               self.pageList.push(
                                   {
                                       title:data.list[i].deptName,
                                       p1:data.list[i].limitDate,
                                       p2:data.list[i].publisher,
                                       name:data.list[i].statusName,
                                   }
                               );
                           }

                       }
                   } else if (data.statusCode == 310) {
                       // window.location.href = "login.html";
                   } else {
                       Toast(data.message);
                   }
               }, 'json');
            },
            more() {
                // 分页查询
                this.searchCondition.pageNo = parseInt(this.searchCondition.pageNo) + 1;

                let self = this;
                $.get(getUrl('sf_zhzf/msys/enterprise/querybyname'), {
                    objName: self.objName,
                    // pageNum:self.searchCondition.pageNo,
                    // numPerPage:self.searchCondition.pageSize
                }, function (data, status) {
                    if (data.statusCode == 200) {
                        self.pageList = self.pageList.concat(data.list);
                    } else if (data.statusCode == 310) {
                        window.location.href = "login.html";
                    } else {
                        Toast(data.message);
                    }
                }, 'json');
            },

        },
        mounted:function(){
            this.loadPageList();
        },
        components: {
            'v-loadmore': Loadmore,
            'my-menu':myMenu,
        },
    }

</script>

<style scoped>
    body{
        background-color: #F8F9F9;
        font-family: "思源黑体";
    }
    header{
        height: 55px;
        background-color: #ffffff;
    }
    h3{
        text-align: center;
        font-size: 18px;
        color: #101010;
        font-family: Arial;
        padding: 15px 0;
        font-weight: 100;
    }
    .content-choice{
        width: 80%;
        margin: 0 auto;
    }
    .choice-list{
        background-color: #ffffff;
        margin-top: 2px;
    }
    .back-color{
        background-color: rgb(248, 249, 249);
    }
    .nav{
        width: 100%;
        margin: 0;
    }
    .right,.left{
        width: 40%;
        text-align: center;
        margin: 0 5% !important;
    }
    .search{
        width: 90%;
        margin: 0 4%;
    }
    .submit{
        border: #089593 solid 1px;
        background-color: #089593 !important;
        border-radius: 0;
        color: #fff !important;
    }
    .cont{
        width: 80%;
        margin: auto;
        padding: 10px 10px 10px 10px;
        background-color: #ffffff;
        border-radius: 3px;
        position: relative;
        font-family: "思源黑体";
    }
    .cont h3{
        padding: 5px 0 10px 10px;
        text-align: left;
        color: #FF9800;
        font-size: 16px;
    }
    .cont p{
        color: #888888;
        font-size: 12px;
        text-align: left;
        padding: 0 0 5px 10px;
    }
    .cont p span{
        color: #089593;
        opacity: 0.65;
        font-size: 14px;
        text-align: left;
    }
    .cont .go{
        position: absolute;
        right: 9%;
        bottom: 30%;
    }
    .cont .go img{
        width: 30px;
    }
    .abroad{
        width: 100%;
        background-color: #ffffff;
    }
</style>