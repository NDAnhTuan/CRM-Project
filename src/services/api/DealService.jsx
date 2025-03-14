import { getDocs, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../configs/firebase";

export  const fetchDeals = async () => {
    try {
      // Lấy dữ liệu từ Firestore
      const dealsSnapshot = await getDocs(collection(db, "deals"));
      const deals = dealsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      // Lấy dữ liệu từ subcollection "products" cho từng đơn hàng
      const data = await Promise.all(
        deals.map(async (deal) => {
          const productsRef = collection(db, `deals/${deal.id}/products`);
          const productsSnapshot = await getDocs(productsRef);
          const products = productsSnapshot.docs.map((prod) => ({ id: prod.id, ...prod.data() }));
          return { ...deal, products };
        })
      );
      return data;
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu từ Firestore: ", error);
    }
  };

  
export const addDeal = async ({selectedUser, selectedProducts}) => {
    console.log(selectedUser)
  try {
    // Tạo một deal mới trong collection "deals"
    const dealRef = await addDoc(collection(db, "deals"), {
      name: selectedUser.name,
      email: selectedUser.email,
      phone: selectedUser.phone,
      userId: selectedUser.id,
      orderDate: serverTimestamp(), // Ghi lại thời gian hiện tại
    });

    console.log("Deal created with ID: ", dealRef.id);

    // Lưu danh sách sản phẩm vào subcollection "products"
  const productsCollectionRef = collection(db, `deals/${dealRef.id}/products`);
  const productPromises = selectedProducts.map((product) =>
    addDoc(productsCollectionRef, {
      title: product.title,
      price: product.price,
      quantity: product.quantity,
    })
  );
    await Promise.all(productPromises); // Đợi tất cả sản phẩm được thêm vào
    console.log("Products added successfully!");
    return dealRef.id; // Trả về ID của deal vừa tạo
    
  } catch (error) {
    console.error("Error saving deal: ", error);
  }
};
