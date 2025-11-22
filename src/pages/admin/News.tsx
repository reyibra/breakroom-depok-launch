import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Eye, EyeOff, Upload, X } from "lucide-react";
import { ImageCropper } from "@/components/ImageCropper";
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
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [cropperOpen, setCropperOpen] = useState(false);
  const [tempImageUrl, setTempImageUrl] = useState("");
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "File harus berupa gambar",
        });
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Ukuran file maksimal 5MB",
        });
        return;
      }

      // Create temporary URL for cropper
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempImageUrl(reader.result as string);
        setCropperOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (croppedImageBlob: Blob) => {
    // Convert blob to file
    const croppedFile = new File([croppedImageBlob], "cropped-image.jpg", {
      type: "image/jpeg",
    });
    
    setSelectedImage(croppedFile);
    
    // Create preview from cropped blob
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(croppedImageBlob);
    
    setCropperOpen(false);
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview("");
    setTempImageUrl("");
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `news/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('news-images')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('news-images')
        .getPublicUrl(fileName);

      return publicUrl;
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Gagal mengupload gambar",
      });
      return null;
    } finally {
      setUploading(false);
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
      let imageUrl = editingNews?.image_url || null;

      // Upload new image if selected
      if (selectedImage) {
        const uploadedUrl = await uploadImage(selectedImage);
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        } else {
          return; // Stop if upload failed
        }
      }

      if (editingNews) {
        const { error } = await supabase
          .from("news")
          .update({
            title: formData.title.trim(),
            content: formData.content.trim(),
            image_url: imageUrl,
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
            image_url: imageUrl,
          });

        if (error) throw error;
        toast({ title: "Berhasil", description: "News berhasil ditambahkan" });
      }

      setDialogOpen(false);
      setEditingNews(null);
      setFormData({ title: "", content: "" });
      setSelectedImage(null);
      setImagePreview("");
      setTempImageUrl("");
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
      image_url: imagePreview || (editingNews?.image_url || ""),
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
    });
    setSelectedImage(null);
    setImagePreview(item.image_url || "");
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
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-1 md:mb-2">News Management</h1>
          <p className="text-sm md:text-base text-muted-foreground">Kelola berita dan update terbaru</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingNews(null);
                setFormData({ title: "", content: "" });
                setSelectedImage(null);
                setImagePreview("");
                setTempImageUrl("");
              }}
              className="w-full sm:w-auto"
            >
              <Plus className="w-4 h-4 mr-2" />
              Tambah News
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-lg md:text-xl">{editingNews ? "Edit News" : "Tambah News"}</DialogTitle>
              <DialogDescription className="text-sm">
                {editingNews ? "Update informasi news" : "Buat news baru"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
              <div>
                <Label htmlFor="title" className="text-sm">Judul</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  maxLength={200}
                  className="text-sm"
                />
              </div>
              <div>
                <Label htmlFor="content" className="text-sm">Konten</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  required
                  rows={6}
                  maxLength={5000}
                  className="text-sm"
                />
              </div>
              <div>
                <Label htmlFor="image" className="text-sm">Gambar (opsional)</Label>
                <div className="space-y-3">
                  {imagePreview ? (
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-muted border">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <Button
                        type="button"
                        size="sm"
                        variant="destructive"
                        className="absolute top-2 right-2"
                        onClick={removeImage}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed rounded-lg p-4 md:p-6 text-center hover:border-primary transition-colors">
                      <Upload className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 text-muted-foreground" />
                      <Label
                        htmlFor="image"
                        className="cursor-pointer text-xs md:text-sm text-muted-foreground hover:text-primary"
                      >
                        Klik untuk upload gambar atau drag & drop
                        <br />
                        <span className="text-xs">PNG, JPG, WEBP (Max 5MB)</span>
                      </Label>
                      <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </div>
                  )}
                </div>
              </div>
              <DialogFooter className="flex-col sm:flex-row gap-2">
                <Button type="button" variant="outline" onClick={handlePreview} className="w-full sm:w-auto">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </Button>
                <Button type="submit" disabled={uploading} className="w-full sm:w-auto">
                  {uploading ? "Mengupload..." : editingNews ? "Update" : "Tambah"}
                </Button>
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

      {/* Image Cropper Dialog */}
      <ImageCropper
        open={cropperOpen}
        imageUrl={tempImageUrl}
        onClose={() => {
          setCropperOpen(false);
          setTempImageUrl("");
        }}
        onCropComplete={handleCropComplete}
        aspectRatio={16 / 9}
      />

      <div className="grid gap-3 md:gap-4">
        {news.map((item) => (
          <Card key={item.id}>
            <CardHeader className="pb-3 md:pb-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-base md:text-lg">{item.title}</CardTitle>
                  <p className="text-xs md:text-sm text-muted-foreground mt-1">
                    {new Date(item.published_at).toLocaleDateString("id-ID")}
                  </p>
                </div>
                <Badge variant={item.is_active ? "default" : "secondary"} className="text-xs w-fit">
                  {item.is_active ? "Active" : "Inactive"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-xs md:text-sm line-clamp-2">{item.content}</p>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" variant="outline" onClick={() => handlePreviewExisting(item)} className="text-xs h-8">
                  <Eye className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                  Preview
                </Button>
                <Button size="sm" variant="outline" onClick={() => handleEdit(item)} className="text-xs h-8">
                  <Edit className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleToggleActive(item.id, item.is_active)}
                  className="text-xs h-8"
                >
                  {item.is_active ? (
                    <>
                      <EyeOff className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                      <span className="hidden sm:inline">Nonaktifkan</span>
                      <span className="sm:hidden">Off</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                      <span className="hidden sm:inline">Aktifkan</span>
                      <span className="sm:hidden">On</span>
                    </>
                  )}
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size="sm" variant="destructive" className="text-xs h-8">
                      <Trash2 className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="max-w-[90vw] sm:max-w-lg">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-base md:text-lg">Hapus News?</AlertDialogTitle>
                      <AlertDialogDescription className="text-xs md:text-sm">
                        News ini akan dihapus permanen.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="flex-col sm:flex-row gap-2">
                      <AlertDialogCancel className="w-full sm:w-auto">Batal</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleDelete(item.id)} className="w-full sm:w-auto">
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
