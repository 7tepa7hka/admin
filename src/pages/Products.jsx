import React, { useEffect, useState } from "react";
import "./Products.css";
import { toast, Bounce } from "react-toastify";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        toast.error("Ошибка при загрузке", {
          position: "top-right",
          autoClose: 2000,
          theme: "light",
          transition: Bounce,
        });
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id, title) => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const result = await response.json();

        toast.warn("Удаленно!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (error) {
      toast.error("Ошибка при отправке запроса");
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://fakestoreapi.com/products", {
        method: "POST",
        body: JSON.stringify({
          title: title,
          price: parseFloat(price),
          description: "Тестовое описание",
          image: "https://i.pravatar.cc",
          category: category,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      if (response.ok) {
        const result = await response.json();

        toast("Добавленно!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });

        setTitle("");
        setPrice("");
        setCategory("");
        setIsOpen(false);
      }
    } catch (error) {
      toast.error("Ошибка при создании товара");
    }
  };

  if (loading) {
    return <div className="loading">Загрузка товаров...</div>;
  }

  return (
    <div className="products-page">
      <div className="products-header">
        <div>
          <h1>Магазин (FakeAPI)</h1>
          <p>Найдено товаров: {products.length}</p>
        </div>

        <button className="add-btn" onClick={() => setIsOpen(true)}>
          + Add Product
        </button>
      </div>

      <div className="table-wrapper">
        <table className="products-table">
          <thead>
            <tr>
              <th>Название</th>
              <th>Категория</th>
              <th>Цена</th>
              <th>Рейтинг</th>
              <th>Действие</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item.id}>
                <td className="product-name" title={item.title}>
                  {item.title.length > 35
                    ? item.title.substring(0, 35) + "..."
                    : item.title}
                </td>
                <td>
                  <span className="category-tag">{item.category}</span>
                </td>
                <td className="product-price">${item.price}</td>
                <td>
                  <div className="rating-box">
                    <span className="star">⭐</span> {item.rating?.rate}
                    <span className="count">({item.rating?.count})</span>
                  </div>
                </td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(item.id, item.title)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Добавить новый товар</h3>
            <form onSubmit={handleCreate}>
              <div className="form-group">
                <label>Название товара</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Например, iPhone 16"
                  required
                />
              </div>

              <div className="form-group">
                <label>Категория</label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="electronics, clothing..."
                  required
                />
              </div>

              <div className="form-group">
                <label>Цена ($)</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="999"
                  required
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setIsOpen(false)}
                >
                  Отмена
                </button>
                <button type="submit" className="save-btn">
                  Сохранить (POST)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
