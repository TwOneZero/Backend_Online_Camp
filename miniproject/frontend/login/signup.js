// 휴대폰 인증 토큰 전송하기
const getValidationNumber = async () => {
  document.querySelector('#ValidationInputWrapper').style.display = 'flex';
  //폰번호가져오기
  const phone2 = document.getElementById('PhoneNumber02').value;
  const phone3 = document.getElementById('PhoneNumber03').value;
  try {
    completePhone = '010'.concat(phone2, phone3);
    //로컬스토리지에 잠시 저장
    localStorage.setItem('pnum', completePhone);
    await axios.post('http://localhost:3000/token/phone', { phone: completePhone }).then((res) => {
      console.log(res)
    })
  } catch (error) {
    console.log(error);
  }
}

// 핸드폰 인증 완료 API 요청
const submitToken = async () => {
  const token = document.getElementById('TokenInput').value;
  //로컬스토리에서 폰번호 가져옴
  const phone = localStorage.getItem('pnum');
  try {
    await axios.patch('http://localhost:3000/token/phone', { phone, token }).then((res) => {
      console.log(res);
    })

  } catch (error) {
    console.log(error);
  }

}

// 회원 가입 API 요청
const submitSignup = async () => {
  try {
    //name, email, personal, prefer, pwd, phone 가져오기
    const name = document.getElementById('SignupName').value;
    const email = document.getElementById('SignupEmail').value;
    const prefer = document.getElementById('SignupPrefer').value;
    const pwd = document.getElementById('SignupPwd').value;
    const phone = localStorage.getItem('pnum');
    //주민등록번호 앞 뒤 모두 가져오기
    const personal_1 = document.getElementById('SignupPersonal1').value;
    const personal_2 = document.getElementById('SignupPersonal2').value;
    //온전한 주민등록번호 문자열로 만들기
    const personal = personal_1.concat('-', personal_2);
    await axios.post('http://localhost:3000/user', { name, email, prefer, pwd, phone, personal })
      .then((res) => {
        console.log(res);
      })

    //로컬스토리지에서 삭제
    localStorage.removeItem('pnum');
  } catch (error) {
    console.log(error);
  }
}
