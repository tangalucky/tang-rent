<template>
	<!-- 房子详情页 -->
	<view class="houseDetail-container">

		<scroll-view scroll-y class="house-info" v-if="hindex!=-1">
			<!-- 轮播 -->
			<swiper class="house-swiper" indicator-dots>
				<swiper-item v-for="(item,index) in houseInfo.img" :key="index" class="swiper-item">
					<img class="swiper-img" :src="host+item" alt="">
				</swiper-item>
			</swiper>
			<!-- 房子信息 -->
			<view class="first"><text class="price">{{houseInfo.price}}&nbsp;/月</text>
				<text class="option-list"><text class="option-item" v-for="item in houseInfo.condition"
						:key="item">{{item}}</text></text>
			</view>
			<view class="title">{{houseInfo.method}}&nbsp;|&nbsp;{{houseInfo.title}}</view>
			<view class="area">
				<text v-if="houseInfo.areaIndex>=0 || houInfo.areaIndex>=0">{{town}}</text>
				<text v-if="houseInfo.subIndex>=0 || houInfo.subIndex>=0">{{station}}</text>
			</view>
			<view class="more">
				地址<text>{{houseInfo.location}}</text>
			</view>
			<view class="more">
				朝向<text>{{houseInfo.direct}}</text>
			</view>
			<view class="more">
				房源<text>{{houseInfo.origin}}</text>
			</view>
			<view class="more">
				其他<text v-for="item in houseInfo.condition" :key="item">{{item}}</text>
			</view>
			<view class="host">
				<img :src="host+houseInfo.avatar" v-if="houseInfo.avatar">
				<text class="name" v-if="houseInfo.name">{{houseInfo.name}}</text>
				<text class="time">{{houseInfo.time}}发布</text>
			</view>
			<view class="desc">“ {{houseInfo.desc}} ”</view>
		</scroll-view>


		<!-- 底部选项 -->
		<view class="bottom-bar" v-if="hindex!=-2 && isMe==0">
			
			<view class="ask" @click="toChat">在线咨询</view>
		</view>
	</view>
</template>

<script>
	import mapState from "vuex"
	import {townsOfArea,stationsOfSubway} from "../../utils/area.js"
	import request from "../../utils/request.js"
	import host from "../../utils/host.js"
	export default {
		onLoad:function(option) { 		
				//console.log("option.hindex"+option.hindex)
				//console.log("option.hinfo"+option.hinfo)
				if(option.hindex){this.hindex=option.hindex}
				if(!option.hindex && option.hinfo){
					this.houInfo=JSON.parse(option.hinfo)
					this.hindex=-2
			}
		      //发请求判断本页是否是自己发布
			  this.isMy()
			
			},
		data() {
			return {
				host:host,
				hindex:-1,
				houInfo:{},
				userId:"",
				isMe:0
			};
		},
		methods:{
			async isMy(){let result=await request("/ismy","GET",{pubid:this.houseInfo.userId})
			//console.log(result)
			if(result=="is"){this.isMe=1}},
			toChat(){
				//转至chat页面携带houseinfo的userId
					uni.navigateTo({url:"../Chat/Chat?userid="+this.houseInfo.userId+"&avatar="+this.houseInfo.avatar+"&name="+this.houseInfo.name})
			}
		},
		computed:{
				houseInfo(){
					if(this.hindex>=0){return this.$store.state.houseList[this.hindex]}
					if(this.hindex==-2){return this.houInfo}},
				town(){
					if(this.hindex>=0 && this.houseInfo.areaIndex>=0){return townsOfArea[this.houseInfo.areaIndex].towns[this.houseInfo.townIndex].town}
					if(this.hindex==-2 && this.houInfo.areaIndex>=0){return townsOfArea[this.houInfo.areaIndex].towns[this.houInfo.townIndex].town}},
				station(){
					if(this.hindex>=0 && this.houseInfo.subIndex>=0){return stationsOfSubway[this.houseInfo.subIndex].stations[this.houseInfo.staIndex].station}
					if(this.hindex==-2 && this.houInfo.subIndex>=0){return stationsOfSubway[this.houInfo.subIndex].stations[this.houInfo.staIndex].station}}	
				}
	}
</script>

<style lang="less" scoped>
	@import "../../static/css/variable.less";

	.houseDetail-container {


		// 房子信息
		.house-info {
			height: calc(100vh - 120rpx);
			overflow: hidden;

			// 轮播
			.house-swiper {
				height: 450rpx;

				.swiper-item {
					.swiper-img {
						width: 100vw;
						height: 450rpx;
						}
			}

			}

			.first {
				margin: 12rpx;

				.price {
					font-size: 42rpx;
					color: #ca0540;
					font-weight: bold;
					margin-right: 10rpx;
				}

				.option-list {

					.option-item {
						background-color: #f5f5f5;
						color: #000;
						// font-weight: bold;
						border-radius: 15rpx;
						padding: 8rpx 12rpx;
						margin: 0 5rpx;
						font-size: 26rpx;

					}
				}

			}

			.title {
				margin: 14rpx;
				color: #000;
				font-weight: bold;
				font-size: 34rpx;

			}
			.area{
				margin: 20rpx 0;
				text{
					font-size: 28rpx;
					margin-left: 25rpx;
				}
			}
			.more {
				margin: 0rpx 14rpx;
				color: #656d68;
				

				text {
					color: #000;
					padding-left: 20rpx;
					font-size: 29rpx;
				}
			}
			.host{
				height:80rpx;
				line-height: 80rpx;
				padding:25rpx 25rpx 0 25rpx;
				img{
					width:60rpx;
					height:60rpx;
					border-radius: 50%;
					vertical-align: middle;
					margin-right: 20rpx;
				}
				.time{
					float:right;
					font-size: 28rpx;
					line-height: 80rpx;
				}
			}
			.desc {
				margin: 12rpx;
				padding: 15rpx 35rpx 80rpx 35rpx;
				font-size: 30rpx;
				background-color: #f3f3f3;
				border-radius: 10rpx;
			}


		}

		//底部栏
		.bottom-bar {
			background-color: #fff;
			height: 120rpx;
			width: 100vw;
			position: absolute;
			bottom: 0;
			line-height: 80rpx;
			padding: 30rpx 0;
			border-radius: 30rpx 30rpx 0 0;
			box-shadow: -1rpx -1rpx 25rpx 5rpx rgba(0,0,0,0.1);
		
			.ask {
				color: #fff;
				font-weight: bold;
				// border: 2rpx solid @bgcolor;
				background-color: @red;
				box-shadow: 1px 1px 2px #d5d5d5;
				border-radius: 20rpx;
				width:200rpx;
				text-align: center;
				float: right;
				margin-right: 20rpx;
				padding: 5rpx 10rpx;
			}
		}
	}
</style>
