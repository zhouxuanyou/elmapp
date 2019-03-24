<template>
    <div id="main">
        <div class="bg"></div>
        <div class="top">
            <img :src="data.avatar" alt="#">
            <div class="shangjiaxiaobiaoti">
                <p class="shangjianame"><img src="../../assets/images/brand@2x.png" alt="">{{data.name}}</p>
                <p>{{data.description}}</p>
                <p class="huodong"><img src="../../assets/images/decrease_1@2x.png" alt="">{{supportsStr}}</p>
            </div>
        </div>

        <div class="nav-shouye">
            <!--<router-link to="/">商品</router-link>-->
            <!--<router-link to="/pingjia">评价</router-link>-->
            <!--<router-link to="/shangjia">商家</router-link>-->
            <div :class="{activetitle:this.routertitle === '/'}" @click="clickrouter('/')">商品</div>
            <div :class="{activetitle:this.routertitle === '/pingjia'}" @click="clickrouter('/pingjia')">评价</div>
            <div :class="{activetitle:this.routertitle === '/shangjia'}" @click="clickrouter('/shangjia')">商家</div>

        </div>
        <router-view></router-view>
        <div class="gouwuche">
            <div class="gwc">
                <div class="gwchz">
                    <Poptip word-wrap width="200" content="content">
                        <Icon type="md-cart" class="gwctb"/>
                        <div class="api" slot="content">
                            <Gouwuche/>
                        </div>
                    </Poptip>


                </div>
            </div>
            <div class="zongjiage">
                ￥:<sopan>{{totalPrice}}</sopan>元
            </div>
            <div class="jiesuan">结算</div>
        </div>
    </div>
</template>

<script>
    import {getshangjiainfo} from "../../api/api";
    import Gouwuche from './Gouwuche'

    export default {

        name: "Main",
        components: {Gouwuche},
        data(){
            return{
                routertitle:'/',
                data:{},
            }

        },
        methods:{
            clickrouter(title){
                this.routertitle = title;
                this.$router.history.push(title);
            }

        },
        async created(){this.data = (await getshangjiainfo()).data.data},
        computed:{
            supportsStr(){
                if (this.data.supports){
                    return this.data.supports.map(obj=>obj.description).join(',');
                }
                return ''
            },
            totalPrice(){
                let price = 0;
                for(let obj of this.$store.getters.getgouwuche){
                    price += obj.num * obj.price
                }
                return price
            }

        }

    }
</script>

<style scoped lang="less">
    #main{
        margin: 0;
        padding: 0;
        .top{
            display: flex;
            width: 100%;
            height: 9rem;
            align-items: center;
            font-size: 1rem;
            color: #fff;

            img{
                height: 4rem;
                width: 4rem;
                margin-left: 2rem;
            }
            .shangjiaxiaobiaoti{
                display: flex;
                flex-direction: column;
                margin-left: 2rem;

                img{
                    padding: 0;
                    margin: 0;
                    height: 1rem;
                    width: 2rem;
                }
                .huodong{
                    overflow:hidden;
                    text-overflow:ellipsis;
                    white-space:nowrap;
                    font-size: 0.5rem;
                }
                .shangjianame{
                    font-weight: bold;
                    font-size: 1.3rem;
                }
            }
        }
        .bg{
            width: 100%;
            height: 9rem;
            background-image: url("http://static.galileo.xiaojukeji.com/static/tms/seller_avatar_256px.jpg");
            position: absolute;
            z-index: -1;
            opacity:0.5;
        }
        font-size: 1.5rem;
        .nav-shouye{
            display: flex;
            justify-content: space-around;
            .activetitle{
                font-weight: bold;
                color: red;
            }
        }
        .gouwuche{
            height: 5rem;
            bottom: 0;
            width: 100%;
            background: #7e79cc;
            position: absolute;
            display: flex;
            justify-content: space-around;
            .gwc{
                height: 5rem;
                width: 5rem;
                padding: 0.5rem;
                top: -20px;
                left: 0;
                position: relative;
                background: #7e79cc;
                border-radius: 50%;
                .gwchz{
                    height: 4rem;
                    width: 4rem;
                    margin: 0 auto;
                    background: #ccc;
                    border-radius: 50%;
                    .gwctb{
                        font-size: 3.5rem;
                        text-align: center;
                    }
                }
            }
            .zongjiage{
                font-size: 1rem;
                align-self: center;
            }
            .jiesuan{
                align-self: center;
                height: 4rem;
                width: 4rem;
                background: #cc772a;
                text-align: center;
                line-height: 4rem;
            }
        }
    }
</style>