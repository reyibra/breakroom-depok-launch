import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Eye, EyeOff, Tag } from "lucide-react";
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

const promoSchema = z.object({
  title: z.string().trim().min(1, "Judul harus diisi").max(200, "Judul maksimal 200 karakter"),
  description: z.string().trim().min(1, "Deskripsi harus diisi").max(1000, "Deskripsi maksimal 1000 karakter"),
  discount_percentage: z.number().min(0, "Diskon minimal 0%").max(100, "Diskon maksimal 100%").optional(),
  start_date: z.string().min(1, "Tanggal mulai harus diisi"),
  end_date: z.string().min(1, "Tanggal berakhir harus diisi"),
  image_url: z.string().trim().url("URL gambar tidak valid").optional().or(z.literal("")),
});

interface Promo {
  id: string;
  title: string;
  description: string;
  discount_percentage: number | null;
  start_date: string;
  end_date: string;
  image_url: string | null;
  is_active: boolean;
  created_at: string;
}

const Promos = () => {
  const [promos, setPromos] = useState<Promo[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPromo, setEditingPromo] = useState<Promo | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    discount_percentage: "",
    start_date: "",
    end_date: "",
    image_url: "",
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchPromos();
  }, []);

  const fetchPromos = async () => {
    try {
      const { data, error } = await supabase
        .from("promos")
        .select("*")
        .order("start_date", { ascending: false });

      if (error) throw error;
      setPromos(data || []);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Gagal mengambil data promos",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = promoSchema.safeParse({
      ...formData,
      discount_percentage: formData.discount_percentage ? Number(formData.discount_percentage) : undefined,
    });
    
    if (!validation.success) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: validation.error.errors[0].message,
      });
      return;
    }

    try {
      if (editingPromo) {
        const { error } = await supabase
          .from("promos")
          .update({
            title: formData.title.trim(),
            description: formData.description.trim(),
            discount_percentage: formData.discount_percentage ? Number(formData.discount_percentage) : null,
            start_date: formData.start_date,
            end_date: formData.end_date,
            image_url: formData.image_url.trim() || null,
          })
          .eq("id", editingPromo.id);

        if (error) throw error;
        toast({ title: "Berhasil", description: "Promo berhasil diupdate" });
      } else {
        const { error } = await supabase
          .from("promos")
          .insert({
            title: formData.title.trim(),
            description: formData.description.trim(),
            discount_percentage: formData.discount_percentage ? Number(formData.discount_percentage) : null,
            start_date: formData.start_date,
            end_date: formData.end_date,
            image_url: formData.image_url.trim() || null,
          });

        if (error) throw error;
        toast({ title: "Berhasil", description: "Promo berhasil ditambahkan" });
      }

      setDialogOpen(false);
      setEditingPromo(null);
      setFormData({ title: "", description: "", discount_percentage: "", start_date: "", end_date: "", image_url: "" });
      fetchPromos();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Gagal menyimpan promo",
      });
    }
  };

  const handleEdit = (item: Promo) => {
    setEditingPromo(item);
    setFormData({
      title: item.title,
      description: item.description,
      discount_percentage: item.discount_percentage?.toString() || "",
      start_date: item.start_date.split("T")[0],
      end_date: item.end_date.split("T")[0],
      image_url: item.image_url || "",
    });
    setDialogOpen(true);
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from("promos")
        .update({ is_active: !currentStatus })
        .eq("id", id);

      if (error) throw error;
      toast({ title: "Berhasil", description: "Status promo berhasil diubah" });
      fetchPromos();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Gagal mengubah status promo",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from("promos").delete().eq("id", id);
      if (error) throw error;
      toast({ title: "Berhasil", description: "Promo berhasil dihapus" });
      fetchPromos();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Gagal menghapus promo",
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
          <h1 className="text-3xl font-bold mb-2">Promos Management</h1>
          <p className="text-muted-foreground">Kelola promo dan diskon</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingPromo(null);
                setFormData({ title: "", description: "", discount_percentage: "", start_date: "", end_date: "", image_url: "" });
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Tambah Promo
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingPromo ? "Edit Promo" : "Tambah Promo"}</DialogTitle>
              <DialogDescription>
                {editingPromo ? "Update informasi promo" : "Buat promo baru"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Judul Promo</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  maxLength={200}
                />
              </div>
              <div>
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows={4}
                  maxLength={1000}
                />
              </div>
              <div>
                <Label htmlFor="discount_percentage">Persentase Diskon (%) - opsional</Label>
                <Input
                  id="discount_percentage"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.discount_percentage}
                  onChange={(e) => setFormData({ ...formData, discount_percentage: e.target.value })}
                  placeholder="20"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="start_date">Tanggal Mulai</Label>
                  <Input
                    id="start_date"
                    type="date"
                    value={formData.start_date}
                    onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="end_date">Tanggal Berakhir</Label>
                  <Input
                    id="end_date"
                    type="date"
                    value={formData.end_date}
                    onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                    required
                  />
                </div>
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
                <Button type="submit">{editingPromo ? "Update" : "Tambah"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {promos.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                    {item.discount_percentage && (
                      <Badge variant="secondary" className="bg-caution text-background">
                        <Tag className="w-3 h-3 mr-1" />
                        {item.discount_percentage}%
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {new Date(item.start_date).toLocaleDateString("id-ID")} - {new Date(item.end_date).toLocaleDateString("id-ID")}
                  </p>
                </div>
                <Badge variant={item.is_active ? "default" : "secondary"}>
                  {item.is_active ? "Active" : "Inactive"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-4 line-clamp-2">{item.description}</p>
              <div className="flex gap-2">
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
                      <AlertDialogTitle>Hapus Promo?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Promo ini akan dihapus permanen.
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

export default Promos;
