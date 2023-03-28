// 회원 목록 조회 API를 요청해주세요.
const getUser = async () => {
  try {
    const users = await axios.get('http://localhost:3000/user').then((res) => {
      console.log('user 조회 성공\n', res);

      for (let i = 0; i < res.data.length; i++) {
        createUserDiv(res.data[i]);
      }
    })
    // 받은 데이터로 createUserDiv함수를 이용해
    // 목록 화면을 완성해주세요.
  } catch (error) {
    console.log(error);
  }

}

const createUserDiv = (data) => {
  const userTableItem = document.createElement('div')
  userTableItem.className = 'User_Table_Item'

  // user
  const nameItem = document.createElement('div')
  nameItem.className = 'Item_Info'
  nameItem.textContent = data?.name || '홍길동'

  const emailItem = document.createElement('div')
  emailItem.className = 'Item_Info'
  emailItem.textContent = data?.email || 'abc@gmail.com'

  const personalItem = document.createElement('div')
  personalItem.className = 'Item_Info'
  personalItem.textContent = data?.personal || '220111-*******'

  const phoneItem = document.createElement('div')
  phoneItem.className = 'Item_Info'
  phoneItem.textContent = data?.phone || '010-1234-5678'

  const preferItem = document.createElement('div')
  preferItem.className = 'Item_Info'
  preferItem.textContent = data?.prefer || 'https://codebootcamp.co.kr'

  // og
  const userTableSubItem = document.createElement('div')
  userTableSubItem.className = 'User_Table_Item'

  const ogImgItem = document.createElement('img')
  ogImgItem.className = 'Og_Img_Info'
  ogImgItem.src =
    data?.og?.image || 'https://codebootcamp.co.kr/images/meta/main-thumb.png'

  const ogTitleItem = document.createElement('div')
  ogTitleItem.className = 'Og_Item_Title'
  ogTitleItem.textContent = data?.og?.title || '코드캠프'

  const ogDescItem = document.createElement('div')
  ogDescItem.className = 'Og_Item_Info'
  ogDescItem.textContent =
    data?.og?.description ||
    '개발회사에서 만든 실무 코딩 부트캠프 || 개발자로 커리어점프 하다.'

  // 합체
  const menuBack = document.querySelector('#User_Data_Wrapper')
  menuBack.appendChild(userTableItem)
  menuBack.appendChild(userTableSubItem)
  userTableItem.appendChild(nameItem)
  userTableItem.appendChild(emailItem)
  userTableItem.appendChild(personalItem)
  userTableItem.appendChild(phoneItem)
  userTableItem.appendChild(preferItem)
  userTableSubItem.appendChild(ogImgItem)
  userTableSubItem.appendChild(ogTitleItem)
  userTableSubItem.appendChild(ogDescItem)
}
