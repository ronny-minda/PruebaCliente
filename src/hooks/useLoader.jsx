import { useDispatch, useSelector } from "react-redux";
// import { action1, action2 } from '../path/to/slice';
import { CambioLoader } from "../redux/loader";

const useLoader = () => {
  const dispatch = useDispatch();
  const loader = useSelector((state) => state.loader);

  const actualizarStadoLoader = (newValue) => {
    dispatch(CambioLoader(newValue));
  };

  return {
    loader,
    actualizarStadoLoader,
  };
};

export default useLoader;
