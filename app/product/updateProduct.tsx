"use client";
import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";
import type { Brand } from "@prisma/client";
import axios from "axios";

type Product = {
  id: number;
  title: string;
  price: number;
  brandId: number;
};

export default function UpdateProduct({
  brand,
  product,
}: {
  brand: Brand[];
  product: Product;
}) {
  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price);
  const [brands, setBrand] = useState(product.brandId);
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    await axios.post("/api/products", {
      title: title,
      price: Number(price),
      brand: Number(brands),
    });
    router.refresh();
    setIsOpen(false);
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <button className="btn btn-info btn-sm" onClick={handleModal}>
        Edit Product
      </button>
      <div className={isOpen ? "modal modal-open" : "modal"}>
        <div className="modal-box">
          <h3 className="font-bold-text-lg">Add New Product</h3>
          <form action="" onSubmit={handleSubmit}>
            <div className="form-control w-full">
              <label className="label font-bold">Product Name</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                className="input input-bordered"
                placeholder="Input Product Name"
              />
            </div>

            <div className="form-control w-full">
              <label className="label font-bold">Product Price</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="input input-bordered"
                placeholder="Input Product Price"
              />
            </div>

            <div className="form-control w-full">
              <label className="label font-bold">Product Brand</label>
              <select
                value={brands}
                onChange={(e) => setBrand(Number(e.target.value))}
                className="select select-bordered w-full max-w-xs"
              >
                {brand.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="modal-action">
              <button type="button" className="btn" onClick={handleModal}>
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
