import { create } from 'zustand';

export const useUserStore = create((set) => ({
  users: [], // Danh sách user
  selectedUser: null,
  
  setSelectedUser: (selectedUser) =>
    set((state) => ({ ...state, selectedUser })),

  //Lấy user từ api
  setUsers: (userData) => set({users: userData}),

  // Thêm user mới
  addUser: (userData) =>
    set((state) => ({ users: [...state.users, userData] })),

  // Xóa user theo ID
  removeUser: (userId) =>
    set((state) => ({ users: state.users.filter((user) => user.id !== userId) })),

  // Cập nhật user theo ID
  updateUser: (userId, updatedData) =>
    set((state) => ({
      users: state.users.map((user) =>
        user.id === userId ? { ...user, ...updatedData } : user
      ),
    })),

  // Xóa toàn bộ danh sách user
  clearUsers: () => set({ users: [] }),
}));

export const useProductStore = create((set) => ({
  products: [], // Danh sách Product
  selectedProducts: [],
  
  setSelectedProduct: (selectedProduct) =>
    set((state) => ({ ...state, selectedProduct })),

  //Lấy user từ api
  setProducts: (productData) => set({products: productData}),

  // Thêm user mới
  addProduct: (productData) =>
    set((state) => ({ users: [...state.products, productData] })),

  // Xóa user theo ID
  removeProduct: (productId) =>
    set((state) => ({ products: state.products.filter((product) => product.id !== productId) })),

  // Cập nhật user theo ID
  updateProduct: (productId, productData) =>
    set((state) => ({
      products: state.users.map((product) =>
        product.id === productId ? { ...product, ...productData } : product
      ),
    })),

  // Xóa toàn bộ danh sách user
  clearProducts: () => set({ products: [] }),
}));

export const useMenuLayoutStore = create((set) => ({
  selectedTitle: 'Products', // Danh sách 

  setSelectedTitle: (selectedTitleData) => set({selectedTitle: selectedTitleData})
})); // Tiêu đề mặc định

