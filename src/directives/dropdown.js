export default {
  bind(el, binding, vnode) {
    // 当前元素的事件处理器
    const handler = (e) => {
      // 当前点击的目标
      const target = e.target

      // 如果点击的是当前元素，或者是当前元素的后代节点，就不处理
      //if (target.isSameNode(el) || el.contains(target)) return
        // 如果是open并且是当前元素或者后代节点则不处理
      if (el.parentElement.className=== "open" && (target.isSameNode(el) || el.contains(target))) return
      // 找到当前元素的父元素，切换它的 open 类
      el.parentElement.classList.toggle('open')
    }

  // document 的事件处理器
    const documentHandler = (e) => {
      // 当前点击的目标
      const target = e.target
      // 如果点击的是当前元素，或者是当前元素的后代节点，就不处理
      if (target.isSameNode(el) || el.parentElement.contains(target)) return
      // 找到当前元素的父元素，移除 open 类
      el.parentElement.classList.remove('open')
    }

    el.addEventListener('mouseover', handler, false)
    document.addEventListener('mouseover', documentHandler, false)

    el.destroy = () => {
      el.removeEventListener('mouseout', handler, false)
      document.removeEventListener('mouseout', documentHandler, false)
      el.destroy = null
    }
  },
  unbind(el) {
    el.destroy()
  }
}
