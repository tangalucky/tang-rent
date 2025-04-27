<template>
	<view class="filter-container">
		<!-- 区域选择 -->
		<view class="block" v-if="value==1">
			<label><view class="key">按区域筛选</view>
				<picker @change="bindAreaChange" :value="houseInfo.areaIndex" 
				:range="areas" range-key="area">
					 <view class="uni-input">
						 <text>区：</text>
						 <text>{{areas[houseInfo.areaIndex].area}}</text>
					 </view>
				</picker>
				<picker @change="bindTownChange" :value="houseInfo.townIndex" 
				:range="townsOfArea[houseInfo.areaIndex].towns" range-key="town">
					 <view class="uni-input">
						 <text>街道/镇：</text>
						 <text>{{townsOfArea[houseInfo.areaIndex].towns[houseInfo.townIndex].town}}</text>
					 </view>
				</picker>
			</label>
		</view>
		
		<!-- 地铁选择 -->
			<view class="block" v-if="value==2"><label><view class="key">按地铁筛选</view>
				<picker @change="bindSubChange" :value="houseInfo.subIndex" 
				:range="subways" range-key="subway">
					 <view class="uni-input">
						 <text>地铁线路：</text>
						 <text>{{subways[houseInfo.subIndex].subway}}</text>
					 </view>
				</picker>
				<picker @change="bindStaChange" :value="houseInfo.staIndex" 
				:range="stationsOfSubway[houseInfo.subIndex].stations" range-key="station">
					 <view class="uni-input">
						 <text>站点：</text>
						 <text>{{stationsOfSubway[houseInfo.subIndex].stations[houseInfo.staIndex].station}}</text>
					 </view>
				</picker>
			</label></view>	
		<!-- 底部栏 -->
		<view class="bottom-bar">
			<view class="cancel" @click="cancel">取&nbsp;消</view>
			<view class="confirm" @click="confirm">确认筛选</view>
		</view>
	</view>
</template>

<script>
	import {areas,townsOfArea,subways,stationsOfSubway} from "../../utils/area.js"
	export default {
		name:"Filter",
		props:{value:{
			default:0
		}},
		emits:["input"],
		data() {
			return {
				areas: areas,
				townsOfArea:townsOfArea,
				subways:subways,
				stationsOfSubway:stationsOfSubway,
				houseInfo: {
					areaIndex: -1,
					townIndex:-1,
					subIndex:-1,
					staIndex:-1,}
			};
		},
		methods:{
			cancel(){this.$emit("input",0)},
			confirm(){
				const {areaIndex,townIndex,subIndex,staIndex}=this.houseInfo
				var obj={}
				if(areaIndex>=0){
					if(townIndex>=0){obj.townIndex=townIndex}
					obj.areaIndex=areaIndex}
				if(subIndex>=0){
					if(staIndex>=0){obj.staIndex=staIndex}
					obj.subIndex=subIndex}
				this.$emit("filterH",obj)
				this.$emit("input",0)},
			bindAreaChange: function(e) {
			            this.houseInfo.areaIndex = e.detail.value
			},
			bindTownChange: function(e) {
			            this.houseInfo.townIndex = e.detail.value
			},
			bindSubChange: function(e) {
			            this.houseInfo.subIndex = e.detail.value
			},
			bindStaChange: function(e) {
			            this.houseInfo.staIndex = e.detail.value
			},
		},
		
	}
</script>

<style lang="less" scoped>
	@import "../../static/css/variable.less";
	.filter-container{
		position:absolute;
		top:0;
		left:0;
		width:100vw;
		height:100vh;
		background-color: white;
		z-index:1000;
		
		.block {
			padding: 10rpx 10rpx;
			margin: 14rpx 12rpx;
			.key {
				color: #000;
				font-weight: bold;
				margin-bottom: 8rpx;
			}
		//区域选择
		picker{
			//border:1px solid @color;
			width: 280rpx;
			height: 70rpx;
			margin:10rpx;
			line-height: 70rpx;
			color: #5a5a5a;
			padding-left: 10rpx;
			display: inline-block;
			background-color: #f5f5f5;
			border-radius: 30rpx;
			padding: 10rpx 20rpx;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}}
		
		//底部栏
		.bottom-bar {		
			width: 100vw;
			position: absolute;
			bottom: 100rpx;
			display: flex;
			justify-content: space-around;
			.cancel{
				color: dimgrey;
				font-weight: bold;
				border: 2rpx solid dimgrey;
				border-radius: 20rpx;
				height:96rpx;
				width:150rpx;
				text-align: center;
				line-height:100rpx;
				padding:0 30rpx;
			}
			.confirm {
				color: #fff;
				font-weight: bold;
				//border: 2rpx solid @bgcolor;
				background-color: @red;
				border-radius: 20rpx;
				height:100rpx;
				width:400rpx;
				text-align: center;
				line-height:100rpx;
				padding:0 30rpx;
			}
		}
	}
</style>