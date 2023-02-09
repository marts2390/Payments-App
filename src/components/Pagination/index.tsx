import { useMemo } from "react";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { IconButton, Button } from "@mui/material";

import styles from "./styles.module.scss";
import * as Store from "../../store";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

export const Pagination = (): React.ReactElement => {
  const { filters } = useContext(AppContext);
  const payments = Store.useSelector((state) => state.payments);
  const dispatch = Store.useDispatch();

  const pages = useMemo(
    () => [...Array(payments.data?.numberOfPages)].map((a, index) => index + 1),
    [payments.data]
  );

  const currentPage = useMemo(
    () => payments.data?.currentPage,
    [payments.data]
  );

  const hasNextPage = useMemo(() => payments.data?.hasNext, [payments.data]);

  const handleButtonClick = (page: number) => {
    void dispatch(
      Store.Payments.fetch({
        page,
        size: undefined,
        status: filters.paymentStatus,
      })
    );
  };

  return (
    <div className={styles.pagination}>
      <IconButton
        color="warning"
        disabled={currentPage === 0}
        onClick={(): void => {
          if (!currentPage) return;

          handleButtonClick(currentPage - 1);
        }}
      >
        <ChevronLeft />
      </IconButton>
      {pages.map((item) => (
        <Button
          role="listitem"
          color="warning"
          key={item}
          onClick={(): void => handleButtonClick(item - 1)}
          disabled={(currentPage && currentPage) === item - 1}
        >
          {item}
        </Button>
      ))}
      <IconButton
        color="warning"
        disabled={!hasNextPage}
        onClick={(): void => {
          if (typeof currentPage !== "number") return;

          handleButtonClick(currentPage + 1);
        }}
      >
        <ChevronRight />
      </IconButton>
    </div>
  );
};
