<template>
	<view class="mypub-container">
		<view v-if="!myPublish.length" class="nomsg">暂无发布房源</view>
		<view class="house-item" v-for="(item, index) in myPublish" 
		:key=index @click='toDetail(index)'>
			<img :src="host+item.img[0]" class="img" />
			<view class="info">
				<text class="house-title">
					<text class="method">{{item.method}}</text>|&nbsp;{{item.title}}
				</text>
				<text class="desc">{{item.desc}}</text>
				<view class="option-list">
					<text class="option-item" 
					v-for="it in item.other" 
					:key=it>{{it}}</text>
				</view>
				<text class="price">￥{{item.price}}/月</text>
				<text class="time">{{item.time}}发布</text>
			</view>
		</view>
	</view>

</template>

<script>
	import request from "../../utils/request.js"
	import host from "../../utils/host.js"
	export default {
		data() {
			return {
				host:host,
				myPublish: []
			}
		},
		onLoad() {
			if(!getApp().globalData.login){
				uni.navigateTo({url:"../../pages/Login/Login"})}
			this.getMyPublish()
		},
		methods: {
			async getMyPublish() {
				//发请求获取我的发布房源列表
				let houseArr = await request("/mypublish", "GET")
				this.myPublish = houseArr
			},
			toDetail(index) {
				uni.navigateTo({
					url: "../Detail/Detail?hinfo="+JSON.stringify(this.myPublish[index])
				})
			}
		}}
</script>

<style lang="less">
	@import "../../static/css/variable.less";

	.mypub-container {
		
		.nomsg{
			width:750rpx;
			text-align: center;
			margin:100rpx 0;
			
		}
		//房子信息
		.house-item {
			width: 650rpx;
			// background-color: @bgcolor;
			display: flex;
			justify-content: space-between;
			padding: 20rpx 15rpx;
			margin: 0 auto;
			border: 2rpx solid @bgcolor;


			.img {
				width: 250rpx;
				height: 190rpx;
				border-radius: 20rpx;
			}

			.info {
				width: 400rpx;
				padding-left: 10rpx;

				.house-title {
					display: block;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;

					.method {
						font-weight: bold;
						color: @color;
						margin-right: 8rpx;
					}
				}

				.desc {
					font-size: 28rpx;
					color: #6d6d6d;
					margin: 10rpx 0;
					display: block;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
				}

				.option-list {
					margin: 8rpx 0;

					.option-item {
						border: 2rpx solid @color;
						border-radius: 15rpx;
						padding: 3rpx 5rpx;
						margin: 0 5rpx;
						font-size: 26rpx;

					}
				}

				.price {
					display: inline-block;
					margin-top: 10rpx;
					font-weight: bold;
					font-size: 34rpx;
					color: @red;

				}

				.time {
					float: right;
					font-size: 26rpx;
					margin-top: 20rpx;
				}
			}
		}
	}
</style>
