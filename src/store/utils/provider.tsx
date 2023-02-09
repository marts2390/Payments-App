import React from "react";
import * as ReactRedux from "react-redux";
import * as Store from "../../store/index";

export const Provider = ({
  children,
}: {
  children: React.ReactElement | React.ReactElement[];
}): React.ReactElement => (
  <ReactRedux.Provider store={Store.store}>{children}</ReactRedux.Provider>
);
