<template>
	<view class="top">
		<text class="port"><text class="iconfont icon-zhandian"></text>上海</text>
		<view class="title">糖糖租房</view>
		<!-- <text class="publish" @click="toPublish"><text class="iconfont icon-fabu"></text>我要发布</text> -->
		<button class="mini-btn publish" type="default" size="mini" @click="toPublish"><text class="iconfont icon-fabu"></text>我要发布</button>
	</view>
</template>

<script>
	export default {
		name:"TopBar",
		data() {
			return {
				
			};
		},
		methods:{
			toPublish(){
				uni.navigateTo({
					url:"../Publish/Publish"
				})
			}
		}
	}
</script>

<style lang="less">
	@import "../../static/css/variable.less";
	
		// 顶部栏样式
		.top {
			width: 730rpx;
			height: 80rpx;
			display: flex;
			justify-content: space-between;
			background-color: #fff;
			align-items: center;

			.port {
				font-size: 13px;
				text {
					 color: #909090;
					 font-size: 12px;
				}
			}
			.title{
				width: 250rpx;
				text-align: center;
				
			}
			.publish {
				padding: 0 20rpx;
				margin: 0 0rpx;
			
				text {
					color: @red;
					margin: 0 10rpx;
				}
			}
		}

</style>