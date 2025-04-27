import host from "./host.js"
var token=0 //初始值为0，意味着没有携带token


export default(url,method="GET",data={})=>{
	return new Promise((resolve,reject)=>{
		//从storage中取出token
		try {
			const value = uni.getStorageSync('userInfo');
			if (value) {
				//console.log(value);
				token=value.userId
			}
		} catch (e) {
			console.log(e)
		}
		wx.request({
			url:host+url,method,data,
			header:{"token":token},
			success:(res)=>{resolve(res.data)},
			fail:(err)=>{reject(err)}
		})
	})
}


