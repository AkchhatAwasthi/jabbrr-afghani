import { useState, useEffect } from 'react';
import {
    ShoppingCart,
    Clock,
    CheckCircle2,
    AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const KitchenDashboard = () => {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        pending: 0,
        preparing: 0,
        ready: 0,
        completed: 0
    });
    const [recentOrders, setRecentOrders] = useState([]);
    const { kitchenId } = useAuth();
    const { toast } = useToast();

    useEffect(() => {
        fetchDashboardData();

        // Set up real-time subscription for orders
        const subscription = supabase
            .channel('kitchen-dashboard')
            .on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'orders'
            }, () => {
                fetchDashboardData();
            })
            .subscribe();

        return () => {
            subscription.unsubscribe();
        };
    }, [kitchenId]);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);

            let query = supabase
                .from('orders')
                .select('*')
                .order('created_at', { ascending: false });

            // If kitchenId is present, filter by kitchen (assuming orders have kitchen_id or similar logic)
            // Note: In a real implementation, orders would be assigned to a kitchen.
            // For now, we'll fetch all active orders suitable for kitchen processing.

            const { data: orders, error } = await query;

            if (error) throw error;

            // Filter orders based on status
            const pending = orders?.filter(o => o.order_status === 'pending' || o.order_status === 'placed').length || 0;
            const preparing = orders?.filter(o => o.order_status === 'preparing').length || 0;
            const ready = orders?.filter(o => o.order_status === 'ready').length || 0;
            const completed = orders?.filter(o => o.order_status === 'delivered' || o.order_status === 'completed').length || 0;

            setStats({ pending, preparing, ready, completed });

            // Recent active orders
            const activeOrders = orders?.filter(o =>
                ['pending', 'placed', 'preparing', 'ready'].includes(o.order_status)
            ).slice(0, 5) || [];

            const formattedOrders = activeOrders.map(order => ({
                id: order.order_number,
                customer: (order.customer_info as any)?.name || 'Unknown',
                items: Array.isArray(order.items) ? order.items.length : 0,
                status: order.order_status,
                time: new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }));

            setRecentOrders(formattedOrders as any);

        } catch (error) {
            console.error('Error fetching kitchen data:', error);
            toast({
                title: "Error",
                description: "Failed to load dashboard data",
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'ready': return 'bg-green-100 text-green-800';
            case 'preparing': return 'bg-yellow-100 text-yellow-800';
            case 'pending':
            case 'placed': return 'bg-orange-100 text-orange-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Kitchen Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="border-l-4 border-l-orange-500">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
                        <AlertCircle className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.pending}</div>
                        <p className="text-xs text-muted-foreground">Requires attention</p>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-yellow-500">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Preparing</CardTitle>
                        <Clock className="h-4 w-4 text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.preparing}</div>
                        <p className="text-xs text-muted-foreground">Currently cooking</p>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-green-500">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Ready for Pickup</CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.ready}</div>
                        <p className="text-xs text-muted-foreground">Waiting for delivery</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
                        <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.completed}</div>
                        <p className="text-xs text-muted-foreground">Delivered successfully</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Active Orders</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {recentOrders.length === 0 ? (
                            <p className="text-center text-muted-foreground py-4">No active orders</p>
                        ) : (
                            recentOrders.map((order: any) => (
                                <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg bg-card hover:bg-accent/5 transition-colors">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-lg">{order.id}</span>
                                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)} uppercase`}>
                                                {order.status}
                                            </span>
                                        </div>
                                        <p className="text-sm text-muted-foreground">{order.customer}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium">{order.items} Items</p>
                                        <p className="text-sm text-muted-foreground">{order.time}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default KitchenDashboard;
