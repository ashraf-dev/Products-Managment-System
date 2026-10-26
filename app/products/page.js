
"use client";

import { useEffect, useState } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Fetch products when page loads
  useEffect(() => {
    fetchProducts();
  }, []);

  // Get all products
  async function fetchProducts() {
    try {
      const res = await fetch("/api/products");

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch products");
      }

      if (!Array.isArray(data)) {
        throw new Error("Invalid products response");
      }

      setProducts(data);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Handle input changes
  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  // Add Product
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to add product");
      }

      // Reset form after successful submission
      setForm({
        name: "",
        description: "",
        price: "",
      });

      // Refresh products list
      await fetchProducts();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Products
      </h1>

      {/* Add Product Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white text-black p-6 rounded shadow mb-8"
      >
        <h2 className="text-xl font-bold mb-4">
          Add Product
        </h2>

        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="border p-2 w-full mb-3"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 w-full mb-3"
          required
        />

        <input
          name="price"
          type="number"
          min="0"
          step="0.01"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="border p-2 w-full mb-3"
          required
        />

        <button
          type="submit"
          disabled={submitting}
          className="bg-black text-white w-full py-2 rounded disabled:opacity-50"
        >
          {submitting ? "Adding..." : "Add"}
        </button>
      </form>

      {/* Error Message */}
      {error && (
        <p className="text-red-600 mb-4">
          {error}
        </p>
      )}

      {/* Products List */}
      <h2 className="text-2xl font-bold mb-4">
        All Products
      </h2>

      {loading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid gap-4">
          {products.map((p) => (
            <div
              key={p._id}
              className="border p-4 rounded"
            >
              <h3 className="font-bold text-lg">
                {p.name}
              </h3>

              <p className="text-gray-600">
                {p.description}
              </p>

              <p className="mt-2">
                $ {p.price}
              </p>

              <p className="text-sm text-gray-500 mt-1">
                By: {p.user?.name || "Unknown"}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
