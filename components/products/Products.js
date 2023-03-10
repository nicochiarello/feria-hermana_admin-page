import { useState } from "react";
import Fetcher from "./Fetcher";
import { useRouter } from "next/router";
import ProductsPagination from "./ProductsPagination";
import ProductItem from "./ProductItem";
import { ClipLoader } from "react-spinners";
import Popup from "../popup/Popup";
import CreatorHandler from "./CreatorHandler";

const Products = () => {
  const router = useRouter();
  let { page } = router.query;
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(false);
  const [nbPages, setNbPages] = useState();
  const [popup, setPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [type, setType] = useState(0);

  return (
    <div className="w-full h-full overflow-y-scroll">
      {popup && (
        <CreatorHandler
          onClose={() => {
            setType(0);
            setPopup(false);
            setSelectedItem(null);
          }}
          product={selectedItem}
          type={type}
        />
      )}

      <div
        onClick={() => setPopup(true)}
        className="fixed bottom-4 right-2 w-[4rem] h-[4rem] rounded-full bg-blue-400 flex items-center justify-center cursor-pointer"
      >
        <i className="bx bx-plus text-3xl"></i>
      </div>

      <Fetcher
        setData={setProducts}
        setLoader={setLoader}
        page={page}
        setNbPages={setNbPages}
        url={`${process.env.NEXT_PUBLIC_HOST}:${process.env.NEXT_PUBLIC_PORT}/api/products`}
      />
      <ProductsPagination pages={nbPages} />
      <div className="w-full h-full flex flex-col gap-4">
        {loader ? (
          <div className="w-full h-full flex items-center justify-center">
            <ClipLoader size={150} />
          </div>
        ) : products.length > 0 ? (
          products.map((i) => {
            return (
              <ProductItem
                key={i._id}
                product={i}
                onUpdate={(product) => {
                  setType(1);
                  setSelectedItem(product);
                  setPopup(true);
                }}
              />
            );
          })
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <p>No se han encontrado productos</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
