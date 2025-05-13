import Link from "next/link";
import Image from "next/image";
import { wixClientServer } from "@/lib/wixClientServer";
import { products } from "@wix/stores";
import DOMPurify from "isomorphic-dompurify";
import Pagination from "./Pagination";

const PRODUCT_PER_PAGE = 8;

const ProductList = async ({
  categoryId,
  limit,
  searchParams,
}: {
  categoryId: string;
  limit?: number;
  searchParams?: any;
}) => {
  const wixClient = await wixClientServer();

  try {
    const productQuery = wixClient.products
      .queryProducts()
      .startsWith("name", searchParams?.name || "")
      .eq("collectionIds", categoryId)
      .hasSome("productType", [searchParams?.type || "physical", "digital"])
      .gt("priceData.price", searchParams?.min - 1 || 0)
      .lt("priceData.price", searchParams?.max || 1000)
      .limit(limit || PRODUCT_PER_PAGE)
      .skip(searchParams?.page ? parseInt(searchParams.page) * (limit || PRODUCT_PER_PAGE) : 0)
    // .find();

    if (searchParams?.sort) {
      const [sortType, sortBy] = searchParams.sort.split(" ");

      if (sortType === "asc") {
        productQuery.ascending(sortBy);
      }

      if (sortType === "desc") {
        productQuery.descending(sortBy);
      }
    }

    const res = await productQuery.find();

    return (
      <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
        {res.items.map((product: products.Product) => (
          <Link
            key={product._id}
            href={"/" + product.slug}
            className="w-full flex flex-col gap-4 sm:w-[45%]  lg:w-[22%]"
          >
            <div className="relative w-full h-80">
              <Image
                src={product.media?.mainMedia?.image?.url || "/tomato.jpg"}
                alt=""
                fill
                sizes="25vw"
                className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
              />
              {product.media?.items && (
                <Image
                  src={product.media?.items[1]?.image?.url || "/tomate-2.jpg"}
                  alt=""
                  fill
                  sizes="25vw"
                  className="absolute object-cover rounded-md"
                />
              )}
            </div>
            <div className="flex justify-between">
              <span className="font-medium">{product.name}</span>
              <span className="font-semibold">{product.priceData?.price}€</span>
            </div>
            <div
              className="text-sm text-gray-500"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  product.additionalInfoSections?.find(
                    (section: any) => section.title === "Description"
                  )?.description || ""
                ),
              }}
            ></div>
            <button className="rounded-2xl ring-1 ring-lama text-lama w-max py-2 px-4 text-xs hover:bg-lama hover:text-white ">
              Add to Cart
            </button>
          </Link>
        ))}
        <Pagination
          currentPage={res.currentPage || 0}
          hasPrev={res.hasPrev()}
          hasNext={res.hasNext()}
        />
      </div>
    );
  } catch (error) {
    console.error("Erreur lors de la récupération des produits:", error);
    return <div>Erreur lors de la récupération des produits</div>;
  }
};

export default ProductList;
