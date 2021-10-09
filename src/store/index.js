import Vue from 'vue'
import Vuex from 'vuex'
// import mutations from './mutations'
import getters from './getters'
// import actions from './actions'
import {
	ADD_TO_CART,
	ADD_TO_COUNTER

} from './mutation-types'
Vue.use(Vuex)

const state = {
	cartList: []
}

const store = new Vuex.Store({
	state,
	getters,
	mutations: {
		addCart(state,payload) {
			let oldProduct =null;
			for (let item of state.cartList) {
				if (item.iid===payload.iid) {
					oldProduct =item;
					
				}
				
			}
			// let oldProduct =content.state.cartList.find(item=> item.iid ===payload.iid)
			
			if(oldProduct) {
				oldProduct.count+=1
				// content.commit(ADD_TO_CART,oldProduct)
			}else {
				payload.count =1
				payload.checked =true
				state.cartList.push(payload)
				// content.commit(ADD_TO_COUNTER,payload)
			}
	
		}
		
	}
	,
	actions:{
		
	}
})

export default store