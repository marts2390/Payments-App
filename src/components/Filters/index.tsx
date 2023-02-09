import { ChangeEvent, useContext, useMemo } from "react";
import { AppContext } from "../../context/AppContext";
import * as Store from "../../store/index";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  SelectChangeEvent,
  Input,
  Button,
} from "@mui/material";

import { PaymentStatuses } from "../../api/payments";

import styles from "./styles.module.scss";

export const Filters = (): React.ReactElement => {
  const { filters, updateFilters } = useContext(AppContext);
  const payments = Store.useSelector((state) => state.payments);
  const totalItems = useMemo(() => payments.data?.totalNumberOfItems, [payments.data]);

  const dispatch = Store.useDispatch();
  const handleSelectChange = (e: SelectChangeEvent): void => {
    void dispatch(
      Store.Payments.fetch({
        status: e.target.value as PaymentStatuses,
      })
    );

    updateFilters("paymentStatus", e.target.value);
  };

  const handleDateChange = (
    range: "to" | "from",
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    updateFilters(range, e.target.value);
  };

  const handleDateFilter = () => {
    if (!filters.from || !filters.to || !totalItems) return;

    void dispatch(
      Store.Payments.fetchByDate({
        from: filters.from,
        to: filters.to,
        totalItems: totalItems,
      })
    );
  };

  return (
    <div className={styles.filters}>
      <div className={styles.statusSelect}>
        <FormControl fullWidth>
          <InputLabel id="select-label">Status</InputLabel>
          <Select
            placeholder="Select Status"
            labelId="select-label"
            value={filters.paymentStatus || ""}
            label="Status"
            onChange={(e: SelectChangeEvent) => handleSelectChange(e)}
          >
            {Object.values(PaymentStatuses).map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className={styles.dateSelect}>
        <Input type="date" onChange={(e) => handleDateChange("from", e)} />
        <Input type="date" onChange={(e) => handleDateChange("to", e)} />
        <Button variant="contained" onClick={handleDateFilter}>
          Filter by Date
        </Button>
      </div>
    </div>
  );
};
