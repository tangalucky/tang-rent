<template>
	<view class="publish-container">
		<!-- 内容可滚动区域 -->
		<scroll-view scroll-y class="scrollview">
			<!-- 提示语 -->
			<view class="tip">请填写您房子的信息，方便他人了解房子的具体情况</view>
			<view class="block">
				<label>
					<text class="key">标题<text>*</text></text>
					<input placeholder="请输入您的标题" v-model="houseInfo.title"/>
					
				</label>
			</view>
			<view class="block price">
				<label>
					<view class="key">租金
						<text>*</text>
					</view>
					<input placeholder=" xxx (元/月)" v-model="houseInfo.price"/>
				</label>
			</view>
			
			<!-- 区域选择 -->
			<view class="block"><label><view class="key">区域选择</view>
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
			</label></view>
			<!-- 地铁选择 -->
				<view class="block"><label><view class="key">附近地铁选择</view>
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
			<view class="block">
				<label>
					<text class="key">房屋位置
						<text>*</text>
					</text>
					<input placeholder="请输入具体位置 (如:枫桥路15弄兰花苑)" 
					v-model="houseInfo.location"/>
				</label>
			</view>
			<view class="block direct"><text class="key">朝向</text>
				<radio-group @change="directChange" class="option"> <label>
						<radio name="direct" value="南" />南
					</label>
					<label>
						<radio name="direct" value="北" />北
					</label>
				</radio-group>

			</view>
			<view class="block direct"><text class="key">出租方式</text>
				<radio-group @change="methodChange" class="option"> <label>
						<radio name="direct" value="整租" />整租
					</label>
					<label>
						<radio name="direct" value="合租" />合租
					</label>
				</radio-group>
			
			</view>
			<view class="block origin"><text class="key">房源</text>
				<radio-group @change="originChange" class="option"><label>
						<radio name="origin" value="个人房源" />个人房源
					</label>
					<label>
						<radio name="origin" value="转租" />转租
					</label>
					<label>
						<radio name="origin" value="中介" />中介
					</label>
					<label>
						<radio name="origin" value="其他" />其他
					</label>
				</radio-group>

			</view>

			<view class="block">
				<checkbox-group @change="conditionChange"><text class="key">其他条件</text>
					<view class="option"><label>
							<checkbox name="condition" value="独卫" />独卫
						</label>
						<label>
							<checkbox name="condition" value="有阳台" />有阳台
						</label>
						<label>
							<checkbox name="condition" value="电梯" />电梯
						</label>
					</view>

				</checkbox-group>
			</view>
			<view class="block"><view class="key">房屋图片<text>*</text></view>
			
			<view class="photo-add" v-if="houseInfo.img[0]" 
			v-for="item in houseInfo.img" :key="item">
				<img :src="host+item" alt=""></view>
			<view class="photo-add" @click="addPhoto">+</view>
			</view>
			<view class="block">
				<label>
					<text class="key">描述</text>
					<textarea placeholder="请补充更多详细信息" 
					v-model="houseInfo.desc"></textarea>
				</label>
			</view>
			
		</scroll-view>

		<!-- 底部选项 -->
		<view class="bottom-bar">
			<view class="ask" @click="publish">发布房源</view>
		</view>
	</view>
</template>

<script>
	import {areas,townsOfArea,subways,stationsOfSubway} from "../../utils/area.js"
	import request from "../../utils/request.js"
	import host from "../../utils/host.js"
	export default {
		onLoad() {
			if(!getApp().globalData.login){
				uni.navigateTo({url:"../../pages/Login/Login"})}
		},
		data() {
			return {
				//photoTempList:[],
				host:host,
				areas: areas,
				townsOfArea:townsOfArea,
				subways:subways,
				stationsOfSubway:stationsOfSubway,
				houseInfo: {
					id: 0,
					title: "",
					price: "",
					areaIndex: -1,
					townIndex:-1,
					subIndex:-1,
					staIndex:-1,
					location:"",
					method: "",
					direct:"",
					origin:"",
					condition:[],
					img: [],
					desc: "",
					time: "",
					userId:0,
					name:"",
					avatar:""
				}
			};
		},
		methods:{
			directChange(evt){
				this.houseInfo.direct=evt.detail.value
			},
			originChange(evt){
				this.houseInfo.origin=evt.detail.value
			},
			conditionChange(evt){
				this.houseInfo.condition=evt.detail.value
			},
			methodChange(evt){
				this.houseInfo.method=evt.detail.value
			},
			addPhoto(){
				
				let that=this
				
				uni.chooseMedia({
					sourceType: ['album','camera'], //从相册选择
					mediaType:["image"],
					success: function (res) {	
						//that.houseInfo.img=that.houseInfo.img.concat(res.tempFilePaths)
						//遍历图片上传获得路径存入houseInfo：that.houseInfo.img.push
						const fs = wx.getFileSystemManager()
						res.tempFiles.forEach(function(item,index){	
						wx.uploadFile({
						    url: host+"/image", 
						    filePath: item.tempFilePath,
						    name: 'file',
						    success (res){
						      var data = res.data
							 that.houseInfo.img.push(data)
							 
						  }})
						})}})},
			bindAreaChange: function(e) {
			            //console.log('picker发送选择改变，携带值为', e.detail.value)
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
			publish(){
				const houseInfo=this.houseInfo
				//表单校验（必填项目
				if(!houseInfo.title && !houseInfo.price && !houseInfo.img.length){
					uni.showToast({
						title: '请填写完整哦',
						duration: 2000,
						icon:"none"
					});
					return
				}
				// 生成房源id和发布时间，并获取用户id
				houseInfo.id=Date.now()
				var d=new Date()
				houseInfo.time=d.getFullYear()+"/"+(d.getMonth()+1)+"/"+d.getDate()
				
				uni.getStorage({
					key: 'userInfo',
					success: async function (res) {
						if (res.data) {
							if(res.data.avatar){
								houseInfo.avatar=res.data.avatar
							if(res.data.name){houseInfo.name=res.data.name}
						}
						//发送请求，携带房屋信息数据
						
						let result= await request("/publish","POST",{houseInfo:houseInfo})
						if(result){
							uni.showToast({
								title: '发布成功',
								duration: 1000
							});
						}
						setTimeout(function () {
							uni.reLaunch({
								url: '../index/index'
							});
						}, 1000);
					}
				}});	
			}
		}
	}
</script>

<style lang="less">
	@import "../../static/css/variable.less";

	.publish-container {
		.scrollview {
			height:calc(100vh - 152rpx);
			overflow: hidden;
			.tip {
				background-color: #fdffd7;
				font-size: 28rpx;
				line-height: 65rpx;
				height: 65rpx;
				width: 100vw;
				padding-left: 15rpx;
				color:#606060;
			}

			.block {
				padding: 10rpx 10rpx;
				margin: 14rpx 12rpx;

				.option label {
					margin-right: 18rpx;
				}

				input {
					background-color: #fafafa;
					//border-bottom: 1px solid aliceblue;
					width: 700rpx;
					height:75rpx;
					border-radius: 10rpx;
				}
				&.price input{
					width: 700rpx;
					display: inline-block;
				}
				textarea {
					//border: 1px solid aliceblue;
					background-color: #fafafa;
					border-radius: 10rpx;
					width: 700rpx;
					height: 240rpx;
					padding:10rpx;
					margin:10rpx 0 20rpx 0;

				}
				.key {
					// color: @color;
					font-weight: bold;
					margin: 8rpx 0;
					display:block;
					text{
						color:firebrick;
					}
				}
				//区域选择
				picker{
					//border:1px solid @color;
					width: 270rpx;
					height: 70rpx;
					margin:10rpx;
					line-height: 70rpx;
					color: #5a5a5a;
					padding-left: 10rpx;
					display: inline-block;
					background-color: #fafafa;
					border-radius: 10rpx;
					padding: 8rpx 20rpx;
					
				}
				//单选多选
				checkbox,radio{
					margin-left:10rpx;
				}
				// 图片添加
				.photo-add{
					display: inline-block;
					//border: 1px solid aliceblue;
					background-color: #f5f5f5;
					color:dimgrey;
					height:150rpx;
					width:150rpx;
					margin:10rpx 5rpx;
					line-height: 150rpx;
					text-align: center;
					font-size: 45rpx;
					overflow: hidden;
					img{
						height:148rpx;
						width:148rpx;}
				}
			}

		}
		
		//底部栏
		.bottom-bar {
			background-color: transparent;
			height: 120rpx;
			width: 100vw;
			position: absolute;
			bottom: 0;
			line-height: 80rpx;
			padding: 30rpx 0;
			border-radius: 30rpx 30rpx 0 0;
		
			.ask {
				color:#fff;
				font-weight: bold;
				// border: 2rpx solid @bgcolor;
				background-color: @red;
				box-shadow: 1px 1px 2px #d5d5d5;
				border-radius: 40rpx;
				width:690rpx;
				text-align: center;
				// float: right;
				margin: 10rpx auto;
				padding: 5rpx 10rpx;
			}
		}
	}
</style>
