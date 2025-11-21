import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Eye, EyeOff, Upload, X, Image, Video } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";

const gallerySchema = z.object({
  title: z.string().trim().min(1, "Judul harus diisi").max(200, "Judul maksimal 200 karakter"),
  description: z.string().trim().max(500, "Deskripsi maksimal 500 karakter").optional(),
  media_type: z.enum(["image", "video"], { required_error: "Tipe media harus dipilih" }),
  display_order: z.number().min(0, "Urutan minimal 0"),
});

interface Gallery {
  id: string;
  title: string;
  description: string | null;
  media_url: string;
  media_type: string;
  is_active: boolean;
  display_order: number;
  created_at: string;
}

const Gallery = () => {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingGallery, setEditingGallery] = useState<Gallery | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    media_type: "image" as "image" | "video",
    display_order: 0,
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [cropperOpen, setCropperOpen] = useState(false);
  const [tempImageUrl, setTempImageUrl] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    try {
      const { data, error } = await supabase
        .from("galleries")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      setGalleries(data || []);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Gagal mengambil data gallery",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const isImage = file.type.startsWith("image/");
      const isVideo = file.type.startsWith("video/");

      if (!isImage && !isVideo) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "File harus berupa gambar atau video",
        });
        return;
      }

      if (file.size > 20 * 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Ukuran file maksimal 20MB",
        });
        return;
      }

      if (isImage) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setTempImageUrl(reader.result as string);
          setCropperOpen(true);
        };
        reader.readAsDataURL(file);
      } else {
        setSelectedFile(file);
        setFilePreview(URL.createObjectURL(file));
        setFormData({ ...formData, media_type: "video" });
      }
    }
  };

  const handleCropComplete = (croppedImageBlob: Blob) => {
    const croppedFile = new File([croppedImageBlob], "cropped-image.jpg", {
      type: "image/jpeg",
    });
    
    setSelectedFile(croppedFile);
    setFormData({ ...formData, media_type: "image" });
    
    const reader = new FileReader();
    reader.onloadend = () => {
      setFilePreview(reader.result as string);
    };
    reader.readAsDataURL(croppedImageBlob);
    
    setCropperOpen(false);
  };

  const removeFile = () => {
    setSelectedFile(null);
    setFilePreview("");
    setTempImageUrl("");
  };

  const uploadFile = async (file: File): Promise<string | null> => {
    try {
      setUploading(true);
      const fileExt = file.name.split(".").pop();
      const fileName = `gallery/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("news-images")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("news-images")
        .getPublicUrl(fileName);

      return publicUrl;
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Gagal mengupload file",
      });
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = gallerySchema.safeParse(formData);
    if (!validation.success) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: validation.error.errors[0].message,
      });
      return;
    }

    if (!editingGallery && !selectedFile) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "File media harus dipilih",
      });
      return;
    }

    try {
      let mediaUrl = editingGallery?.media_url || null;

      if (selectedFile) {
        const uploadedUrl = await uploadFile(selectedFile);
        if (uploadedUrl) {
          mediaUrl = uploadedUrl;
        } else {
          return;
        }
      }

      if (editingGallery) {
        const { error } = await supabase
          .from("galleries")
          .update({
            title: formData.title.trim(),
            description: formData.description.trim() || null,
            media_url: mediaUrl,
            media_type: formData.media_type,
            display_order: formData.display_order,
          })
          .eq("id", editingGallery.id);

        if (error) throw error;
        toast({ title: "Berhasil", description: "Gallery berhasil diupdate" });
      } else {
        const { error } = await supabase
          .from("galleries")
          .insert({
            title: formData.title.trim(),
            description: formData.description.trim() || null,
            media_url: mediaUrl!,
            media_type: formData.media_type,
            display_order: formData.display_order,
          });

        if (error) throw error;
        toast({ title: "Berhasil", description: "Gallery berhasil ditambahkan" });
      }

      setDialogOpen(false);
      setEditingGallery(null);
      setFormData({ title: "", description: "", media_type: "image", display_order: 0 });
      setSelectedFile(null);
      setFilePreview("");
      setTempImageUrl("");
      fetchGalleries();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Gagal menyimpan gallery",
      });
    }
  };

  const handleEdit = (item: Gallery) => {
    setEditingGallery(item);
    setFormData({
      title: item.title,
      description: item.description || "",
      media_type: item.media_type as "image" | "video",
      display_order: item.display_order,
    });
    setSelectedFile(null);
    setFilePreview(item.media_url);
    setDialogOpen(true);
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from("galleries")
        .update({ is_active: !currentStatus })
        .eq("id", id);

      if (error) throw error;
      toast({ title: "Berhasil", description: "Status gallery berhasil diubah" });
      fetchGalleries();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Gagal mengubah status gallery",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from("galleries").delete().eq("id", id);
      if (error) throw error;
      toast({ title: "Berhasil", description: "Gallery berhasil dihapus" });
      fetchGalleries();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Gagal menghapus gallery",
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
          <h1 className="text-3xl font-bold mb-2">Gallery Management</h1>
          <p className="text-muted-foreground">Kelola foto dan video gallery</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingGallery(null);
                setFormData({ title: "", description: "", media_type: "image", display_order: 0 });
                setSelectedFile(null);
                setFilePreview("");
                setTempImageUrl("");
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Tambah Gallery
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingGallery ? "Edit Gallery" : "Tambah Gallery"}</DialogTitle>
              <DialogDescription>
                {editingGallery ? "Update informasi gallery" : "Tambah foto atau video baru"}
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
                <Label htmlFor="description">Deskripsi (opsional)</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  maxLength={500}
                />
              </div>
              <div>
                <Label htmlFor="display_order">Urutan Tampilan</Label>
                <Input
                  id="display_order"
                  type="number"
                  min="0"
                  value={formData.display_order}
                  onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div>
                <Label htmlFor="file">
                  {editingGallery ? "Ganti File (opsional)" : "Upload File"}
                </Label>
                <div className="space-y-3">
                  {filePreview ? (
                    <div className="relative w-full rounded-lg overflow-hidden bg-muted border">
                      {formData.media_type === "image" ? (
                        <img
                          src={filePreview}
                          alt="Preview"
                          className="w-full h-64 object-cover"
                        />
                      ) : (
                        <video
                          src={filePreview}
                          className="w-full h-64 object-cover"
                          controls
                        />
                      )}
                      <Button
                        type="button"
                        size="sm"
                        variant="destructive"
                        className="absolute top-2 right-2"
                        onClick={removeFile}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary transition-colors">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <Label
                        htmlFor="file"
                        className="cursor-pointer text-sm text-muted-foreground hover:text-primary"
                      >
                        Klik untuk upload gambar atau video
                        <br />
                        <span className="text-xs">PNG, JPG, WEBP, MP4, WEBM (Max 20MB)</span>
                      </Label>
                      <Input
                        id="file"
                        type="file"
                        accept="image/*,video/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </div>
                  )}
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={uploading}>
                  {uploading ? "Mengupload..." : editingGallery ? "Update" : "Tambah"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {galleries.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg line-clamp-1">{item.title}</CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className="text-xs">
                      {item.media_type === "image" ? (
                        <>
                          <Image className="w-3 h-3 mr-1" />
                          Image
                        </>
                      ) : (
                        <>
                          <Video className="w-3 h-3 mr-1" />
                          Video
                        </>
                      )}
                    </Badge>
                    <Badge variant={item.is_active ? "default" : "secondary"}>
                      {item.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-muted mb-3">
                {item.media_type === "image" ? (
                  <img
                    src={item.media_url}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <video
                    src={item.media_url}
                    className="w-full h-full object-cover"
                    controls
                  />
                )}
              </div>
              {item.description && (
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item.description}</p>
              )}
              <div className="flex flex-wrap gap-2">
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
                      Hide
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4 mr-1" />
                      Show
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
                      <AlertDialogTitle>Hapus Gallery?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Gallery ini akan dihapus permanen.
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

export default Gallery;
