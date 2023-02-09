import { useMemo } from "react";
import { Card } from "@mui/material";
import {
  CheckCircleOutline,
  ErrorOutline,
  Pending,
} from "@mui/icons-material/";

import cn from "classnames";
import dayjs from "dayjs";

import { PaymentResponseItem, PaymentStatuses } from "../../api/payments";
import styles from "./styles.module.scss";

interface PaymentsListItemProps {
  item: PaymentResponseItem;
}

export const PaymentsListItem = ({
  item,
}: PaymentsListItemProps): React.ReactElement => {
  const statusClasses = cn(styles.status, styles[item.status.toLowerCase()]);

  const currencySymbol: string = useMemo(() => {
    switch (item.currency) {
      case "GBP":
        return "£";

      case "EUR":
        return "€";

      case "USD":
        return "$";

      default:
        return "£";
    }
  }, [item.currency]);

  const icon: React.ReactElement | undefined = useMemo(() => {
    switch (item.status) {
      case PaymentStatuses.completed:
        return <CheckCircleOutline color="success" />;

      case PaymentStatuses.settled:
        return <CheckCircleOutline color="success" />;

      case PaymentStatuses.created:
        return <Pending color="warning" />;

      case PaymentStatuses.captured:
        return <Pending color="warning" />;

      case PaymentStatuses.failed:
        return <ErrorOutline color="error" />;
    }
  }, [item.status]);

  return (
    <Card className={styles.card} elevation={8}>
      <div className={styles.icon} role="icon">
        {icon}
      </div>
      <h6 className={statusClasses}>{item.status}</h6>
      <h4 className={styles.amount}>{`${currencySymbol}${item.amount.toFixed(
        2
      )}`}</h4>
      <p className={styles.description}>{item.description}</p>
      <p className={styles.date}>
        {dayjs(item.createdAt).format("ddd D MMM YYYY")}
      </p>
    </Card>
  );
};
