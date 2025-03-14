import { getDocs, collection, doc, getDoc, updateDoc, addDoc  } from "firebase/firestore";
import { db } from "../../configs/firebase";

// export const fetchAllProducts = async () => {
//     // const response = await fetch(`https://randomuser.me/api?${params}`);
//     const response = await fetch('https://fakestoreapi.com/products');
//     const data = await response.json();
//     return data;
// };
  export const fetchAllProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return data;
  }

export const fetchProduct = async (id) => {
  // // const response = await fetch(`https://randomuser.me/api?${params}`);
  // const response = await fetch(`https://fakestoreapi.com/products/${id}`);
  // const data = await response.json();
  // console.log(data)
  // return data;
  try {
    const docRef = doc(db, "products", id); // Tham chiếu đến document
    const docSnap = await getDoc(docRef); // Lấy dữ liệu từ Firestore

    if (docSnap.exists()) {
      console.log("Product Data:", docSnap.data());
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

export const updateProduct = async (id, updatedData) => {
  try {
    const docRef = doc(db, "products", id); // Tham chiếu đến document cần update
    await updateDoc(docRef, updatedData); // Cập nhật dữ liệu
    console.log("User updated successfully!");
  } catch (error) {
    console.error("Error updating user:", error);
  }
};

export const addProduct = async (userData) => {
  try {
    userData.image = "https://fakestoreapi.com/img//81fPKd-2AYL._AC_SL1500_.jpg";
    const docRef = await addDoc(collection(db, "products"), userData);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};