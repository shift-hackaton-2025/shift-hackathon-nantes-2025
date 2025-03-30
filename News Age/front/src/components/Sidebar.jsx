import { NavLink } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Database, 
  Users, 
  Bell, 
  Settings as SettingsIcon,
  Search
} from 'lucide-react'
import { useState } from 'react'

const menuItems = [
  { path: '/', label: 'Mes Veilles', icon: LayoutDashboard },
  { path: '/sources', label: 'Sources', icon: Database },
  { path: '/collaborations', label: 'Collaborations', icon: Users },
  { path: '/notifications', label: 'Notifications', icon: Bell },
  { path: '/settings', label: 'Paramètres', icon: SettingsIcon },
]

function Sidebar() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <aside className="w-64 bg-gradient-to-b from-black via-violet to-black text-white p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white/90">News Age</h1>
        <div className="mt-4 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher..."
            className="w-full bg-white/10 text-white placeholder-white/50 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/20"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
        </div>
      </div>
      <nav className="space-y-2">
        {menuItems.map(({ path, label, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all
              ${isActive 
                ? 'bg-white/10 text-white' 
                : 'hover:bg-white/5 text-white/80 hover:text-white'
              }`
            }
          >
            <Icon size={20} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar