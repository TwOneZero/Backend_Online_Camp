const OpenModal = () => {
  let ModalBackground = document.getElementById('ModalContainer')
  let Modal = document.getElementById('SignupModalWrapper')
  ModalBackground.style.display = 'flex'
  Modal.style.display = 'flex'
}
const CloseModal = () => {
  let ModalBackground = document.getElementById('ModalContainer')
  let Modal = document.getElementById('SignupModalWrapper')
  Modal.style.display = 'none'
  ModalBackground.style.display = 'none'
}
