<template>
    <div>
        <Row>
            <Col span="6">
                <div class="leftnav">
                    <ul class="content">
                        <div v-for="(goods,i) in goodsdata" :class="{nametitle:true,selected:selectedIndex=== i}" @click="clicktitle(i)">
                            {{goods.name}}
                        </div>

                    </ul>
                </div>
            </Col>
            <Col span="18">
                <div class="rightinfo">
                    <ul class="content">
                        <div :id='i' v-for="(goods,i) in goodsdata">
                            <div class="titlename" >
                                <div class="tiname">{{goods.name}}</div>
                                <div class="goodsinfo" v-for="info in goods.foods">
                                    <Row>
                                        <Col span="8">
                                            <div class="imgicon">
                                                <img :src="info.icon" alt="">
                                            </div>
                                        </Col>
                                        <Col span="16">
                                            <div class="shangpinginfo">
                                                <p class="infoname">{{info.name}}</p>
                                                <p class="idesc">{{info.description}}</p>
                                                <span>月售{{info.sellCount}}</span><span>好评率{{info.rating}}</span>
                                                <div><span class="goodsprice">￥{{info.price}}</span><del>￥{{info.oldPrice}}</del></div>
                                            </div>
                                            <button  v-show="info.num !== 0" @click="goodsdec(info.name)">-</button>
                                            <lable  v-show="info.num !== 0">{{info.num}}</lable>
                                            <button @click="goodsadd(info.name)">+</button>
                                        </Col>
                                    </Row>



                                </div>
                            </div>
                        </div>
                    </ul>
                </div>

            </Col>
        </Row>

    </div>

</template>

<script>
    // import {getshangpinginfo} from "../../api/api";
    import BScroll from 'better-scroll';
    export default {
        name: "Shangpin",
        data(){
            return{
                // data:[],
                leftdom:{},
                rightdom:{},
                selectedIndex:0,
                heightarr:[],
                buttonSize: 'large'
            }
        },
        methods:{
            clicktitle(index){
                // this.selectedIndex = index;
                let divs = document.getElementById(index);
                this.rightdom.scrollToElement(divs,500)
            },
            goodsadd(name){
                this.$store.commit({
                    type: "changeNum",
                    name,
                    num: 1
                });

            },
            goodsdec(name){
                this.$store.commit({
                    type: "changeNum",
                    name,
                    num: -1
                });

            },

        },
        // async created(){this.data = (await getshangpinginfo()).data.data},
        created(){
            this.$store.dispatch('initgoodsdata');

        },
        mounted(){
            this.leftdom = new BScroll('.leftnav',{click:true});
            this.rightdom = new BScroll('.rightinfo',{probeType:3});
            this.rightdom.on('scroll',obj=>{
                // console.log(Math.abs(obj.y));
                // console.log(this.heightarr)
                let totalheight = 0;
                for (let i = 0; i <this.heightarr.length ; i++) {
                    let curheight = this.heightarr[i];
                    // console.log(curheight);
                    totalheight += curheight;
                    let cury = Math.abs(obj.y);
                    if (cury <= this.heightarr[0]){
                        this.selectedIndex=0
                    }
                    else if (cury >=totalheight){
                        // console.log(cury);
                        this.selectedIndex=i+1;
                        continue;
                    }
                }

            })
        },
        updated(){
            if (this.heightarr.length === 0 ){
                for (let i = 0; i <this.goodsdata.length ; i++) {
                        this.heightarr.push(document.getElementById(i).offsetHeight);
                }
            }
            // console.log(this.$store.state.goodsdata)

        },
        computed:{
            goodsdata(){
                return this.$store.state.goodsdata;
            }
        }
    }
</script>

<style scoped lang="less">
    .selected {
        background-color: #fff;
        font-weight: bold;
    }
    .leftnav{
        height: 25rem;
        background: rgb(243,246,247);
        overflow: scroll;
        .nametitle{
            display: flex;
            height: 4rem;
            font-size: 1rem;
            align-items: center;
        }
    };
    .rightinfo{
        height: 25rem;
        background: #fff;
        overflow: scroll;
        .tiname{
            width: 100%;
            background: rgb(243,246,247);
            line-height: 2rem;
            padding-left: 1rem;
        }
        .goodsinfo{
            margin-left: 1rem;
            height: 8rem;
            font-size: 1rem;
            border-bottom: 1px solid #ccc;
            .imgicon{
                height: 4rem;
                width: 4rem;
                img{
                    height: 100%;
                    width: 100%;
                }
            }
            .shangpinginfo{
                .infoname{
                    font-weight: bold;
                    font-size: 0.8rem;
                }
                .idesc{
                    font-size: 0.2rem;
                }
                .goodsprice{
                    color: red;
                    font-size: 0.8rem;
                }
            }

        }

    }

</style>