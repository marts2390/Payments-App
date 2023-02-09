import * as Store from "./store";
import { useEffect } from "react";
import styles from "./App.module.scss";
import { PaymentLists } from "./components/PaymentsList";
import { Pagination } from "./components/Pagination";
import { Filters } from "./components/Filters";

function App() {
  const dispatch = Store.useDispatch();

  useEffect(() => {
    void dispatch(Store.Payments.fetch({}));
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Vyne App</h1>
      <Filters />
      <PaymentLists />
      <Pagination />
    </div>
  );
}

export default App;
