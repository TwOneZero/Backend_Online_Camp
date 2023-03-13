
import { checkValidationPhone, sendToSMS, getToken } from './phone.js';

const createTokenOfPhone = (pnum, tokenLength = 6) => {
  if (checkValidationPhone(pnum)) {
    sendToSMS(pnum, getToken(tokenLength));
  }
};

createTokenOfPhone('01012345678');