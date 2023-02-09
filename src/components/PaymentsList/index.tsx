import * as Store from "../../store";
import { Grid } from "@mui/material";

import styles from "./styles.module.scss";
import { PaymentsListItem } from "../PaymentsListItem";

export const PaymentLists = (): React.ReactElement => {
  const payments = Store.useSelector((state) => state.payments);

  if (!payments.data?.items.length) {
    return <h1>No Items</h1>;
  }

  return (
    <Grid container spacing={4} className={styles.paymentsList}>
      {payments.data?.items.map((item) => (
        <Grid item key={item.id} md={4} sm={6} xs={12} role="list">
          <PaymentsListItem item={item} />
        </Grid>
      ))}
    </Grid>
  );
};
