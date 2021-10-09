import CryptoJs from "crypto-js";

export default {
  //#region crypto
  cryptoJs: {
    encryption_AES: (dataObj) => {
      return CryptoJs.AES.encrypt(
        JSON.stringify(dataObj),
        process.env.SECRET_KEY_AES
      ).toString();
    },
    decryption_AES: (dataObj) => {
      var bytes = CryptoJs.AES.decrypt(dataObj, process.env.SECRET_KEY_AES);
      return JSON.parse(bytes.toString(CryptoJs.enc.Utf8));
    },
    generateKey: (length = 128, wordArray = false) => {
      let random = CryptoJs.lib.WordArray.random(length / 8);
      return wordArray ? random : random.toString();
    },
  },
  //#endregion
};
