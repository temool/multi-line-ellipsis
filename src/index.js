/**
 * 单行、多行文本溢出，后面显示省略号或特殊文本
 * 
 * @param {any} { container, maxLine = 3, insertHTML = {tag: 'a', text: '', className: ''}, show = false, hide = false, callback } 
 */
function mutltlineEllipis ({ container, str, maxLine = 1, insertHTML = {tag: 'a', text: '', className: ''}, show = false, hide = false, callback }) {
  container.innerHTML = `<span class="origin-text">${str}</span>`
  var offsetHeight = container.offsetHeight
  var paddingTop = parseFloat(getComputedStyle(container)['padding-top'])
  var paddingBottom = parseFloat(getComputedStyle(container)['padding-bottom'])
  var borderTop = parseFloat(getComputedStyle(container)['border-top-width'])
  var borderBottom = parseFloat(getComputedStyle(container)['border-bottom-width'])

  var lineHeight = parseFloat(getComputedStyle(container)['line-height'])
  var isOverflow = false
  var isCutted = false
  var height = offsetHeight - paddingTop - paddingBottom + borderTop + borderBottom
  // 判断高度是否超出
  if (height > maxLine * lineHeight) {
    isOverflow = true
  } else {
    isOverflow = false
  }
  console.log('需要处理吗：' + isOverflow)

  if (isOverflow) {
    container.innerHTML = `<span class="origin-text">${str}</span>`
    const originText = container.innerHTML
    container.innerHTML += `<${insertHTML.tag} href="#" class="insert-node ${insertHTML.className}">${insertHTML.text}</${insertHTML.tag}>`
    const insertNode = container.querySelector('.insert-node')
    insertNode.style.display = 'inline'
    insertNode.style.padding = 0
    cut()
    // 展开、关闭
    container.onclick = function (e) {
      const insertNode = container.querySelector('.insert-node')
      const originTextNode = container.querySelector('.origin-text')
      if (e.target === insertNode) {
        if (show) {
          if (isCutted) {
            if (hide) {
              insertNode.innerHTML = '收起'
            } else {
              insertNode.remove()
            }
            originTextNode.innerHTML = originText
            isCutted = false

            callback(false)
          } else {
            insertNode.innerHTML = insertHTML.text
            cut()

            callback(true)
          }
        }
      }
    }
  }
  // 裁剪文字
  function cut () {
    while (container.offsetHeight - paddingTop - paddingBottom - borderTop - borderBottom > maxLine * lineHeight) {
      const originText = container.querySelector('.origin-text')
      const last = findLastNode(originText)
      let str = last.innerHTML || last.nodeValue
      if (!str) {
        last.remove()
      } else {
        if (last.nodeType === 3) {
          last.nodeValue = str.slice(0, str.length - 1)
        } else {
          last.innerHTML = str.slice(0, str.length - 1)
        }
      }
    }
    console.log('处理完毕')
    isCutted = true
  }
  // 找到最后一个 node
  function findLastNode (node) {
    let childNodes = node.childNodes
    let lastNode = childNodes[childNodes.length - 1]
    if (childNodes.length === 0) {
      return null
    } else {
      while (lastNode.childNodes.length > 0) {
        lastNode = lastNode.childNodes[lastNode.childNodes.length - 1]
      }
      return lastNode
    }
  }
}
window.mutltlineEllipis = mutltlineEllipis
export default mutltlineEllipis
