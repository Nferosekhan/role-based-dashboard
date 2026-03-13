import { useEffect, useState, useContext } from "react";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";

const Articles = () => {
  const auth: any = useContext(AuthContext);

  const [articles, setArticles] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage] = useState(5);

  const fetchArticles = async () => {
    const res = await api.get("/articles");
    setArticles(res.data);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const createArticle = async () => {
    await api.post("/articles", { title, content });
    setTitle("");
    setContent("");
    fetchArticles();
  };

  const startEdit = (article: any) => {
    if (auth.role === "admin") {
      setEditingId(article._id);
      setEditTitle(article.title);
      setEditContent(article.content);
    }
  };

  const deleteArticle = async (id: string) => {
    if (auth.role !== "admin") return;
    if (confirm("Are you sure you want to delete this article?")) {
      await api.delete(`/articles/${id}`);
      fetchArticles();
    }
  };

  const updateArticle = async () => {
    if (auth.role !== "admin") return;

    await api.put(`/articles/${editingId}`, {
      title: editTitle,
      content: editContent,
    });

    setEditingId(null);
    setEditTitle("");
    setEditContent("");
    fetchArticles();
  };

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLast = currentPage * articlesPerPage;
  const indexOfFirst = indexOfLast - articlesPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-5xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-blue-600 mb-6">Articles</h2>

        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4">Create Article</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              createArticle();
            }}
          >
            <div className="flex flex-col md:flex-row gap-3">
              <input
                className="border p-2 rounded w-full md:w-1/3 focus:ring-2 focus:ring-blue-400"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <textarea
                rows={1}
                className="border p-2 rounded w-full md:w-2/3 focus:ring-2 focus:ring-blue-400"
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded w-full md:w-auto"
              >
                Create
              </button>
            </div>
          </form>
        </div>

        <input
          type="text"
          placeholder="Search articles..."
          className="border p-2 rounded w-full mb-4"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />

        <div className="grid gap-5">
          {currentArticles.map((article) => (
            <div
              key={article._id}
              className="bg-white border rounded-lg shadow p-5 hover:shadow-lg transition break-words"
            >
              <h3 className="text-lg font-bold text-gray-800">{article.title}</h3>
              <p className="text-gray-600 mt-2">{article.content}</p>

              {auth.role === "admin" && (
                <div className="flex flex-wrap gap-3 mt-4">
                  <button
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded"
                    onClick={() => startEdit(article)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                    onClick={() => deleteArticle(article._id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-5">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>

      {editingId && auth.role === "admin" && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
            <h3 className="text-xl font-bold mb-4">Edit Article</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateArticle();
              }}
            >
              <input
                className="border p-2 rounded w-full mb-3"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                required
              />
              <textarea
                className="border p-2 rounded w-full mb-3"
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                required
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  className="bg-gray-400 text-white px-4 py-1 rounded"
                  onClick={() => setEditingId(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Articles;