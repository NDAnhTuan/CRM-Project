
import { getDocs, collection, doc, getDoc, updateDoc, addDoc  } from "firebase/firestore";
import { db } from "../../configs/firebase";

export const fetchUsers = async () => {
  const querySnapshot = await getDocs(collection(db, "customers"));
  const data = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return data;
};

export const fetchUser = async (id) => {
  try {
    const docRef = doc(db, "customers", id); // Tham chiếu đến document
    const docSnap = await getDoc(docRef); // Lấy dữ liệu từ Firestore

    if (docSnap.exists()) {
      console.log("User Data:", docSnap.data());
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

export const updateUser = async (id, updatedData) => {
  try {
    const docRef = doc(db, "customers", id); // Tham chiếu đến document cần update
    await updateDoc(docRef, updatedData); // Cập nhật dữ liệu
    console.log("User updated successfully!");
  } catch (error) {
    console.error("Error updating user:", error);
  }
};

export const addUser = async (userData) => {
  try {
    const docRef = await addDoc(collection(db, "customers"), userData);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};