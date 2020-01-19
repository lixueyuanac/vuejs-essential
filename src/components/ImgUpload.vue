<template>
	<div ref="buttonName">
		<div class="upload-btn">
			<input type="file" style="display: none" accept="image/*" :capture="camera" ref="inputNode" @change="handlerChange($event)">
			<slot></slot>
		</div>
	</div>
</template>
<script>

export default{
  name: 'ImgUpload',
	props: {
		// text: {
		// 	type: String,
		// 	default: '上传图片'
		// },
		sync: {
			type: [String, Number],
			default: 0
		},
		camera: {
			type: [String, Boolean],
			default: false
		},
		noFile: {
			type: [String],
			default: '0'
		},
		config: {
			type: [Object],
			default: function(){
				return {}
			}
		}
	},
	methods: {
		async handlerChange (ev) {
			const _this = this,
				canvas = document.createElement('canvas'),
				context = canvas.getContext('2d')
			let file = ev.target.files[0]
			if (!ev.target.files[0]) return
			const reader = new FileReader(),
				img = new Image()
			reader.readAsDataURL(file)
			reader.onload = function (e) {
				img.src = e.target.result
			}
			img.onload = function () {
				// 图片原始尺寸
				let originWidth = this.width,
					originHeight = this.height,
					// 最大尺寸限制
					maxWidth = _this._config.maxWidth, maxHeight = _this._config.maxHeight,
					// 目标尺寸
					targetWidth = originWidth, targetHeight = originHeight,
					// 缩略图大小
					tempWidth = 100, tempHeight = 100
				// 图片尺寸超过限制
				if (originWidth > maxWidth || originHeight > maxHeight) {
					if (originWidth / originHeight > maxWidth / maxHeight) {
						// 更宽，按照宽度限定尺寸
						targetWidth = maxWidth
						targetHeight = Math.round(maxWidth * (originHeight / originWidth))
					} else {
						targetHeight = maxHeight
						targetWidth = Math.round(maxHeight * (originWidth / originHeight))
					}
				}
				// 缩略图压缩
				if(_this._config.temp){
					if (originWidth > originHeight){
						tempWidth = 100
						tempHeight = Math.round(100 * (originHeight / originWidth))
					}else{
						tempHeight = 100
						tempWidth = Math.round(100 * (originWidth / originHeight))
					}
				}
				// canvas对图片进行缩放
				canvas.width = targetWidth
				canvas.height = targetHeight
				context.clearRect(0, 0, targetWidth, targetHeight)// 清除画布
				context.drawImage(img, 0, 0, targetWidth, targetHeight)// 图片压缩
				let img64 = canvas.toDataURL(file.type, _this._config.quality)
				let temp = null
				if(_this._config.temp){
					// console.log(originWidth , originHeight,tempWidth,tempHeight)
					canvas.width = tempWidth
					canvas.height = tempHeight
					context.clearRect(0, 0, tempWidth, tempHeight)// 清除画布
					context.drawImage(img, 0, 0, tempWidth, tempHeight)// 图片压缩
					temp = canvas.toDataURL(file.type, 0.5)
				}
				_this.$emit('uploadImg', {
					img: img64,
					temp,
					w: targetWidth,
					h: targetHeight,
				})
				_this.sync == 1 && (ev.target.value = '')
			}
		}
	},
	mounted () {
		this._config = Object.assign({
			maxWidth: 750,
			maxHeight: 750,
			temp: false, // 是否输出缩略图 100x100 0.5质量
			quality: 0.92, // canvas默认输出图片质量
		}, this.config)
		const _this = this,
			btnNode = this.$refs.buttonName,
			inputNode = this.$refs.inputNode
		btnNode.addEventListener('click', function (e) { // 模拟input点击事件
			if (_this.noFile == 0) {
				setTimeout(() => {
					var evt = new MouseEvent('click', {
						bubbles: false,
						cancelable: true,
						view: window
					})
					inputNode.dispatchEvent(evt)
				}, 100)
			}
		}, false)
	},
	watch:{
		config(v){
			this._config = Object.assign({
				maxWidth: 750,
				maxHeight: 750,
				temp: false, // 是否输出缩略图 100x100 0.5质量
				quality: 0.92, // canvas默认输出图片质量
			}, v)
		}
	}
}
</script>
<style scoped>
	input {
			height:100%;
			opacity:0;
		}
</style>
