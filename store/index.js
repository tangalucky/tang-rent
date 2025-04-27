import Vue from "vue"
import Vuex from "vuex"
Vue.use(Vuex)
import request from "../utils/request.js"

const state={
	houseList:[]
}
const mutations={
	GETHOUSE(state,result){
		state.houseList=result
	}
}
const actions={
	 async gethouse({commit},scrollFlag){
		let result= await request("/houselist","GET",{scrollFlag})
		commit("GETHOUSE",result)
	}
}
const getters={}
export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters
})
