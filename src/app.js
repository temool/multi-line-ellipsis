console.log('app start')
import mutltlineEllipis from './index'

const box = document.getElementById('box')
const btn = document.getElementById('btn')
const removeBtn = document.getElementById('removeBtn')
let str = box.innerHTML
let addStr = '<a href="#">我是添加的文字</a>'

mutltlineEllipis({
  container: box,
  str,
  insertHTML: {
    tag: 'p',
    text: '...查看详情',
    className: 'btn'
  },
  show: true,
  hide: true,
  callback: function (isCutted) {
    console.log('是否省略：' + isCutted)
  }
})

btn.onclick = function (ev) {
  const dateType = btn.getAttribute('data-type')

  if (dateType === 'add')  {
    str = addStr + str
    btn.setAttribute('data-type', 'remove')
    btn.innerHTML = '删除文字'
  } else {
    str = str.slice(addStr.length)
    btn.setAttribute('data-type', 'add')
    btn.innerHTML = '添加文字'
  }
  mutltlineEllipis({
    container: box,
    str,
    insertHTML: {
      tag: 'p',
      text: '...查看详情',
      className: 'btn'
    },
    show: true,
    hide: true,
    callback: function (isCutted) {
      console.log('是否省略：' + isCutted)
    }
  })
}
