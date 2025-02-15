"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { getArticleById, updateArticle } from "@/app/services/articleService";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

export default function EditPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState({
    id: "",
    title: "",
    content: "",
    category: "",
    status: "",
  });
  const [errors, setErrors] = useState<{
    title?: string;
    content?: string;
    category?: string;
    status?: string;
  }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getArticleById(params.id as string);
        setPost(data);
      } catch (error) {
        setError("Failed to fetch post");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    if (params.id) fetchPost();
  }, [params.id]);

  const validateForm = () => {
    const newErrors: {
      title?: string;
      content?: string;
      category?: string;
      status?: string;
    } = {};

    if (!post.title || post.title.length < 20) {
      newErrors.title = "Title is required and must be at least 20 characters.";
    }
    if (!post.content || post.content.length < 200) {
      newErrors.content =
        "Content is required and must be at least 200 characters.";
    }
    if (!post.category || post.category.length < 3) {
      newErrors.category =
        "Category is required and must be at least 3 characters.";
    }
    if (!["publish", "draft", "trash"].includes(post.status)) {
      newErrors.status =
        "Status must be either 'publish', 'draft', or 'trash'.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = async () => {
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors before submitting.",
        variant: "destructive",
      });
      return;
    }

    try {
      await updateArticle(params.id as string, post);
      toast({ title: "Success", description: "Article updated successfully" });
      router.push("/dashboard/all-posts");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update article",
        variant: "destructive",
      });
      console.error("Error fetching data:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
      <h1 className="text-2xl font-bold">Edit Post</h1>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            value={post.content}
            onChange={(e) => setPost({ ...post, content: e.target.value })}
          />
          {errors.content && (
            <p className="text-red-500 text-sm">{errors.content}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            value={post.category}
            onChange={(e) => setPost({ ...post, category: e.target.value })}
          />
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            value={post.status}
            onValueChange={(value) => setPost({ ...post, status: value })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="publish">Publish</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="trash">Trash</SelectItem>
            </SelectContent>
          </Select>
          {errors.status && (
            <p className="text-red-500 text-sm">{errors.status}</p>
          )}
        </div>
        <div className="flex gap-2">
          <Button onClick={handleUpdate}>Update Post</Button>
        </div>
      </div>
    </>
  );
}
