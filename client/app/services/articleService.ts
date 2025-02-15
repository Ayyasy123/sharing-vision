"use server";

// Definisikan URL backend Anda
const API_URL = process.env.NEXT_PUBLIC_API_URL; // Ganti dengan URL backend Golang Anda

// Interface untuk struktur data artikel
interface Article {
  id?: string; // Optional karena tidak diperlukan saat membuat artikel baru
  title: string;
  content: string;
  category: string;
  status: string;
}

/**
 * Membuat artikel baru
 */
export const createArticle = async (article: Article) => {
  const response = await fetch(`${API_URL}/article`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(article),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to create article");
  }

  return data;
};


/**
 * Mengambil daftar artikel dengan pagination
 */
export const getArticles = async () => {
  try {
    const response = await fetch(`${API_URL}/article`);

    // Jika respons tidak OK (misal, 404 atau 500), lempar error
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    // Jika data tidak ada atau bukan array, kembalikan array kosong
    if (!data || !Array.isArray(data)) {
      return [];
    }

    return data;
  } catch (error) {
    console.error("Error fetching articles:", error);
    return []; // Kembalikan array kosong jika terjadi error
  }
};


/**
 * Mengambil detail artikel berdasarkan ID
 */
export const getArticleById = async (id: string) => {
  const response = await fetch(`${API_URL}/article/${id}`);
  return response.json();
};

/**
 * Memperbarui artikel berdasarkan ID
 */
export const updateArticle = async (id: string, article: Article) => {
  const response = await fetch(`${API_URL}/article/${id}`, {
    method: 'PUT', // atau 'PATCH' tergantung pada backend Anda
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(article),
  });
  return response.json();
};

/**
 * Menghapus artikel berdasarkan ID
 */
export const deleteArticle = async (id: string) => {
  const response = await fetch(`${API_URL}/article/${id}`, {
    method: 'DELETE',
  });
  return response.json();
};