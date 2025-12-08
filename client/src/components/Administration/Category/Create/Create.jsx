import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useForm from "../../../../hooks/useForm";
import useConfigToken from "../../../../hooks/useConfigToken";
import FormCategory from "../Form/Form";
import requester from "../../../../utils/helpers/requester";
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
  const [serverError, setServerError] = useState("");

  const navigate = useNavigate();
  const config = useConfigToken();
  const formRef = useRef();

  const { fieldHandler, submitHandler, errors, disabledForm, files } = useForm(
    createHandler,
    "category",
    initialValues,
    formRef
  );

  async function createHandler(data) {
    setServerError("");
    setCurrentImage("");

    try {
      await requester(
        serverPaths.ADMIN_CATEGORIES,
        httpMethods.POST,
        data,
        config
      );
      navigate("/admin/category/all");
    } catch (err) {
      setServerError(err.message);
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
