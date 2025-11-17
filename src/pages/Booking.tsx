import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { CalendarIcon, Clock, Users, CreditCard } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { format } from "date-fns";
import { id } from "date-fns/locale";

const Booking = () => {
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    room: "",
    time: "",
    participants: "1",
    notes: "",
  });
  const { toast } = useToast();

  const rooms = [
    { id: "classic", name: "Classic Room", price: "Rp 150.000", duration: "30 menit" },
    { id: "premium", name: "Premium Room", price: "Rp 250.000", duration: "45 menit" },
  ];

  const timeSlots = [
    "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", 
    "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !formData.name || !formData.email || !formData.phone || !formData.room || !formData.time) {
      toast({
        title: "Form Tidak Lengkap",
        description: "Mohon lengkapi semua field yang wajib diisi",
        variant: "destructive",
      });
      return;
    }

    // In production, this would call your booking API
    toast({
      title: "Booking Berhasil!",
      description: `Terima kasih ${formData.name}! Kami akan mengirimkan konfirmasi ke email Anda.`,
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      room: "",
      time: "",
      participants: "1",
      notes: "",
    });
    setDate(undefined);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const selectedRoom = rooms.find(r => r.id === formData.room);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        {/* Hero */}
        <section className="py-12 px-4 bg-gradient-to-b from-background to-card">
          <div className="container mx-auto max-w-4xl text-center">
            <Badge className="mb-4 bg-primary text-primary-foreground">Booking Online</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Booking <span className="text-gradient">Sesi</span> Anda
            </h1>
            <p className="text-lg text-muted-foreground">
              Isi form di bawah ini untuk mengamankan slot Anda
            </p>
          </div>
        </section>

        {/* Booking Form */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-6xl">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Form */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Personal Info */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Informasi Pribadi</CardTitle>
                      <CardDescription>Masukkan data diri Anda</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="name">Nama Lengkap *</Label>
                        <Input 
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange("name", e.target.value)}
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="email">Email *</Label>
                          <Input 
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            placeholder="john@example.com"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Nomor Telepon *</Label>
                          <Input 
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            placeholder="08123456789"
                            required
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Booking Details */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Detail Booking</CardTitle>
                      <CardDescription>Pilih ruangan, tanggal, dan waktu</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="room">Pilih Ruangan *</Label>
                        <Select value={formData.room} onValueChange={(value) => handleInputChange("room", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih ruangan" />
                          </SelectTrigger>
                          <SelectContent>
                            {rooms.map((room) => (
                              <SelectItem key={room.id} value={room.id}>
                                {room.name} - {room.price} / {room.duration}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="mb-2 block">Pilih Tanggal *</Label>
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                          className="rounded-md border"
                          locale={id}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="time">Pilih Waktu *</Label>
                          <Select value={formData.time} onValueChange={(value) => handleInputChange("time", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Pilih waktu" />
                            </SelectTrigger>
                            <SelectContent>
                              {timeSlots.map((time) => (
                                <SelectItem key={time} value={time}>
                                  {time} WIB
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="participants">Jumlah Peserta</Label>
                          <Select value={formData.participants} onValueChange={(value) => handleInputChange("participants", value)}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1 orang</SelectItem>
                              <SelectItem value="2">2 orang</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="notes">Catatan (Opsional)</Label>
                        <Textarea 
                          id="notes"
                          value={formData.notes}
                          onChange={(e) => handleInputChange("notes", e.target.value)}
                          placeholder="Ada permintaan khusus? Tuliskan di sini..."
                          rows={4}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Summary Sidebar */}
                <div className="lg:col-span-1">
                  <Card className="sticky top-24">
                    <CardHeader>
                      <CardTitle>Ringkasan Booking</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {selectedRoom ? (
                        <>
                          <div>
                            <div className="text-sm text-muted-foreground mb-1">Ruangan</div>
                            <div className="font-bold">{selectedRoom.name}</div>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="w-4 h-4 text-primary" />
                            <span>{selectedRoom.duration}</span>
                          </div>
                        </>
                      ) : (
                        <div className="text-sm text-muted-foreground">Pilih ruangan terlebih dahulu</div>
                      )}

                      {date && (
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Tanggal</div>
                          <div className="font-medium flex items-center gap-2">
                            <CalendarIcon className="w-4 h-4 text-primary" />
                            {format(date, "dd MMMM yyyy", { locale: id })}
                          </div>
                        </div>
                      )}

                      {formData.time && (
                        <div>
                          <div className="text-sm text-muted-foreground mb-1">Waktu</div>
                          <div className="font-medium">{formData.time} WIB</div>
                        </div>
                      )}

                      <div className="flex items-center gap-2 text-sm">
                        <Users className="w-4 h-4 text-primary" />
                        <span>{formData.participants} peserta</span>
                      </div>

                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-bold">Total</span>
                          <span className="text-2xl font-bold text-primary">
                            {selectedRoom ? selectedRoom.price : "Rp 0"}
                          </span>
                        </div>
                        <Button type="submit" variant="hero" className="w-full" size="lg">
                          <CreditCard className="w-4 h-4 mr-2" />
                          Konfirmasi Booking
                        </Button>
                      </div>

                      <div className="text-xs text-muted-foreground space-y-1">
                        <p>* Pembayaran dilakukan di lokasi</p>
                        <p>* Konfirmasi akan dikirim via email & WhatsApp</p>
                        <p>* Reschedule maksimal H-1</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Booking;
