import { useEffect, useState } from "react";
import useConfigToken from "../../../hooks/useConfigToken";
import CategoryItem from "../CategoryItem/CategoryItem";
import ListWrapper from "../ListWrapper/ListWrapper";
import { image } from "../../../utils/helpers/image";
import requester from "../../../utils/helpers/requester";
import { httpMethods, ids } from "../../../utils/constants/global";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const config = useConfigToken();

  useEffect(() => {
    requester("/categories", httpMethods.GET, null, config)
      .then((res) => {
        const result = res.filter((x) => x.id !== ids.DEFAULT_CATEGORY_ID);
        setCategories(result);
      })
      .catch((err) => console.error(err));
  }, [config]);

  return (
    <section id="categories">
      <ListWrapper title="Категории">
        {categories.map((x) => (
          <CategoryItem
            key={x.id}
            id={x.id}
            name={x.name}
            image={image.getImageUrl(x.image)}
            description={x.description}
          />
        ))}
      </ListWrapper>
    </section>
  );
}
