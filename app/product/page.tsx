import { PrismaClient } from "@prisma/client";
import AddProduct from "./addProduct";
import DeleteProduct from "./deleteProduct";
import UpdateProduct from "./updateProduct";

const prisma = new PrismaClient();

const getProducts = async () => {
  try {
    const res = await prisma.product.findMany({
      select: {
        id: true,
        title: true,
        price: true,
        brandId: true,
        brand: true,
      },
    });

    return res;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Unable to fetch products. Please try again later.");
  }
};

const getBrand = async () => {
  const response = await prisma.brand.findMany();
  return response;
};

const ProductPage = async () => {
  const [procuts, brand] = await Promise.all([getProducts(), getBrand()]);

  return (
    <div>
      <div className="mb-2">
        <AddProduct brand={brand} />
      </div>
      <table className="table w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Brand</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {procuts.map((product, index) => (
            <tr key={product.id}>
              <td>{index + 1}</td>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>{product.brand.name}</td>
              <td className="text-center">
                <UpdateProduct brand={brand} product={product} />
                <DeleteProduct product={product} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductPage;
