import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { ProductsContext } from "../context/ProductsContext";
import { getOrdersByUser } from "../firebase/firebase";
import ProductCard from "../components/ProductCard";

export default function OrdersContainer() {
  const [user] = useContext(UserContext);
  const [products] = useContext(ProductsContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) return;
    getOrdersByUser(user.id).then(({ orders, errorMessage }) => !errorMessage && setOrders(orders));
  }, [user]);

  return (
    <div>
      <h1>Orders</h1>
      <div>
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <h3>Order ID: {order.id}</h3>
              <section>
                <h4>Products</h4>
                <ul className="flex gap-2">
                  {order.items.map((item) => (
                    <li key={item.id}>
                      <ProductCard product={products.get(item.id)} addToCart={false} />
                    </li>
                  ))}
                </ul>
              </section>
              <h3>Total: {order.total}</h3>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
