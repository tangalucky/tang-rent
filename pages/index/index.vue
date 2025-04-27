<template>
	<view class="index-container">
		<!-- 顶部栏 -->
		<TopBar />
		<!-- 条件筛选栏 -->
		<view class="option-bar">
			<button class="mini-btn dropdown" type="default" 
			size="mini" @click="changeFilter(1)">区域
				<uni-icons type="down" size="10"></uni-icons>
			</button>
			<button class="mini-btn dropdown" type="default" 
			size="mini" @click="changeFilter(2)">地铁
				<uni-icons type="down" size="10"></uni-icons>
			</button>
			<button class="mini-btn dropdown reset" type="default" 
			size="mini" @click="reload">
				<uni-icons type="refreshempty" size="15"></uni-icons>重置筛选条件
			</button>
		</view>
		
		<!-- 过滤组件 -->
		<Filter v-model="filterFlag" @filterH="filterH" v-if="filterFlag>0" />
		
		<!-- 房子列表 -->
		<scroll-view class="house-container" lower-threshold="60" 
		@scrolltolower="scrolltolower" scroll-y>
			<view class="house-item" v-for="(item,index) in houseList" :key="item.id" 
			@click="toDetail(item.id)">
				<view class="house-item-top">
					<img :src="host+item.avatar" alt="" class="avatar" />
					<view class="owner">{{item.name || '用户'}}</view>
					<view class="option-list">
						<text v-if="item.direct==='南'" class="option-item">朝{{item.direct}}</text>
						<text class="option-item" v-for="it in item.condition" :key=it>{{it}}</text>
					</view>	
				</view>
				<view class="house-item-bottom">
					<img :src="host+item.img[0]" alt="" class="img">
					<view class="info">
						<text class="house-title">
							<text class="method">{{item.method}}</text>&nbsp;{{item.title}}</text>
							
						<text class="desc">{{item.location}}</text>
						<text class="desc subdesc">{{item.desc}}</text>
						
						<text class="price">￥{{item.price}}/月</text><text class="time">{{item.time}}</text>
					</view>
				</view>
				
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {mapState} from "vuex"
	import Filter from "../../components/Filter/Filter.vue"
	import host from "../../utils/host.js"
	import throttle from "lodash/throttle"
	export default {
		data() {
			return {
				host:host,
				filterFlag:0,
				scrollFlag:10,
				indexflag:0
			}
		},
		onLoad() {
			this.$store.dispatch("gethouse",10)
		},
		computed:{houseList:{get(){return this.$store.state.houseList}}},
		// watch:{houseL:{handler(newVal,oldVal){
		// 	this.houseList=newVal
		// }}},
		methods: {
			scrolltolower:throttle(function(){ //函数节流减少触底的函数触发
				this.scrollFlag+=10
				this.$store.dispatch("gethouse",this.scrollFlag)
			},3000,{leading:true,trailing:false}),
			toDetail(id){
				var index=this.houseList.findIndex(item=>item.id==id)
				uni.navigateTo({
					url:"../Detail/Detail?hindex="+index
				})
			},
			changeFilter(flag){
				this.filterFlag=flag
			},
			filterH(obj){
				if(obj.areaIndex){
					if(obj.townIndex){this.$store.state.houseList=this.houseList.filter(function(item,index){return item.areaIndex==obj.areaIndex}).filter(function(item,index){return item.townIndex==obj.townIndex})}
					else{this.$store.state.houseList=this.houseList.filter(function(item,index){return item.areaIndex==obj.areaIndex})}
					}
				if(obj.subIndex){
					if(obj.staIndex)this.$store.state.houseList=this.houseList.filter(function(item,index){return item.subIndex==obj.subIndex}).filter(function(item,index){return item.staIndex==obj.staIndex})
					else{this.$store.state.houseList=this.houseList.filter(function(item,index){return item.subIndex==obj.subIndex})}
					}
			},
			reload(){
				uni.reLaunch({
					url: '../index/index'
				});
			}
			
		},
		components:{Filter}
	}
</script>

<style lang="less" scoped>
	@import "../../static/css/variable.less";

	.index-container {
		box-sizing: border-box;
		padding: 10rpx;
		height:100vh;
		overflow: hidden;
		//background-color: #f9f9f9;

		// 条件筛选栏
		.option-bar {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin: 10rpx 8rpx 2rpx 8rpx;
			height:60rpx;
			font-size: 28rpx;
			//background-color: #f9f9f9;
			color:#444e44;
			.dropdown{
				background-color: #fff;
				// color: #636363;
				// border-radius: 30rpx;
				padding: 0rpx 20rpx;
				margin: 0 0rpx;
			}
			.dropdown.reset{
				font-size:26rpx;
			}
			.dropdown::after{
				border:none;
			}
			.dropdown uni-icons{
				margin-left: 10rpx;
			}
			.iconfont {
				color: @color;
				margin: 0 8rpx;
			}
		}

		// 房子列表样式
		.house-container {
			//margin-top: 30rpx;
			height:calc(100vh - 136rpx);
			background: #f5f5f5;
			.house-item {
				// background-color: #fff;
				
				padding: 20rpx 0rpx;
				margin: 14rpx 0;
				border-radius: 10rpx;
				background: linear-gradient(to top right, #fff,#fff,#fff, #fef5e1);
				.house-item-top{
					display: flex;
					align-items: center;
					margin-bottom: 18rpx;
					.avatar{
						width: 80rpx;
						height: 80rpx;
						border-radius: 10rpx;
						margin-right: 18rpx;
					}
					.owner{
						color:#444;
						font-size: 28rpx;
					}
					.option-list {
						margin: 15rpx 0;
						margin-left: auto;
						.option-item {
							border: 1rpx solid #7e7e7e;
							// background-color: #f5f5f5;
							color: #636363;
							// border-radius: 15rpx;
							padding: 3rpx 10rpx;
							margin: 0 5rpx;
							font-size: 26rpx;
					
						}
					}
				}
				.house-item-bottom{
					display: flex;
					justify-content: space-between;
					.img {
					width: 320rpx;
					height: 250rpx;
					// border-radius: 25rpx;
					}

					.info {
						width: 400rpx;
						padding-left: 15rpx;

						.house-title {
							display: block;
							height: 90rpx;
							overflow: hidden;
							text-overflow: ellipsis;
							font-weight:bold;
							display: -webkit-box;
							-webkit-line-clamp: 2;
							-webkit-box-orient:vertical;
							
							.method {
								font-weight: bold;
								//color:@color;
								font-size: 28rpx;
								margin-right: 8rpx;
							}
						}

						.desc {
							font-size: 28rpx;
							// color:#454545;
							color:#000;
							margin: 10rpx 0;
							display: block;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
							padding-left:10rpx;
							
						}
						.subdesc{
							color:#7e7e7e;
							height:32rpx;
				
						}


						.price {
							display: inline-block;
							margin-top: 8rpx;
							// font-weight: bold;
							font-size: 32rpx;
							color:#ce2e38;

						}

						.time {
							float: right;
							font-size: 23rpx;
							margin-top: 20rpx;
						}
					}
				}
				
			}
		}

	}
</style>
