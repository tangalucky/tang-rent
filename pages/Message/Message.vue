<template>
	<view class="message-container">
		<view v-if="!msgList.length" class="nomsg">暂无聊天信息</view>
		<view class="message-item" v-for="(item,index) in msgList" 
		:key=item.heId @click="toChat(index)">
			<image :src="host+item.avatar" >
				<view class="reddot" v-if="item.heId==item.msgId && item.isread==false"></view>
			</image>
			<view class="msg">
				<text class="name">{{item.name}}</text>
				<text>{{item.chat}}</text>
			</view>
			<text class="time">{{item.time.slice(2,-3)}}</text>
		</view>
	</view>
</template>

<script>
	import request from "../../utils/request.js"
	import host from "../../utils/host.js"
	export default {
		data() {
			return {
				//{heId,avatar,name,chat,time}
				//msgList:[{heId:0,avatar:"../../static/image/hua.jpeg",name:"花满楼",chat:"你好双方来说可是看过哈萨克汗国帅哥帅哥帅哥",time:"2023/04/13 14:55:09"},
				//{heId:1,avatar:"../../static/image/hua.jpeg",name:"花满楼",chat:"你好",time:"2023/04/13 14:55:09"}]
				msgList:[],
				host:host,
				myId:""
			};
		},
		mounted(){
			//this.getMyId()
			if(!getApp().globalData.login){
				uni.navigateTo({url:"../../pages/Login/Login"})}
			this.getMsg()
			
		},
		onShow(){this.getMsg()},//再次返回页面获取更新已读状态的数据
		methods:{
			// async getMyId(){let result=await request("/getmyid","GET")
			// //console.log(result)
			// this.myId=result},
			async getMsg(){
				let result=await request("/getmsg","GET")
				if(result!="no"){this.msgList=result}
			},
			toChat(index){
				//点击后修改该条信息的已读状态
				this.msgList[index].isread=true
				//转至chat页面携带对方数据,
				uni.navigateTo({url:"../Chat/Chat?userid="+this.msgList[index].heId+"&avatar="+this.msgList[index].avatar+"&name="+this.msgList[index].name})
	
			}
		},
		watch:{msgList:{handler(newVal,oldVal){
			if(newVal.every(item=>item.heId!=item.msgId || item.isread==true)){
			uni.hideTabBarRedDot({ //隐藏红点
			  index:1
			})
		}},
			//immediate:true,
			deep:true}}
	}
</script>

<style lang="less">
	@import "../../static/css/variable.less";
	.message-container{
		height:100vh;
		.nomsg{
			width:750rpx;
			text-align: center;
			margin:100rpx 0;
			
		}
		.message-item{
			position:relative;
			//height:60rpx;
			// background-color: @bgcolor;
			display:flex;
			justify-content: space-between;
			padding: 25rpx 25rpx;
			.reddot{
					position:absolute;
					background-color:red;
					height:28rpx;
					width:28rpx;
					border-radius: 50%;
					top:28rpx;
					left:105rpx;
				}
			image{
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
				//margin-right:-180rpx;
				
			}
			.msg{
				display:flex;
				flex-direction: column;
				text{
					margin:5rpx 0;
					width:300rpx;
					display:block;
					white-space:nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
				.name{
					font-weight: bold;
						
				}
				
			}
			
			.time{
				font-size:13px;
				line-height: 100rpx;
			}
			
		}
	}
</style>
