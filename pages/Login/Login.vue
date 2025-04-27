<template>
	<view class="login-container">
	 	<!-- <view class="login" @click="login" v-if="!userInfo.userId">
			微信一键注册登录
		</view> -->
		<button class="avatar-wrapper" v-if="!userInfo.avatar" open-type="chooseAvatar" 
		@chooseavatar="onChooseAvatar">
		  <image class="avatar" :src="image?host+image:defaultImg"></image>
		<view>请设置头像图片</view>
		</button> 
		<view class="name-wrapper" v-if="!userInfo.avatar">
			<text class="iconfont icon-wode-tianchong"></text>
	        <input type="nickname" class="weui-input" placeholder="请输入昵称" 
			v-model="wxname"/>
		</view>
		<view class="login" @click="checkin" v-if="userInfo.userId">
			微信一键注册登录
		</view>
	</view>
</template>

<script>
	import request from "../../utils/request.js"
	import host from "../../utils/host.js"
	export default {
		onLoad(){
			this.login()
		},
		data() {
			return {
				host:host,
				userInfo:{
					userId:"",
					name:"",
					avatar:""
					
				},
				image:"",
				wxname:"",
				defaultImg:"../../static/image/none.jpeg"
			};
		},
		
		methods:{
			onChooseAvatar(e) {
		    var { avatarUrl } = e.detail
			//console.log(avatarUrl)
			//上传图片到服务器
		    var that = this
			   wx.uploadFile({
			       url: host+"/image", 
			       filePath: avatarUrl,
			       name: 'file',
			       success (res){
			         var data = res.data
					 //console.log(data)
					 that.image=data
			     }})
				 //console.log("avatarUrl为:"+avatarUrl)
	  
		  },
			login(){
					var that = this
					wx.login({
					  async success (res) {
					    if (res.code) {
							console.log('登录成功！')
					      //发起网络请求
						  let result= await request("/login","GET",{code: res.code})
						  //console.log("result:"+result)
					      //修改用户userId为token，
						  that.userInfo.userId=result.token
						  if(result.avatar){that.userInfo.avatar=result.avatar}
						  if(result.name){that.userInfo.name=result.name}
					    } else {
					      console.log('登录失败！' + res.errMsg)
					    }
					  }
					})
				
			},
			async checkin(){
				var userInfo=this.userInfo
				userInfo.avatar=this.image
				userInfo.name=this.wxname
				//console.log("userId:"+userInfo.userId)
				//修改userlist中的(avatar and name)
				let result= await request("/loginfo","GET",{userInfo})
				if(result=="ok"){
					uni.setStorage({
					key: 'userInfo',
					data: userInfo,
					success: function () {
						//console.log('success存入userInfo');
						uni.showToast({
							title: '登录成功',
							duration: 1000
						});
						getApp().globalData.login=true
						uni.reLaunch({
						url: '../Personal/Personal'
						});
					}
				});
				}
				
			}
		}
	}
</script>

<style lang="less">
@import "../../static/css/variable.less";
.login-container{
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
	height:750rpx;
	.avatar-wrapper{
		background-color: white;
		border:1px solid @color;
		border-radius: 20rpx;
		padding:15rpx;
		color:#717171;
		.avatar{
			width:130rpx;
			height:130rpx;
			border-radius: 50%;
		}
	}
	.name-wrapper{
		height:70rpx;
		width:460rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.iconfont{
		font-size: 54rpx;
		//margin-right: 15rpx;
		color: @color;
	}
	.weui-input{
		border:1px solid @color;
		border-radius: 20rpx;
		padding:10rpx 20rpx;
		display: inline-block;
	}}
	.login{
		//border:1px solid @color;
		border-radius: 20rpx;
		background-color: @red;
		color:white;
		font-weight: bold;
		padding:20rpx 35rpx;
		}
}

</style>
