import * as ReactRedux from "react-redux";
import * as Store from "../../store/index";

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
export const useSelector = <T extends unknown = Store.AppRootState>(
  selector: (state: Store.AppRootState) => T,
  equalityFn?: (left: T, right: T) => boolean
): T => ReactRedux.useSelector(selector, equalityFn);

export const useDispatch = (): Store.Dispatch => ReactRedux.useDispatch();
