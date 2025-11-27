import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRoute, useLocation } from "wouter";
import { AdminLayout } from "./AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import { ArrowLeft, Save, Eye, ImageIcon, Upload, X } from "lucide-react";
import type { Post, Category } from "@shared/schema";
import { ObjectUploader } from "@/components/ObjectUploader";

const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  excerpt: z.string().optional(),
  content: z.string().min(1, "Content is required"),
  featuredImage: z.string().optional(),
  categoryId: z.number().optional().nullable(),
  published: z.boolean().default(false),
  readingTime: z.number().default(5),
});

type PostFormData = z.infer<typeof postSchema>;

export default function PostEditor() {
  const [, params] = useRoute("/admin/posts/:id");
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const isNew = params?.id === "new";
  const postId = isNew ? null : parseInt(params?.id || "0");

  const { data: post, isLoading: postLoading } = useQuery<Post>({
    queryKey: ["/api/posts", postId],
    enabled: !!postId,
  });

  const { data: categories } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const form = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      featuredImage: "",
      categoryId: null,
      published: false,
      readingTime: 5,
    },
  });

  useEffect(() => {
    if (post) {
      form.reset({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt || "",
        content: post.content,
        featuredImage: post.featuredImage || "",
        categoryId: post.categoryId,
        published: post.published || false,
        readingTime: post.readingTime || 5,
      });
    }
  }, [post, form]);

  const createMutation = useMutation({
    mutationFn: async (data: PostFormData) => {
      return apiRequest("POST", "/api/posts", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
      toast({
        title: "Post created",
        description: "Your post has been successfully created.",
      });
      navigate("/admin/posts");
    },
    onError: (error) => {
      if (isUnauthorizedError(error as Error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to create post. Please try again.",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: PostFormData) => {
      return apiRequest("PATCH", `/api/posts/${postId}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/posts"] });
      toast({
        title: "Post updated",
        description: "Your post has been successfully updated.",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error as Error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to update post. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: PostFormData) => {
    if (isNew) {
      createMutation.mutate(data);
    } else {
      updateMutation.mutate(data);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  };

  const handleTitleChange = (value: string) => {
    form.setValue("title", value);
    if (isNew || !form.getValues("slug")) {
      form.setValue("slug", generateSlug(value));
    }
  };

  if (!isNew && postLoading) {
    return (
      <AdminLayout>
        <div className="p-6 lg:p-8">
          <Skeleton className="h-8 w-48 mb-4" />
          <Skeleton className="h-[600px] w-full" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6 lg:p-8">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/admin/posts")}
            data-testid="button-back-posts"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Posts
          </Button>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-serif text-xl">
                      {isNew ? "Create New Post" : "Edit Post"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter post title"
                              {...field}
                              onChange={(e) => handleTitleChange(e.target.value)}
                              data-testid="input-post-title"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="slug"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Slug</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="post-url-slug"
                              {...field}
                              data-testid="input-post-slug"
                            />
                          </FormControl>
                          <FormDescription>
                            The URL-friendly version of the title
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="excerpt"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Excerpt</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Brief summary of the post..."
                              className="min-h-[80px] resize-none"
                              {...field}
                              data-testid="input-post-excerpt"
                            />
                          </FormControl>
                          <FormDescription>
                            A short summary that appears in post listings
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Content</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Write your post content here... (HTML supported)"
                              className="min-h-[400px] font-mono text-sm"
                              {...field}
                              data-testid="input-post-content"
                            />
                          </FormControl>
                          <FormDescription>
                            HTML formatting is supported
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-serif text-lg">Publish</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="published"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between">
                          <div>
                            <FormLabel>Published</FormLabel>
                            <FormDescription>
                              Make this post visible to the public
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              data-testid="switch-published"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <div className="flex gap-2">
                      <Button
                        type="submit"
                        className="flex-1"
                        disabled={createMutation.isPending || updateMutation.isPending}
                        data-testid="button-save-post"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        {createMutation.isPending || updateMutation.isPending
                          ? "Saving..."
                          : "Save"}
                      </Button>
                      {!isNew && post?.slug && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => window.open(`/insights/${post.slug}`, "_blank")}
                          data-testid="button-preview-post"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="font-serif text-lg">Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="categoryId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select
                            onValueChange={(value) =>
                              field.onChange(value ? parseInt(value) : null)
                            }
                            value={field.value?.toString() || ""}
                          >
                            <FormControl>
                              <SelectTrigger data-testid="select-category">
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categories?.map((category) => (
                                <SelectItem
                                  key={category.id}
                                  value={category.id.toString()}
                                >
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="readingTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Reading Time (minutes)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min={1}
                              {...field}
                              onChange={(e) => field.onChange(parseInt(e.target.value) || 5)}
                              data-testid="input-reading-time"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="featuredImage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Featured Image</FormLabel>
                          <FormControl>
                            <div className="space-y-3">
                              {field.value ? (
                                <div className="relative rounded-lg overflow-hidden border border-border">
                                  <img
                                    src={field.value.startsWith('/objects/') 
                                      ? field.value 
                                      : field.value}
                                    alt="Featured image preview"
                                    className="w-full h-32 object-cover"
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).style.display = 'none';
                                    }}
                                    onLoad={(e) => {
                                      (e.target as HTMLImageElement).style.display = 'block';
                                    }}
                                    data-testid="img-featured-preview"
                                  />
                                  <Button
                                    type="button"
                                    size="icon"
                                    variant="destructive"
                                    className="absolute top-2 right-2 h-8 w-8"
                                    onClick={() => field.onChange("")}
                                    data-testid="button-remove-image"
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                              ) : (
                                <div className="flex items-center gap-3">
                                  <ObjectUploader
                                    onUpload={async (file) => {
                                      const uploadRes = await apiRequest("/api/objects/upload", {
                                        method: "POST",
                                      });
                                      const { uploadURL } = await uploadRes.json();
                                      
                                      await fetch(uploadURL, {
                                        method: "PUT",
                                        body: file,
                                        headers: {
                                          "Content-Type": file.type,
                                        },
                                      });
                                      
                                      const imageURL = new URL(uploadURL).pathname;
                                      
                                      const aclRes = await apiRequest("/api/featured-images", {
                                        method: "PUT",
                                        headers: {
                                          "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify({ imageURL }),
                                      });
                                      const { objectPath } = await aclRes.json();
                                      
                                      return objectPath;
                                    }}
                                    onComplete={(objectPath) => {
                                      field.onChange(objectPath);
                                    }}
                                  >
                                    <Upload className="h-4 w-4 mr-2" />
                                    Upload Image
                                  </ObjectUploader>
                                  <span className="text-sm text-muted-foreground">or</span>
                                  <Input
                                    placeholder="Enter image URL"
                                    value={field.value || ""}
                                    onChange={(e) => field.onChange(e.target.value)}
                                    className="flex-1"
                                    data-testid="input-featured-image-url"
                                  />
                                </div>
                              )}
                            </div>
                          </FormControl>
                          <FormDescription>
                            Upload an image or enter a URL for the post's featured image
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </AdminLayout>
  );
}
