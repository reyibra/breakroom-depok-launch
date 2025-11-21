import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { z } from "zod";

const newsSchema = z.object({
  title: z.string().trim().min(1, "Judul harus diisi").max(200, "Judul maksimal 200 karakter"),
  content: z.string().trim().min(1, "Konten harus diisi").max(5000, "Konten maksimal 5000 karakter"),
  image_url: z.string().trim().url("URL gambar tidak valid").optional().or(z.literal("")),
});

interface News {
  id: string;
  title: string;
  content: string;
  image_url: string | null;
  is_active: boolean;
  published_at: string;
  created_at: string;
}

const News = () => {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewData, setPreviewData] = useState<{ title: string; content: string; image_url: string } | null>(null);
  const [editingNews, setEditingNews] = useState<News | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image_url: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .order("published_at", { ascending: false });

      if (error) throw error;
      setNews(data || []);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Gagal mengambil data news",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = newsSchema.safeParse(formData);
    if (!validation.success) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: validation.error.errors[0].message,
      });
      return;
    }

    try {
      if (editingNews) {
        const { error } = await supabase
          .from("news")
          .update({
            title: formData.title.trim(),
            content: formData.content.trim(),
            image_url: formData.image_url.trim() || null,
          })
          .eq("id", editingNews.id);

        if (error) throw error;
        toast({ title: "Berhasil", description: "News berhasil diupdate" });
      } else {
        const { error } = await supabase
          .from("news")
          .insert({
            title: formData.title.trim(),
            content: formData.content.trim(),
            image_url: formData.image_url.trim() || null,
          });

        if (error) throw error;
        toast({ title: "Berhasil", description: "News berhasil ditambahkan" });
      }

      setDialogOpen(false);
      setEditingNews(null);
      setFormData({ title: "", content: "", image_url: "" });
      fetchNews();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Gagal menyimpan news",
      });
    }
  };

  const handlePreview = () => {
    const validation = newsSchema.safeParse(formData);
    if (!validation.success) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: validation.error.errors[0].message,
      });
      return;
    }

    setPreviewData({
      title: formData.title,
      content: formData.content,
      image_url: formData.image_url,
    });
    setPreviewOpen(true);
  };

  const handlePreviewExisting = (item: News) => {
    setPreviewData({
      title: item.title,
      content: item.content,
      image_url: item.image_url || "",
    });
    setPreviewOpen(true);
  };

  const handleEdit = (item: News) => {
    setEditingNews(item);
    setFormData({
      title: item.title,
      content: item.content,
      image_url: item.image_url || "",
    });
    setDialogOpen(true);
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from("news")
        .update({ is_active: !currentStatus })
        .eq("id", id);

      if (error) throw error;
      toast({ title: "Berhasil", description: "Status news berhasil diubah" });
      fetchNews();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Gagal mengubah status news",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from("news").delete().eq("id", id);
      if (error) throw error;
      toast({ title: "Berhasil", description: "News berhasil dihapus" });
      fetchNews();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Gagal menghapus news",
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">News Management</h1>
          <p className="text-muted-foreground">Kelola berita dan update terbaru</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingNews(null);
                setFormData({ title: "", content: "", image_url: "" });
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Tambah News
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingNews ? "Edit News" : "Tambah News"}</DialogTitle>
              <DialogDescription>
                {editingNews ? "Update informasi news" : "Buat news baru"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Judul</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  maxLength={200}
                />
              </div>
              <div>
                <Label htmlFor="content">Konten</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  required
                  rows={6}
                  maxLength={5000}
                />
              </div>
              <div>
                <Label htmlFor="image_url">URL Gambar (opsional)</Label>
                <Input
                  id="image_url"
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={handlePreview}>
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
                <Button type="submit">{editingNews ? "Update" : "Tambah"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Preview Dialog */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Preview News</DialogTitle>
            <DialogDescription>
              Tampilan news seperti yang akan dilihat pengunjung website
            </DialogDescription>
          </DialogHeader>
          {previewData && (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">{previewData.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {new Date().toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {previewData.image_url && (
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-muted">
                      <img
                        src={previewData.image_url}
                        alt={previewData.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>
                  )}
                  <div className="prose prose-sm max-w-none">
                    <p className="text-foreground whitespace-pre-wrap">{previewData.content}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setPreviewOpen(false)}>
              Tutup
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="grid gap-4">
        {news.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {new Date(item.published_at).toLocaleDateString("id-ID")}
                  </p>
                </div>
                <Badge variant={item.is_active ? "default" : "secondary"}>
                  {item.is_active ? "Active" : "Inactive"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4 line-clamp-2">{item.content}</p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => handlePreviewExisting(item)}>
                  <Eye className="w-4 h-4 mr-1" />
                  Preview
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleToggleActive(item.id, item.is_active)}
                >
                  {item.is_active ? (
                    <>
                      <EyeOff className="w-4 h-4 mr-1" />
                      Nonaktifkan
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4 mr-1" />
                      Aktifkan
                    </>
                  )}
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size="sm" variant="destructive">
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Hapus News?</AlertDialogTitle>
                      <AlertDialogDescription>
                        News ini akan dihapus permanen.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Batal</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(item.id)}>
                        Hapus
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default News;
