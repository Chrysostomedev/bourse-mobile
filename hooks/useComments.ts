import { useEffect, useState } from "react";
import { commentService, type Comment } from "@/services/post.service";

export function useComments(postId: number) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!postId) return;

    const fetchComments = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await commentService.getByPostId(postId);
        setComments(res.data ?? []);
      } catch (err: any) {
        setError(err.errorMessage ?? "Erreur lors du chargement des commentaires");
        console.error("🔴 useComments error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [postId]);

  const addComment = async (content: string) => {
    if (!postId) throw new Error("Post ID is required");
    try {
      const newComment = await commentService.create(postId, content);
      setComments((prev) => [newComment, ...prev]);
      return newComment;
    } catch (err: any) {
      setError(err.errorMessage ?? "Erreur lors de l'ajout du commentaire");
      throw err;
    }
  };

  const deleteComment = async (commentId: number) => {
    try {
      await commentService.delete(commentId);
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    } catch (err: any) {
      setError(err.errorMessage ?? "Erreur lors de la suppression du commentaire");
      throw err;
    }
  };

  return {
    comments,
    isLoading,
    error,
    addComment,
    deleteComment,
  };
}
