<template>
	<view class="personal-container">
		<TopBar />
		<view class="personal" @click="toLogin">
			<img :src="userInfo.avatar?host+userInfo.avatar:defaultImg">
			<text class="name">{{userInfo.name?userInfo.name:'未登陆，请点击登陆'}}</text>
		</view>
		<view class="function">
			<view class="my-publish" @click="toMyPub">
				<text class="iconfont icon-fabu"></text>我的发布
			</view>
			<view class="my-chat" @click="toMessage">
				<text class="iconfont icon-xinxi"></text>我的消息
			</view>
		</view>
	</view> 
</template>

<script>
	import host from "../../utils/host.js"
	import request from "../../utils/request.js"
	export default {
		onShow(){
			if(getApp().globalData.login){this.getisread()}
			},
		data() {
			return {
				host:host,
				userInfo:{
					userId:0,
					name:"",
					avatar:""
					
				},
				defaultImg:"../../static/image/none.jpeg"
			};
		},
		mounted(){
			if(!getApp().globalData.login){
				uni.navigateTo({url:"../../pages/Login/Login"})}
			//从storage中取出userinfo
			const that=this
			uni.getStorage({
				key: 'userInfo',
				success: function (res) {
					//console.log("打印pesonnal的mounted："+res.data);
					if (res.data) {
						//console.log(res.data);
						that.userInfo.avatar=res.data.avatar
						that.userInfo.name=res.data.name
						that.userInfo.userId=res.data.userId
					}
				}
			});
			
		},
		methods:{
			async getisread (){let result=await request("/getmsg","GET") //判断是否有新消息
					if(result!="no"){if(result.some(item=>item.heId==item.msgId && item.isread==false)){
						uni.showTabBarRedDot({ //显示红点
						  index: 1
						})
					}}},
			toMessage(){
				if(!this.userInfo.userId){
					uni.reLaunch({url:"../Login/Login"})}
				else{
					uni.switchTab({url:"../Message/Message"})
				}
			},
			toLogin(){
				if(!this.userInfo.avatar){
					uni.reLaunch({url:"../Login/Login"})}
				},
			toMyPub(){
				if(!this.userInfo.userId){
					uni.reLaunch({url:"../Login/Login"})}
				else{
					uni.navigateTo({url:"../MyPublish/MyPublish"})
				}
			}
		}
	}
</script>

<style lang="less">
	@import "../../static/css/variable.less";
	
	.personal-container{
		padding: 10rpx;
		
		.personal{
			padding:30rpx 20rpx;
			border-bottom: 2px solid @bgcolor;
			img{
				width:100rpx;
				height:100rpx;
				border-radius: 50%;
				vertical-align: middle;
				margin-right: 30rpx;
			}
			.name{
				font-size: 34rpx;
			}
		}
		.function{
			display:flex;
			width:730rpx;
			margin:50rpx 0;
			view{
				display: flex;
				flex-direction: column;
				color:#242424;
				width:33.3%;
				align-items: center;
				font-size: 28rpx;
				.iconfont{
					font-size: 65rpx;
					margin-bottom: 10rpx;
				}
			}
		}
	}
</style>
