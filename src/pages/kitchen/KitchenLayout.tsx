import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    ShoppingCart,
    LogOut,
    Menu,
    X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

const KitchenLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { user, profile, signOut } = useAuth();

    const navigation = [
        { name: 'Dashboard', href: '/kitchen', icon: LayoutDashboard },
        { name: 'Orders', href: '/kitchen/orders', icon: ShoppingCart },
    ];

    const handleLogout = () => {
        signOut();
        navigate('/auth');
    };

    const isActive = (path: string) => {
        if (path === '/kitchen') {
            return location.pathname === '/kitchen';
        }
        return location.pathname.startsWith(path);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile sidebar backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
                <div className="flex items-center justify-between h-16 px-6 border-b">
                    <h2 className="text-xl font-bold text-gray-900">Kitchen Panel</h2>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden"
                    >
                        <X className="w-4 h-4" />
                    </Button>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2">
                    {navigation.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`
                  flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors
                  ${isActive(item.href)
                                        ? 'bg-primary text-primary-foreground'
                                        : 'text-gray-700 hover:bg-gray-100'
                                    }
                `}
                                onClick={() => setSidebarOpen(false)}
                            >
                                <Icon className="mr-3 h-5 w-5" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t">
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                                    <span className="text-primary-foreground text-sm font-medium">
                                        {profile?.full_name?.charAt(0) || user?.email?.charAt(0) || 'K'}
                                    </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">
                                        {profile?.full_name || 'Kitchen Staff'}
                                    </p>
                                    <p className="text-xs text-gray-500 truncate">
                                        {user?.email || 'kitchen@jabber.com'}
                                    </p>
                                </div>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleLogout}
                                className="w-full mt-3"
                            >
                                <LogOut className="w-4 h-4 mr-2" />
                                Logout
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Main content */}
            <div className="lg:ml-64">
                {/* Top bar */}
                <div className="sticky top-0 z-30 flex items-center h-16 px-6 bg-white border-b">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden"
                    >
                        <Menu className="w-5 h-5" />
                    </Button>

                    <div className="ml-auto flex items-center space-x-4">
                        <span className="text-sm text-gray-500">Jabber Afghani Kitchen</span>
                    </div>
                </div>

                {/* Page content */}
                <main className="p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default KitchenLayout;
