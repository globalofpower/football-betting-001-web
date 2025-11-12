import CryptoJS from "crypto-js";

export const encodeAuth = (auth:any) => {
    const deText = CryptoJS.AES.encrypt(
        JSON.stringify(auth),
        import.meta.env.VITE_REACT_APP_SECRET_KEY
    ).toString();
    return deText;
};

export const decodeAuth = (auth:any) => {
  if (auth) {
    try {
      const bytes = CryptoJS.AES.decrypt(
        auth,
        import.meta.env.VITE_REACT_APP_SECRET_KEY
      );
      const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      return decryptedData;
    } catch (err:any) {
        return console.error(err.message);
    }
  }
};

export const encodeTransferInfo = (data:any) => {
  const obj:any = {
    transfer_info: encodeAuth(data)
  };
  return obj
};

export const decodeTransferInfo = (encodeData:any) => {
  return decodeAuth(encodeData?.result);
};