import { useDispatch, useSelector } from "react-redux";
import { GuardarTodosUsuarios } from "../redux/allUsuarios";

const allUsuarios = () => {
  const dispatch = useDispatch();
  const todosStadoUsuarios = useSelector((state) => state.allUser);

  const actualizarTodoStadoUsuarios = (newValue) => {
    dispatch(GuardarTodosUsuarios(newValue));
  };

  return {
    todosStadoUsuarios,
    actualizarTodoStadoUsuarios,
  };
};

export default allUsuarios;
