import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { subHours } from "date-fns";

export default function HomeStats() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    axios.get("/api/orders").then((res) => {
      setOrders(res.data);
      setIsLoading(false);
    });
  }, []);

  function ordersTotal(orders) {
    let sum = 0;
    orders.forEach((order) => {
      const { line_items } = order;
      line_items.forEach((li) => {
        const lineSum = (li.quantity * li.price_data.unit_amount) / 100;
        sum += lineSum;
      });
    });
    console.log({ orders });
    return new Intl.NumberFormat("sv-SE").format(sum);
  }

  if (isLoading) {
    return (
      <div className="my-4">
        <Spinner fullWidth={true} />
      </div>
    );
  }

  const ordersToday = orders.filter(
    (o) => new Date(o.createdAt) > subHours(new Date(), 24)
  );
  const ordersWeek = orders.filter(
    (o) => new Date(o.createdAt) > subHours(new Date(), 24 * 7)
  );
  const ordersMonth = orders.filter(
    (o) => new Date(o.createdAt) > subHours(new Date(), 24 * 30)
  );

  return (
    <div>
      <h2>Comenzi</h2>
      <div className="tiles-grid">
        <div className="tile">
          <h3 className="tile-header">Azi</h3>
          <div className="tile-number">{ordersToday.length}</div>
          <div className="tile-desc">{ordersToday.length} comenzi azi</div>
        </div>
        <div className="tile">
          <h3 className="tile-header">Săptămâna asta</h3>
          <div className="tile-number">{ordersWeek.length}</div>
          <div className="tile-desc">
            {ordersWeek.length} comenzi săptămâna asta
          </div>
        </div>
        <div className="tile">
          <h3 className="tile-header">Luna asta</h3>
          <div className="tile-number">{ordersMonth.length}</div>
          <div className="tile-desc">
            {ordersMonth.length} comenzi luna asta
          </div>
        </div>
      </div>
      <h2>Venit</h2>
      <div className="tiles-grid">
        <div className="tile">
          <h3 className="tile-header">Azi</h3>
          <div className="tile-number">{ordersTotal(ordersToday)} RON</div>
          <div className="tile-desc">{ordersToday.length} comenzi azi</div>
        </div>
        <div className="tile">
          <h3 className="tile-header">Săptămâna asta</h3>
          <div className="tile-number">{ordersTotal(ordersWeek)} RON</div>
          <div className="tile-desc">
            {ordersWeek.length} comenzi săptămâna asta
          </div>
        </div>
        <div className="tile">
          <h3 className="tile-header">Luna asta</h3>
          <div className="tile-number">{ordersTotal(ordersMonth)} RON</div>
          <div className="tile-desc">
            {ordersMonth.length} comenzi luna asta
          </div>
        </div>
      </div>
    </div>
  );
}
