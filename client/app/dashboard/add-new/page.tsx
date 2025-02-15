"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createArticle } from "@/app/services/articleService";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";

export default function AddNewPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("publish");
  const [errors, setErrors] = useState<{
    title?: string;
    content?: string;
    category?: string;
    status?: string;
  }>({});
  const router = useRouter();

  const validateForm = () => {
    const newErrors: {
      title?: string;
      content?: string;
      category?: string;
      status?: string;
    } = {};

    if (!title || title.length < 20) {
      newErrors.title = "Title is required and must be at least 20 characters.";
    }
    if (!content || content.length < 200) {
      newErrors.content =
        "Content is required and must be at least 200 characters.";
    }
    if (!category || category.length < 3) {
      newErrors.category =
        "Category is required and must be at least 3 characters.";
    }
    if (!["publish", "draft", "trash"].includes(status)) {
      newErrors.status =
        "Status is required and must be either 'publish', 'draft', or 'trash'.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors before submitting.",
        variant: "destructive",
      });
      return;
    }

    try {
      await createArticle({ title, content, category, status });
      toast({ title: "Success", description: "Article created successfully" });
      router.push("/dashboard/all-posts");
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to create article",
        variant: "destructive",
      });
      console.error("Error fetching data:", err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Add New Post</h1>
      <Card className="w-full p-4 m-4 mx-auto">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            {errors.content && (
              <p className="text-red-500 text-sm">{errors.content}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={setStatus}>
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
            <Button onClick={handleSubmit}>Create Post</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
