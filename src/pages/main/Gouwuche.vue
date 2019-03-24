<template>
    <div>
        <div class="goodsinfo" v-for="info in shopcargoods">
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

</template>

<script>
    export default {
        name: "Gouwuche",
        computed: {
            shopcargoods() {
                return this.$store.getters.getgouwuche;
            }
        },
        methods:{
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
        }
    }
</script>

<style scoped lang="less">
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
</style>