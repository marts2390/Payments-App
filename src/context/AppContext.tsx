import { Dayjs } from "dayjs";
import { useState, createContext, ReactNode, ReactElement } from "react";

interface AppContextProviderProps {
  children: ReactNode;
}
export interface AppContextProps {
  updateFilters: (type: string, value: string) => void;
  filters: {
    paymentStatus?: string;
    from?: Dayjs;
    to?: Dayjs;
  };
}

export const AppContextDefaults: AppContextProps = {
  updateFilters: () => undefined,
  filters: {
    paymentStatus: undefined,
  },
};

export const AppContext = createContext<AppContextProps>(AppContextDefaults);

// TODO: remove unused
export const AppContextProvider = ({
  children,
}: AppContextProviderProps): ReactElement => {
  const [filters, setFilters] = useState<AppContextProps["filters"]>({
    paymentStatus: undefined,
    from: undefined,
    to: undefined,
  });

  const handleFilters = (type: string, value: string) => {
    setFilters({
      ...filters,
      [type]: value,
    });
  };

  return (
    <AppContext.Provider
      value={{
        updateFilters: handleFilters,
        filters: {
          paymentStatus: filters.paymentStatus,
          from: filters.from,
          to: filters.to,
        },
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
