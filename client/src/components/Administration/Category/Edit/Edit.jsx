import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useForm from "../../../../hooks/useForm";
import useFetch from "../../../../hooks/useFetch";
import useAction from "../../../../hooks/useAction";
import FormCategory from "../Form/Form";
import Loader from "../../../Loader/Loader";
import { image } from "../../../../utils/helpers/image";
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

export default function EditCategory() {
  const { id } = useParams();
  const navigate = useNavigate();
  const formRef = useRef();

  const [currentImage, setCurrentImage] = useState("");

  const {
    fieldHandler,
    submitHandler,
    errors,
    disabledForm,
    files,
    setValues,
  } = useForm(editHandler, "category", initialValues, formRef);

  const { execute, serverError } = useAction();
  const { values: result, loading } = useFetch(
    initialValues,
    `${serverPaths.ADMIN_CATEGORIES}/${id}`
  );

  useEffect(() => {
    if (result.name) {
      setValues(result);
      setCurrentImage(image.getImageUrl(result.image));
    }
  }, [result, setValues]);

  async function editHandler(data) {
    if (!files.image) {
      delete data.image;
    }

    try {
      await execute(
        `${serverPaths.ADMIN_CATEGORIES}/${id}`,
        httpMethods.PUT,
        data
      );
      navigate("/admin/category/all");
    } catch (err) {
      console.error(err.message);
    }
  }

  const backHandler = () => {
    navigate("/admin/category/all");
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <FormCategory
      type={types.EDIT}
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
