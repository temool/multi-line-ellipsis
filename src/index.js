console.log('这是插件的js')
/**
 * 
 * 
 * @export
 * @param {any} box 
 */
function mutltlineEllipis ({ box, maxLine = 1, inserString = '' }) {
  var height = box.offsetHeight
  var lineHeight = parseFloat(getComputedStyle(box)['line-height'])
  var isOverflow = false
  // 只有行数 >= 2 时，才需要处理
  if (height > maxLine * lineHeight) {
    isOverflow = true
  } else {
    isOverflow = false
  }
  console.log('需要处理吗：' + isOverflow)

  var cut = function cut () {
    if (box.offsetHeight > maxLine * lineHeight) {
      const originText = box.querySelector('.origin-text')
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
      cut()
    } else {
      console.log('处理完毕')
    }
  }
  if (isOverflow) {
    box.innerHTML = `<span class="origin-text">${box.innerHTML}</span>`
    box.innerHTML += `<span class="insert-node">${inserString}</span>`
    if (box.offsetHeight >= maxLine * lineHeight) {
      console.log(box.querySelector('.origin-text').childNodes)
      console.log(findLastNode(box.querySelector('.origin-text')))
      cut()
    }
  }
  console.log('需要处理吗：' + isOverflow)
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
