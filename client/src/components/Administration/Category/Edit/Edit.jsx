import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useForm from "../../../../hooks/useForm";
import useConfigToken from "../../../../hooks/useConfigToken";
import FormCategory from "../Form/Form";
import requester from "../../../../utils/helpers/requester";
import { image } from "../../../../utils/helpers/image";
import { httpMethods, types } from "../../../../utils/constants/global";

const initialValues = {
  name: "",
  description: "",
  image: "",
};

export default function EditCategory() {
  const { id } = useParams();
  const [currentImage, setCurrentImage] = useState("");
  const [serverError, setServerError] = useState("");

  const navigate = useNavigate();
  const config = useConfigToken();
  const formRef = useRef();

  const {
    fieldHandler,
    submitHandler,
    errors,
    disabledForm,
    files,
    setValues,
  } = useForm(editHandler, "category", initialValues, formRef);

  useEffect(() => {
    requester(`/admin/categories/${id}`, httpMethods.GET, null, config)
      .then((res) => {
        setValues(res);
        setCurrentImage(image.getImageUrl(res.image));
      })
      .catch((err) => console.error(err));
  }, [config, id, setValues]);

  async function editHandler(data) {
    setServerError("");

    if (!files.image) {
      delete data.image;
    }

    try {
      await requester(`/admin/categories/${id}`, httpMethods.PUT, data, config);
      navigate("/admin/category/all");
    } catch (err) {
      setServerError(err.message);
    }
  }

  const backHandler = () => {
    navigate("/admin/category/all");
  };

  return (
    <FormCategory
      type={types.EDIT}
      title="Редактирай категория"
      currentImage={currentImage}
      serverError={serverError}
      formRef={formRef}
      errors={errors}
      disabled={disabledForm()}
      submitHandler={submitHandler}
      fieldHandler={fieldHandler}
      backHandler={backHandler}
    />
  );
}
