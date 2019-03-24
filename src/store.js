import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex);
import {getshangpinginfo} from "./api/api";

export default new Vuex.Store({
    state:{
        goodsdata:[]
    },
    mutations:{
        changeNum(state, data){
            for(let obj of state.goodsdata){
                for(let item of obj.foods){
                    if(item.name === data.name){
                        item.num += data.num;
                        return
                    }
                }
            }
        },
        initgoodsdata(state,obj){
            state.goodsdata = obj.data
        }

    },
    actions:{
        async initgoodsdata(context){
            let res = (await getshangpinginfo()).data.data;
            for(let obj of res){
                for(let item of obj.foods){
                    item.num = 0
                }
            }
            // console.log(res);
            context.commit({
                type:'initgoodsdata',
                data:res
            })
        }
    },
    getters: {
        getgouwuche(state){
            let newArr = [];
            for(let obj of state.goodsdata){
                for(let item of obj.foods){
                    if(item.num > 0)
                        newArr.push(item)
                }
            }
            return newArr
        }
    }
});
