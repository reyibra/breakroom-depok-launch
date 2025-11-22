import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Newspaper, Tag } from "lucide-react";

const Dashboard = () => {
  const [stats, setStats] = useState({
    reviews: { total: 0, pending: 0 },
    news: { total: 0, active: 0 },
    promos: { total: 0, active: 0 },
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch reviews stats
      const { count: totalReviews } = await supabase
        .from("reviews")
        .select("*", { count: "exact", head: true });
      
      const { count: pendingReviews } = await supabase
        .from("reviews")
        .select("*", { count: "exact", head: true })
        .eq("is_approved", false);

      // Fetch news stats
      const { count: totalNews } = await supabase
        .from("news")
        .select("*", { count: "exact", head: true });
      
      const { count: activeNews } = await supabase
        .from("news")
        .select("*", { count: "exact", head: true })
        .eq("is_active", true);

      // Fetch promos stats
      const { count: totalPromos } = await supabase
        .from("promos")
        .select("*", { count: "exact", head: true });
      
      const { count: activePromos } = await supabase
        .from("promos")
        .select("*", { count: "exact", head: true })
        .eq("is_active", true);

      setStats({
        reviews: { total: totalReviews || 0, pending: pendingReviews || 0 },
        news: { total: totalNews || 0, active: activeNews || 0 },
        promos: { total: totalPromos || 0, active: activePromos || 0 },
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Reviews",
      icon: MessageSquare,
      total: stats.reviews.total,
      subtitle: `${stats.reviews.pending} pending approval`,
      color: "text-blue-500",
    },
    {
      title: "News",
      icon: Newspaper,
      total: stats.news.total,
      subtitle: `${stats.news.active} active`,
      color: "text-green-500",
    },
    {
      title: "Promos",
      icon: Tag,
      total: stats.promos.total,
      subtitle: `${stats.promos.active} active`,
      color: "text-orange-500",
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-1 md:mb-2">Dashboard</h1>
        <p className="text-sm md:text-base text-muted-foreground">
          Selamat datang di Admin Panel Breakroom Depok
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.title} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {card.title}
                </CardTitle>
                <Icon className={`h-4 w-4 md:h-5 md:w-5 ${card.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl md:text-3xl font-bold">{card.total}</div>
                <p className="text-xs md:text-sm text-muted-foreground mt-1">
                  {card.subtitle}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
