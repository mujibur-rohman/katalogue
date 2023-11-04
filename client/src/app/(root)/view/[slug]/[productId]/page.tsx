import { getOneProduct } from "@/actions/product";
import ImageSlide from "@/app/(root)/catalogue/[catalogueId]/components/image-slide";

type Props = {
  params: {
    productId: string;
  };
};

async function ProductDetailView({ params: { productId } }: Props) {
  const product = await getOneProduct(productId);

  return (
    <div className="p-base flex flex-col sm:flex-row gap-3 items-start">
      <div className="sm:basis-6/12 relative w-full lg:basis-4/12">
        <ImageSlide photos={[product.thumbnail, ...product.photos]} />
      </div>
      <div className="sm:basis-6/12 lg:basis-8/12 flex flex-col gap-3 px-3">
        <h1 className="font-semibold text-2xl">{product.name}</h1>
        <h1 className="font-semibold text-3xl text-blue-500">
          Rp. {product.price}
        </h1>
        <p>{product.description}</p>
        <div className="flex flex-col gap-1">
          {product.attributes.map((attr) => (
            <div key={attr.attribute.id}>
              <h2 className="text-lg font-medium mb-1">
                {attr.attribute.name}
              </h2>
              <div className="flex gap-3">
                {attr.item.map((item) => (
                  <div
                    key={item.attributeItem.id}
                    className="bg-blue-500 text-white py-1 px-2 text-sm rounded-lg"
                  >
                    {item.attributeItem.name}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetailView;
