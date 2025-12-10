import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useForm from "../../../../hooks/useForm";
import useAction from "../../../../hooks/useAction";
import FormCategory from "../Form/Form";
import {
  httpMethods,
  serverPaths,
  types,
} from "../../../../utils/constants/global";

const initialValues = {
  name: "",
  description: "",
  image: "",
};

export default function CreateCategory() {
  const [currentImage, setCurrentImage] = useState("");
  const navigate = useNavigate();
  const formRef = useRef();

  const { execute, serverError } = useAction();
  const { fieldHandler, submitHandler, errors, disabledForm, files } = useForm(
    createHandler,
    "category",
    initialValues,
    formRef
  );

  async function createHandler(data) {
    setCurrentImage("");

    try {
      await execute(serverPaths.ADMIN_CATEGORIES, httpMethods.POST, data);
      navigate("/admin/category/all");
    } catch (err) {
      console.error(err);
      setCurrentImage(files.image);
    }
  }

  return (
    <FormCategory
      type={types.CREATE}
      currentImage={currentImage}
      serverError={serverError}
      formRef={formRef}
      errors={errors}
      disabled={disabledForm() || !files.image}
      submitHandler={submitHandler}
      fieldHandler={fieldHandler}
    />
  );
}
