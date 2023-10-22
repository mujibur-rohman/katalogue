import { getOneProduct } from "@/actions/product";
import ImageSlide from "../../components/image-slide";

type Props = {
  params: {
    productId: string;
  };
};

async function ProductDetail({ params: { productId } }: Props) {
  const product = await getOneProduct(productId);
  return (
    <div className="p-base flex flex-col sm:flex-row gap-3 items-start">
      <div className="sm:basis-6/12 -z-10 relative w-full lg:basis-4/12 bg-slate-50">
        <ImageSlide photos={[product.thumbnail, ...product.photos]} />
      </div>
      <div className="sm:basis-6/12 lg:basis-8/12 bg-blue-100">dd</div>
    </div>
  );
}

export default ProductDetail;
