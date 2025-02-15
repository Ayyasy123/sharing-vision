"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getArticles, updateArticle } from "@/app/services/articleService";
import AllPostsTable from "@/app/components/allPostsTable";

// Definisikan tipe data untuk artikel
interface Article {
  id: string;
  title: string;
  content: string;
  category: string;
  status: string; // 'published', 'draft', atau 'trashed'
}

export default function AllPostsPage() {
  const [posts, setPosts] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const data = await getArticles();
      console.log(data);
      setPosts(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch posts");
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleTrash = async (postId: string) => {
    try {
      const post = posts.find((p) => p.id === postId);
      if (!post) return;

      await updateArticle(postId, {
        status: "trash",
        title: post.title,
        content: post.content,
        category: post.category,
      });

      // Fetch ulang untuk update state
      await fetchPosts();
    } catch (error) {
      setError("Failed to update article status");
      console.error("Error updating article:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">All Posts</h1>
      <Tabs defaultValue="publish">
        <TabsList>
          <TabsTrigger value="publish">Published</TabsTrigger>
          <TabsTrigger value="draft">Drafts</TabsTrigger>
          <TabsTrigger value="trash">Trashed</TabsTrigger>
        </TabsList>
        <TabsContent value="publish">
          <AllPostsTable
            posts={posts.filter((post) => post.status === "publish")}
            handleTrash={handleTrash}
          />
        </TabsContent>

        {/* drafts */}
        <TabsContent value="draft">
          {/* Similar table for drafts */}
          <AllPostsTable
            posts={posts.filter((post) => post.status === "draft")}
            handleTrash={handleTrash}
          />
        </TabsContent>

        {/* trashed */}
        <TabsContent value="trash">
          {/* Similar table for trashed */}
          <AllPostsTable
            posts={posts.filter((post) => post.status === "trash")}
            handleTrash={handleTrash}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
