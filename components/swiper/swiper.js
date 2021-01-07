let clientX = 0;
Component({
  mixins: [],
  data: {
    sId: 0,
    isSwipering: false,  // 是否正在划动中
  },
  props: {
    list: []
  },
  didMount() { },
  didUpdate() { },
  didUnmount() { },
  methods: {
    onTouchStart(e) {
      console.log('触摸动作开始', e.changedTouches[0].clientX)
      clientX = e.changedTouches[0].clientX
    },
    onTouchEnd(e) {
      console.log('触摸动作结束', e.changedTouches[0].clientX)
      const { sId, isSwipering } = this.data;
      // 获取到父组件传过来的 需要循环的轮播项
      const { list } = this.props
      // 获取到触摸结束时的x轴坐标值
      let endX = e.changedTouches[0].clientX;
      // 计算触摸开始和触摸结束的坐标差值
      let dValue = Math.abs(endX - clientX);
      // 防抖动
      if (isSwipering) {
        console.error("您操作的太快了")
        return my.showToast({
          content: "亲，您操作的太快了!",
          duration: 3000,
        });
      }

      if (endX < clientX && dValue >= 30) {
        console.log('右滑')
        if (sId == list.length - 1) {
          return;
        }
        this.setData({
          sId: sId + 1,
          isSwipering: true
        })
      } else if (endX > clientX && dValue >= 30) {
        console.log("左滑");
        if (sId == 0) return;
        this.setData({
          sId: sId - 1,
          isSwipering: true
        })
      } else {
        return;
      }
      setTimeout(() => {
        this.setData({
          isSwipering: false
        })
      }, 300)
    },
  },
});
