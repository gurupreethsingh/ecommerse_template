import globalBackendRoute from "../../config/Config";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ModernTextInput from "../../components/common_components/MordernTextInput";

export default function AddProduct() {
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    product_name: "",
    slug: "",
    description: "",
    sku: "",
    selling_price: "",
    display_price: "",
    brand: "",
    barcode: "",
    stock: 0,
    color: "",
    material: "",
    tags: "",
    category: "",
    subcategory: "",
    vendor: "",
    outlet: "",
  });
  const [productImage, setProductImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategoriesAll, setSubcategoriesAll] = useState([]);
  const [filteredSubcategories, setFilteredSubcategories] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [outlets, setOutlets] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, subRes, venRes, outRes] = await Promise.all([
          axios.get(`${globalBackendRoute}/api/all-categories`),
          axios.get(`${globalBackendRoute}/api/all-subcategories`),
          axios.get(`${globalBackendRoute}/api/all-vendors`),
          axios.get(`${globalBackendRoute}/api/all-outlets`),
        ]);
        setCategories(catRes.data);
        setSubcategoriesAll(subRes.data);
        setVendors(venRes.data);
        setOutlets(outRes.data);
      } catch (error) {
        console.error("Failed to fetch dropdown data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (productData.category) {
      const filtered = subcategoriesAll.filter(
        (sub) =>
          String(sub.category?._id || sub.category) ===
          String(productData.category)
      );
      setFilteredSubcategories(filtered);
    } else {
      setFilteredSubcategories([]);
    }
  }, [productData.category, subcategoriesAll]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "product_name") {
      const trimmed = value.trimStart();
      setProductData({ ...productData, [name]: trimmed });
    } else {
      setProductData({ ...productData, [name]: value });
    }
  };

  const validateProductName = (name) => {
    const trimmed = name.trim();
    if (!trimmed) return false;
    if (/^[^a-zA-Z0-9]+$/.test(trimmed)) return false;
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nameValid = validateProductName(productData.product_name);
    if (!nameValid) {
      setMessage("Invalid product name.");
      return;
    }

    if (!productData.sku?.trim()) {
      setMessage("SKU is required and must be unique.");
      return;
    }

    if (!productData.selling_price || isNaN(productData.selling_price)) {
      setMessage("Selling price is required and must be a valid number.");
      return;
    }

    if (!productData.vendor || !productData.outlet) {
      setMessage("Vendor and Outlet are required.");
      return;
    }

    try {
      const formData = new FormData();
      Object.entries(productData).forEach(([key, val]) => {
        // Don't send empty subcategory or category
        if ((key === "subcategory" || key === "category") && !val) return;
        formData.append(key, val);
      });

      if (productImage) formData.append("product_image", productImage);
      galleryImages.forEach((file) =>
        formData.append("all_product_images", file)
      );

      const res = await axios.post(
        `${globalBackendRoute}/api/add-product`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res.status === 201) {
        alert("Product added successfully!");
        navigate("/all-added-products");
      } else {
        throw new Error("Product not created");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      const errorMsg =
        error.response?.data?.message || "Failed to add product. Try again.";
      setMessage(errorMsg);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-6">Add New Product</h2>
      {message && <p className="text-red-500 text-center">{message}</p>}
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
        encType="multipart/form-data"
      >
        <ModernTextInput
          label="Product Name *"
          name="product_name"
          placeholder="Enter product name"
          value={productData.product_name}
          onChange={handleChange}
        />

        <ModernTextInput
          label="Description *"
          name="description"
          placeholder="Enter full description of the product"
          value={productData.description}
          onChange={handleChange}
        />
        <ModernTextInput
          label="SKU *"
          name="sku"
          placeholder="Enter SKU (must be unique)"
          value={productData.sku}
          onChange={handleChange}
        />
        <ModernTextInput
          label="Slug (URL-friendly) *"
          name="slug"
          placeholder="example-product-slug"
          value={productData.slug}
          onChange={handleChange}
        />

        <ModernTextInput
          label="Selling Price *"
          name="selling_price"
          type="number"
          placeholder="Enter selling price"
          value={productData.selling_price}
          onChange={handleChange}
        />

        <ModernTextInput
          label="Display Price (Optional)"
          name="display_price"
          type="number"
          placeholder="Enter original display price (optional)"
          value={productData.display_price}
          onChange={handleChange}
        />
        <ModernTextInput
          label="Brand *"
          name="brand"
          placeholder="e.g., Apple, Samsung"
          value={productData.brand}
          onChange={handleChange}
        />
        <ModernTextInput
          label="Barcode"
          name="barcode"
          placeholder="Enter barcode if available"
          value={productData.barcode}
          onChange={handleChange}
        />
        <ModernTextInput
          label="Stock *"
          name="stock"
          type="number"
          placeholder="Enter available stock quantity"
          value={productData.stock}
          onChange={handleChange}
        />
        <ModernTextInput
          label="Color"
          name="color"
          placeholder="e.g., Black, Red, Silver"
          value={productData.color}
          onChange={handleChange}
        />
        <ModernTextInput
          label="Material"
          name="material"
          placeholder="e.g., Plastic, Metal"
          value={productData.material}
          onChange={handleChange}
        />
        <ModernTextInput
          label="Tags (comma separated)"
          name="tags"
          placeholder="e.g., phone, electronics, gadgets"
          value={productData.tags}
          onChange={handleChange}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Category *
            </label>
            <select
              name="category"
              value={productData.category}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">-- Select Category --</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.category_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Subcategory
            </label>
            <select
              name="subcategory"
              value={productData.subcategory}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">-- Select Subcategory --</option>
              {filteredSubcategories.map((sub) => (
                <option key={sub._id} value={sub._id}>
                  {sub.subcategory_name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Vendor *
            </label>
            <select
              name="vendor"
              value={productData.vendor}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">-- Select Vendor --</option>
              {vendors.map((ven) => (
                <option key={ven._id} value={ven._id}>
                  {ven.vendor_name ||
                    ven.name ||
                    ven.email ||
                    `Vendor ${ven._id}`}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Outlet
            </label>
            <select
              name="outlet"
              value={productData.outlet}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">-- Select Outlet --</option>
              {outlets.map((out) => (
                <option key={out._id} value={out._id}>
                  {out.outlet_name || out.name || `Outlet ${out._id}`}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Main Product Image *
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProductImage(e.target.files[0])}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border file:border-gray-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gallery Images
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setGalleryImages([...e.target.files])}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border file:border-gray-300"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-cyan-500 via-teal-500 to-indigo-500 text-white font-semibold py-2 px-4 rounded-lg shadow hover:opacity-90"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
