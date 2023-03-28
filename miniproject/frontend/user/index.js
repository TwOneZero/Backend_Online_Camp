const openMenu = () => {
  let wrapper = document.getElementById('Wrapper')
  let menu = document.getElementById('Menu_Background')
  let button = document.getElementById('Open_Menu_Btn')
  let closeButton = document.getElementById('CloseBtn')
  let naviWrapper = document.getElementById('Navi_Wrapper')
  let titleWrapper = document.getElementById('Title_Wrapper')
  // wrapper.style.height = "1700px";
  wrapper.style.backgroundImage = 'url()'
  wrapper.style.backgroundColor = 'rgba(0,0,0,0.9)'
  button.style.display = 'none'
  menu.style.display = 'flex'
  closeButton.style.display = 'flex'
  naviWrapper.style.display = 'none'
  titleWrapper.style.display = 'none'

  // 회원 목록 조회 API 요청
  getUser()
}
const closeMenu = () => {
  let wrapper = document.getElementById('Wrapper')
  let menu = document.getElementById('Menu_Background')
  let button = document.getElementById('Open_Menu_Btn')
  let closeButton = document.getElementById('CloseBtn')
  let naviWrapper = document.getElementById('Navi_Wrapper')
  let titleWrapper = document.getElementById('Title_Wrapper')
  let userDataWrapper = document.querySelector('#User_Data_Wrapper')
  wrapper.style.height = ''
  wrapper.style.backgroundImage = 'url(../img/user-back-ground.jpg)'
  wrapper.style.backgroundColor = 'rgba(0,0,0,0.2)'
  wrapper.style.backgroundPosition = 'center'
  button.style.display = 'flex'
  menu.style.display = 'none'
  closeButton.style.display = 'none'
  naviWrapper.style.display = 'flex'
  titleWrapper.style.display = 'block'
  while (userDataWrapper.firstChild) {
    userDataWrapper.removeChild(userDataWrapper.firstChild)
  }
}
