import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
    ChartBarIcon,
    BellIcon,
    ArrowRightOnRectangleIcon,
    PlusIcon,
    UserGroupIcon,
    ChartPieIcon,
    Cog6ToothIcon
} from '@heroicons/react/24/outline';

export function Dashboard() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');

    const handleLogout = () => {
        navigate('/login');
    };

    const stats = [
        { name: 'Total Users', value: '12,847', change: '+12%', changeType: 'positive', icon: '👥' },
        { name: 'Active Sessions', value: '2,847', change: '+8%', changeType: 'positive', icon: '🟢' },
        { name: 'Revenue', value: '$89,432', change: '+23%', changeType: 'positive', icon: '💰' },
        { name: 'Conversion Rate', value: '3.2%', change: '-2%', changeType: 'negative', icon: '📈' }
    ];

    const recentActivities = [
        { id: 1, user: 'John Doe', action: 'Created new project', time: '2 minutes ago', avatar: '👤' },
        { id: 2, user: 'Jane Smith', action: 'Updated profile', time: '5 minutes ago', avatar: '👤' },
        { id: 3, user: 'Mike Johnson', action: 'Completed task', time: '10 minutes ago', avatar: '👤' },
        { id: 4, user: 'Sarah Wilson', action: 'Joined team', time: '15 minutes ago', avatar: '👤' }
    ];

    const quickActions = [
        { name: 'Create Project', icon: PlusIcon, color: 'bg-blue-500' },
        { name: 'Invite Team', icon: UserGroupIcon, color: 'bg-green-500' },
        { name: 'View Reports', icon: ChartPieIcon, color: 'bg-purple-500' },
        { name: 'Settings', icon: Cog6ToothIcon, color: 'bg-gray-500' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-4">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <ChartBarIcon className="w-5 h-5 text-white" />
                            </div>
                            <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
                        </div>

                        <div className="flex items-center space-x-4">
                            <button className="p-2 text-gray-400 hover:text-gray-500 relative">
                                <BellIcon className="w-6 h-6" />
                                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400"></span>
                            </button>

                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                                    MH
                                </div>
                                <span className="text-sm font-medium text-gray-700">Muhammad Hamza</span>
                            </div>

                            <button
                                onClick={handleLogout}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2"
                            >
                                <ArrowRightOnRectangleIcon className="w-4 h-4" />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Hamza! 👋</h2>
                    <p className="text-gray-600">Here's what's happening with your projects today.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                                    <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                                </div>
                                <div className="text-2xl">{stat.icon}</div>
                            </div>
                            <div className="mt-4 flex items-center">
                                <span className={`text-sm font-medium ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                                    }`}>
                                    {stat.change}
                                </span>
                                <span className="text-sm text-gray-500 ml-1">from last month</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {quickActions.map((action, index) => (
                            <button
                                key={index}
                                className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-all duration-200 transform hover:scale-105"
                            >
                                <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center text-white text-xl mb-3 mx-auto`}>
                                    <action.icon className="w-6 h-6" />
                                </div>
                                <p className="text-sm font-medium text-gray-900">{action.name}</p>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                            <div className="space-y-4">
                                {recentActivities.map((activity) => (
                                    <div key={activity.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-lg">
                                            {activity.avatar}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                                            <p className="text-sm text-gray-600">{activity.action}</p>
                                        </div>
                                        <span className="text-xs text-gray-500">{activity.time}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Progress</h3>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-600">Tasks Completed</span>
                                        <span className="text-gray-900 font-medium">75%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-600">Goals Achieved</span>
                                        <span className="text-gray-900 font-medium">60%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-600">Team Collaboration</span>
                                        <span className="text-gray-900 font-medium">90%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div className="bg-purple-600 h-2 rounded-full" style={{ width: '90%' }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
                            <h3 className="text-lg font-semibold mb-2">Today's Weather</h3>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-3xl font-bold">72°F</p>
                                    <p className="text-sm opacity-90">Partly Cloudy</p>
                                </div>
                                <div className="text-4xl">☀️</div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}