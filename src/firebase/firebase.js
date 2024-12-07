// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, getDocs, addDoc, collection, query, where, orderBy, limit, writeBatch } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export async function getAllProducts({ limitParam, orderByParam = "title", orderParam = "asc" }) {
  try {
    const productsReference = collection(db, "productos");
    let productsQuery;
    if (limitParam > 0) productsQuery = query(productsReference, orderBy(orderByParam, orderParam), limit(limitParam));
    else productsQuery = query(productsReference, orderBy(orderByParam, orderParam));

    const productsSnapshot = await getDocs(productsQuery);
    if (productsSnapshot.empty) return { products: [], errorMessage: "[Firebase] No products found" };

    const products = productsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return { products: products, errorMessage: null };
  } catch (error) {
    console.error("[Firebase] An error occurred while retrieving the products:", error);
  }
}

export async function getProductById(id) {
  if (!id || typeof id !== "string") return { product: null, errorMessage: "Invalid product ID" };
  try {
    const productReference = doc(db, "productos", id);
    const productSnapshot = await getDoc(productReference);
    if (!productSnapshot.exists()) return { product: null, errorMessage: "Product not found" };

    const product = { id: id, ...productSnapshot.data() };
    return { product: product, errorMessage: null };
  } catch (error) {
    console.error("[Firebase] An error occurred while retrieving the product:", error);
    return Promise.reject(error);
  }
}

function validateProduct(product) {
  let invalidAtributes = [];
  if (!product || typeof product !== "object") invalidAtributes.push("Invalid object");
  if (!product.title || typeof product.title !== "string") invalidAtributes.push("Invalid title");
  if (!product.description || typeof product.description !== "string") invalidAtributes.push("Invalid description");
  if (typeof product.price !== "number" || product.price < 0) invalidAtributes.push("Invalid price");
  if (typeof product.stock !== "number" || product.stock < 0) invalidAtributes.push("Invalid stock");
  if (typeof product.rating !== "number" || product.rating < 0 || product.rating > 5) invalidAtributes.push("Invalid rating");
  if (typeof product.discountedPercentage !== "number" || product.discountedPercentage < 0 || product.discountedPercentage > 100)
    invalidAtributes.push("Invalid discountedPercentage");
  if (!product.category || typeof product.category !== "string") invalidAtributes.push("Invalid category");
  if (!product.images || !Array.isArray(product.images) || product.images.length === 0 || product.images.some((img) => typeof img !== "string"))
    invalidAtributes.push("Invalid images");
  if (!product.thumbnail || typeof product.thumbnail !== "string") invalidAtributes.push("Invalid thumbnail");
  return { isValid: invalidAtributes.length === 0, invalidAtributes: invalidAtributes };
}

export async function addProduct(product) {
  const { isValid, invalidAtributes } = validateProduct(product);
  if (!isValid) return { id: null, errorMessage: `${invalidAtributes.join(", ")}` };
  try {
    const productsCollection = collection(db, "productos");
    const productReference = await addDoc(productsCollection, product);
    return { id: productReference.id, errorMessage: null };
  } catch (error) {
    console.error("[Firebase] An error occurred while adding the product:", error);
  }
}

async function updateProduct(id, product) {
  const { isValid, invalidAtributes } = validateProduct(product);
  if (!isValid) return { success: false, errorMessage: `${invalidAtributes.join(", ")}` };
  try {
    const productReference = doc(db, "productos", id);
    await updateDoc(productReference, product);
    return { success: true, errorMessage: null };
  } catch (error) {
    console.error("[Firebase] An error occurred while updating the product:", error);
  }
}

async function batchUpdateProducts(products) {
  const batch = writeBatch(db);

  products.forEach((product) => {
    const productDocRef = doc(db, "productos", product.id);
    batch.update(productDocRef, product);
  });
  try {
    await batch.commit();
    return true;
  } catch (error) {
    console.error("[Firebase] An error occurred while batch updating the products:", error);
    return Promise.reject(error);
  }
}

export async function getProductsByCategory(categorySlug) {
  if (!categoryId || typeof categoryId !== "string") return { products: null, errorMessage: "Invalid category" };
  try {
    const productsReference = collection(db, "productos");
    const productsQuery = query(productsReference, where("category", "==", categorySlug));
    const productsSnapshot = await getDocs(productsQuery);
    if (productsSnapshot.empty) return { products: [], errorMessage: "No products found" };

    const products = productsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return { products: products, errorMessage: null };
  } catch (error) {
    console.error("[Firebase] An error occurred while retrieving the products from category:", error);
  }
}

export async function batchAddProducts(products) {
  if (!products || !products.length) return { success: false, errorMessage: "No products to add" };
  try {
    const productsCollection = collection(db, "productos");
    const batch = writeBatch(db);
    console.log(products);
    products.forEach((product) => {
      const productDocRef = doc(productsCollection);
      batch.set(productDocRef, product);
    });

    await batch.commit();
    return { success: true, errorMessage: null };
  } catch (error) {
    console.error("[Firebase] An error occurred while batch adding the products:", error);
  }
}

export async function addAnOrder(order) {
  const { isValid, invalidAtributes } = validateOrder(order);
  if (!isValid) return { id: null, errorMessage: `${invalidAtributes.join(", ")}` };
  try {
    const ordersCollection = collection(db, "orders");
    const orderReference = await addDoc(ordersCollection, order);
    let products = [];
    for (const item of order.items) {
      const { product } = await getProductById(item.id);
      product.stock -= item.quantity;
      products.push(product);
    }
    if (!(await batchUpdateProducts(products))) return { id: null, errorMessage: "Error updating products" };

    return { id: orderReference.id, errorMessage: null };
  } catch (error) {
    console.error("[Firebase] An error occurred while adding the product:", error);
    return Promise.reject(error);
  }
}

function validateOrder(order) {
  let invalidAtributes = [];
  if (!order || typeof order !== "object") invalidAtributes.push("Invalid object");
  if (!order.buyerID || typeof order.buyerID !== "string") invalidAtributes.push("Invalid buyer");
  if (!userExists(order.buyerID)) invalidAtributes.push("User not found");
  if (!order.items || !Array.isArray(order.items) || order.items.length === 0 || !isStockAvailable(order.items))
    invalidAtributes.push("Not enough stock");
  if (!order.createdAt || !(order.createdAt instanceof Date)) invalidAtributes.push("Invalid createdAt");
  if (!Array.isArray(order.items) || order.items.length === 0 || order.items.some((item) => typeof item !== "object"))
    invalidAtributes.push("Invalid items");
  if (!order.total || typeof order.total !== "number") invalidAtributes.push("Invalid total");
  return { isValid: invalidAtributes.length === 0, invalidAtributes: invalidAtributes };
}

async function isStockAvailable(items) {
  for (const { id, quantity } of items) {
    const { product, errorMessage } = await getProductById(id);
    if (errorMessage || product.stock - quantity < 0) return false;
  }
  return true;
}

async function userExists(id) {
  const userReference = doc(db, "users", id);
  const docSnapshot = await getDoc(userReference);
  return docSnapshot.exists();
}

export async function getUserById(id) {
  const userReference = doc(db, "users", id);
  const docSnapshot = await getDoc(userReference);
  if (!docSnapshot.exists()) return null;

  const user = { id: id, ...docSnapshot.data() };
  return user;
}

export async function loginUser(user) {
  const usersReference = collection(db, "users");
  const usersQuery = query(usersReference, where("email", "==", user.email), where("password", "==", user.password), limit(1));
  const usersSnapshot = await getDocs(usersQuery);
  if (usersSnapshot.empty) return { user: null, errorMessage: "User not found" };
  const userDoc = usersSnapshot.docs[0];
  const userRes = { id: userDoc.id, email: userDoc.data().email, userName: userDoc.data().userName };
  return { user: userRes, errorMessage: null };
}
