"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getArticles } from "@/app/services/articleService";

interface Article {
  id: string;
  title: string;
  content: string;
  category: string;
  status: string; // 'publish', 'draft', atau 'trashed'
}

export default function PreviewPage() {
  const [allPosts, setAllPosts] = useState<Article[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Article[]>([]);
  const [page, setPage] = useState(1);
  const postsPerPage = 5;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getArticles();
        const publishedPosts = data.filter((post) => post.status === "publish");
        setAllPosts(publishedPosts);
      } catch (error) {
        console.error("Failed to fetch posts", error);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    // Ambil post sesuai halaman saat ini
    const startIndex = (page - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    setFilteredPosts(allPosts.slice(startIndex, endIndex));
  }, [page, allPosts]); // 🔥 Tambahkan allPosts sebagai dependency

  const totalPages = Math.ceil(allPosts.length / postsPerPage);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Preview</h1>
      {filteredPosts.map((post) => (
        <Card key={post.id}>
          <CardHeader>
            <CardTitle>{post.title}</CardTitle>
            <CardDescription>Category: {post.category}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{post.content}</p>
          </CardContent>
        </Card>
      ))}
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setPage((prev) => Math.max(prev - 1, 1));
                }}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(index + 1);
                  }}
                  isActive={index + 1 === page}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setPage((prev) => Math.min(prev + 1, totalPages));
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
