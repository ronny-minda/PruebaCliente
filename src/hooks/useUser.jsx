import { useDispatch, useSelector } from "react-redux";
// import { action1, action2 } from '../path/to/slice';
import { UserActualizar } from "../redux/user";

const useUser = () => {
  const dispatch = useDispatch();
  const stadoUsuario = useSelector((state) => state.user); // Remplaza someSlice y someValue con los nombres de tu slice y estado.

  const actualizarStadoUsuario = (newValue) => {
    dispatch(UserActualizar(newValue)); // Remplaza action1 con la acción que actualiza someValue en tu slice.
  };

  return {
    stadoUsuario,
    actualizarStadoUsuario,
  };
};

export default useUser;
