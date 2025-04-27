<template>
	<view class="chat-container">
		
		<!-- 房子信息 -->
		<!-- <view class="house-item" @click="toDetail"> 
			<img :src="houseInfo.img[0]" alt="" class="img">
			<view class="info">
				<text class="house-title">
					<text class="method">{{houseInfo.method}}</text>|&nbsp;{{houseInfo.title}}</text>
				<text class="desc">{{houseInfo.desc}}</text>
				<view class="option-list"><text class="option-item" v-for="it in houseInfo.other" :key=it>{{it}}</text>
				</view>
				<text class="price">￥{{houseInfo.price}}/月</text><text class="time">{{houseInfo.time}}前发布</text>
			</view>
		</view>-->
		
		<!-- 聊天对话区域 -->
		<scroll-view class="chat-block" scroll-y :scrollTop="chatList.length*600">
			<!-- 提示框 -->
			<view class="tip">您正在和&nbsp;{{heInfo.name}}&nbsp;沟通中</view>
			
			<!-- 聊天列表 -->
			<view class="chat-item" v-if="chatList.length" 
			:class="myInfo.userId==item.id?'':'chat-item-left'" 
			v-for="(item,index) in chatList" :key=index>

				<img :src="myInfo.userId==item.id?host+myInfo.avatar:host+heInfo.avatar">
				<view class="sen-container">
					<text class="sentence">{{item.content}}</text>
				</view>
			</view>
			
		</scroll-view>	
		
		<!-- 输入框 -->
		<view class="bottom-bar">
			<input class="input" v-model="inputContent"></input>
			<text class="send" @click="sendChat">发 送</text>
		</view>
	</view>
</template>

<script>
	import request from "../../utils/request.js"
	import host from "../../utils/host.js"
	export default {
		onLoad:function(option) {
			    if(!getApp().globalData.login){
					uni.navigateTo({url:"../../pages/Login/Login"})} 
			
				this.heInfo.id=option.userid
				this.heInfo.avatar=option.avatar
				this.heInfo.name=option.name
				var that=this
				uni.getStorage({
					key: 'userInfo',
					success: function (res) {
						that.myInfo.userId=res.data.userId
						that.myInfo.avatar=res.data.avatar
					}
				});
				//发请求获取历史聊天记录
				this.getChatList()
				this.getMyId()
				
				},
		data() {
			return {
				host:host,
				myInfo:{
					userId:0,
					name:"0",
					avatar:"",},
				heInfo:{
					id:0,
					avatar:""
				},
				inputContent:"",
				chatList:[]
				
			};
		},
		methods: {
			async getMyId(){let result=await request("/getmyid","GET")
			//console.log(result)
			this.myInfo.userId=result},
			toDetail(){
				uni.navigateTo({url:"../Detail/Detail"})
			},
			async sendChat(){
				//不同机型时间格式不同，故这里采用以下方式获取时间
				//var time = new Date(parseInt(new Date().getTime())).toLocaleString();
				var d=new Date()
				var time=d.getFullYear()+"/"+(d.getMonth()+1)+"/"+d.getDate()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()
				//当前input加入聊天数组数据中，在界面上显示
				this.chatList.push({id:this.myInfo.userId,content:this.inputContent,time})
				//发请求将当前input上传到服务器chatList数据中
				 var result= await request("/upchat","GET",{chat:this.inputContent,pubid:this.heInfo.id,time})
				this.inputContent=""
			},
			async getChatList(){
				var result= await request("/getchat","GET",{pubid:this.heInfo.id})
				if(result[0].id){
					this.chatList=result
					this.renewread()
				}
			},
			async renewread(){
				//更新消息已读状态
				 await request("/renewread","GET",{pubid:this.heInfo.id})
				
			}
			
		}
	}
</script>

<style lang="less" scoped>
	@import "../../static/css/variable.less";
	.chat-container{
		weight:100vh;
		//聊天区域
		.chat-block{
			weight:100%;
			height: calc(100vh - 184rpx);
			background-color: #f6f6f6;
			position: relative;
			// 提示框
			.tip{
			margin:20rpx 50rpx;
			 background-color: #fff;
			 font-size: 28rpx;
			 text-align: center;
			 border-radius: 20rpx;
			}
			//聊天内容
			.chat-item{
			weight:100%;
			// height:100rpx;
			padding:30rpx;
			margin: 20rpx 0;
			
			.sen-container{
				width:560rpx;
				display: flex;
				justify-content: flex-end;
				
				.sentence{
				background-color: #fff;
				border-radius: 10rpx;
				padding:12rpx 15rpx;
				float:right;
				word-wrap:wrap;
				overflow-wrap: anywhere;
				}
			}
			
			img{
				width:80rpx;
				height:80rpx;
				border-radius: 50%;
				vertical-align: middle;
				//margin-left: 20rpx;
				flex-shrink: 0;
				float:right;
			}
		}
			.chat-item-left{
				.sen-container{
					justify-content: flex-start;
					
					.sentence{
						float:left;
						word-wrap:wrap;
						overflow-wrap: anywhere;
						background-color: #fff129;
					}
				}
				img{
					float:left;
					margin-left: 0;
					margin-right: 20rpx;
					}
			}
		}

		// 输入框
		.bottom-bar {
			background-color: #fff;
			height: 120rpx;
			width: 100vw;
			position: absolute;
			bottom: 0;
			line-height: 80rpx;
			padding: 30rpx 0;
			border-radius: 30rpx 30rpx 0 0;
			.input{
				border: 2rpx solid @bgcolor;
				background-color: #fff;
				box-shadow: 1px 1px 2px #d5d5d5;
				border-radius: 20rpx;
				float: left;
				margin-left: 20rpx;
				padding: 5rpx 10rpx;
				height:70rpx;
				width:530rpx;
			}
			.send {
				color: #fff;
				font-weight: bold;
				//border: 2rpx solid @bgcolor;
				background-color: @red;
				box-shadow: 1px 1px 2px #d5d5d5;
				border-radius: 20rpx;
				float: right;
				margin-right: 20rpx;
				padding: 5rpx 10rpx;
				height:70rpx;
				width:120rpx;
				text-align: center;
				line-height: 70rpx;
			}
		}
	}
</style>
