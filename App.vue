<script>
	import request from "./utils/request.js"
	function isLogin(){ //判断是否登录
		uni.getStorage({
			key: 'userInfo',
			success: function (res) {
				if(res.data.userId){
					getApp().globalData.login = true
					getisread()}
			}
		});
	}
	async function getisread (){let result=await request("/getmsg","GET") //判断是否有新消息
			if(result!="no"){if(result.some(item=>item.heId==item.msgId && item.isread==false)){
				uni.showTabBarRedDot({ //显示红点
				  index: 1
				})
			}}}
	
	export default {
		globalData: {  
		            login: false  
		        },
		onLaunch: function() {
			//console.log('App Launch')
			isLogin()
		},
		onShow: function() {
			//console.log('App Show')
		},
		onHide: function() {
			//console.log('App Hide')
		}
	}
</script>

<style lang="less">
	/*每个页面公共css */
	
	@import "static/css/iconfont.css";
	*{
		margin:0;
		padding:0;
	}
	
	
</style>
