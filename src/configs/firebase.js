import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDaBLp_4Hqtl10n7D1RX-fgtOxGI7UZbDU",
  authDomain: "crmproject-2bfd3.firebaseapp.com",
  projectId: "crmproject-2bfd3",
  storageBucket: "crmproject-2bfd3.firebasestorage.app",
  messagingSenderId: "989937110123",
  appId: "1:989937110123:web:48f809a6b94944e522f52e",
  measurementId: "G-DHP4C2NZZM"
};

// ✅ Khởi tạo Firebase App chỉ một lần
const app = initializeApp(firebaseConfig);

// ✅ Xuất các module cần thiết
const storage = getStorage(app);
const db = getFirestore(app);

export { app, storage, db };