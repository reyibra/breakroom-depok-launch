import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Eye, EyeOff, MessageCircleQuestion } from "lucide-react";
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

const faqSchema = z.object({
  question: z.string().trim().min(1, "Pertanyaan harus diisi").max(500, "Pertanyaan maksimal 500 karakter"),
  answer: z.string().trim().min(1, "Jawaban harus diisi").max(2000, "Jawaban maksimal 2000 karakter"),
  category: z.string().trim().max(100, "Kategori maksimal 100 karakter").optional(),
  display_order: z.number().min(0, "Urutan minimal 0"),
});

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
}

const FAQs = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    category: "",
    display_order: 0,
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const { data, error } = await supabase
        .from("faqs")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;
      setFaqs(data || []);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Gagal mengambil data FAQ",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validation = faqSchema.safeParse(formData);
    if (!validation.success) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: validation.error.errors[0].message,
      });
      return;
    }

    try {
      if (editingFAQ) {
        const { error } = await supabase
          .from("faqs")
          .update({
            question: formData.question.trim(),
            answer: formData.answer.trim(),
            category: formData.category.trim() || null,
            display_order: formData.display_order,
          })
          .eq("id", editingFAQ.id);

        if (error) throw error;
        toast({ title: "Berhasil", description: "FAQ berhasil diupdate" });
      } else {
        const { error } = await supabase
          .from("faqs")
          .insert({
            question: formData.question.trim(),
            answer: formData.answer.trim(),
            category: formData.category.trim() || null,
            display_order: formData.display_order,
          });

        if (error) throw error;
        toast({ title: "Berhasil", description: "FAQ berhasil ditambahkan" });
      }

      setDialogOpen(false);
      setEditingFAQ(null);
      setFormData({ question: "", answer: "", category: "", display_order: 0 });
      fetchFAQs();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Gagal menyimpan FAQ",
      });
    }
  };

  const handleEdit = (item: FAQ) => {
    setEditingFAQ(item);
    setFormData({
      question: item.question,
      answer: item.answer,
      category: item.category || "",
      display_order: item.display_order,
    });
    setDialogOpen(true);
  };

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from("faqs")
        .update({ is_active: !currentStatus })
        .eq("id", id);

      if (error) throw error;
      toast({ title: "Berhasil", description: "Status FAQ berhasil diubah" });
      fetchFAQs();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Gagal mengubah status FAQ",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from("faqs").delete().eq("id", id);
      if (error) throw error;
      toast({ title: "Berhasil", description: "FAQ berhasil dihapus" });
      fetchFAQs();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Gagal menghapus FAQ",
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  // Group FAQs by category
  const groupedFAQs = faqs.reduce((acc, faq) => {
    const category = faq.category || "Umum";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(faq);
    return acc;
  }, {} as Record<string, FAQ[]>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">FAQ Management</h1>
          <p className="text-muted-foreground">Kelola pertanyaan yang sering ditanyakan</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingFAQ(null);
                setFormData({ question: "", answer: "", category: "", display_order: 0 });
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Tambah FAQ
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingFAQ ? "Edit FAQ" : "Tambah FAQ"}</DialogTitle>
              <DialogDescription>
                {editingFAQ ? "Update informasi FAQ" : "Tambah pertanyaan dan jawaban baru"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="category">Kategori (opsional)</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  maxLength={100}
                  placeholder="Umum, Pembayaran, Keamanan, dll"
                />
              </div>
              <div>
                <Label htmlFor="question">Pertanyaan</Label>
                <Textarea
                  id="question"
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  required
                  rows={3}
                  maxLength={500}
                />
              </div>
              <div>
                <Label htmlFor="answer">Jawaban</Label>
                <Textarea
                  id="answer"
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  required
                  rows={6}
                  maxLength={2000}
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
              <DialogFooter>
                <Button type="submit">{editingFAQ ? "Update" : "Tambah"}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-6">
        {Object.entries(groupedFAQs).map(([category, categoryFAQs]) => (
          <div key={category} className="space-y-4">
            <div className="flex items-center gap-2">
              <MessageCircleQuestion className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-semibold">{category}</h2>
              <Badge variant="outline">{categoryFAQs.length}</Badge>
            </div>
            <div className="grid gap-4">
              {categoryFAQs.map((item) => (
                <Card key={item.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{item.question}</CardTitle>
                      </div>
                      <Badge variant={item.is_active ? "default" : "secondary"}>
                        {item.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-4 whitespace-pre-wrap">{item.answer}</p>
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
                            <AlertDialogTitle>Hapus FAQ?</AlertDialogTitle>
                            <AlertDialogDescription>
                              FAQ ini akan dihapus permanen.
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
        ))}
      </div>
    </div>
  );
};

export default FAQs;
