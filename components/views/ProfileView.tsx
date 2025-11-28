import React from 'react';
import { User, MapPin, Mail, Phone, Shield, LogOut, ChevronRight, Bell, HelpCircle } from 'lucide-react';
import { UserRole, UserProfile } from '../../types';

interface ProfileViewProps {
  role: UserRole;
  onLogout: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ role, onLogout }) => {
  // Mock Profile Data
  const profile: UserProfile = {
    name: 'Sebastián Campos',
    location: 'Los Ríos, Ecuador',
    role: role,
    email: 'sebastian.campos@gmail.com',
    phone: '+593 99 123 4567',
    avatar: 'SC',
    joinDate: 'Enero 2023',
    verified: true
  };

  const roleColor = role === 'agricultor' ? 'text-lime-600' : role === 'comprador' ? 'text-emerald-600' : 'text-blue-600';
  const roleBg = role === 'agricultor' ? 'bg-lime-50' : role === 'comprador' ? 'bg-emerald-50' : 'bg-blue-50';

  return (
    <div className="bg-gray-50 min-h-full pb-24">
      <div className="bg-white px-6 pt-12 pb-8 rounded-b-[2.5rem] shadow-sm mb-6">
        <div className="flex flex-col items-center">
          <div className={`h-24 w-24 ${roleBg} rounded-full flex items-center justify-center text-3xl font-bold ${roleColor} mb-4 ring-4 ring-white shadow-lg`}>
            {profile.avatar}
          </div>
          <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
          <p className="text-gray-500 flex items-center gap-1 text-sm mt-1">
            <MapPin size={14} /> {profile.location}
          </p>
          <div className={`mt-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${roleBg} ${roleColor}`}>
            {profile.role}
          </div>
        </div>
      </div>

      <div className="px-6 space-y-4">
        {/* Account Info */}
        <section>
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3 ml-2">Cuenta</h3>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-50 flex items-center gap-3">
              <div className="bg-gray-50 p-2 rounded-lg text-gray-600"><Mail size={18} /></div>
              <div className="flex-1">
                <p className="text-xs text-gray-400">Correo</p>
                <p className="text-sm font-medium text-gray-800">{profile.email}</p>
              </div>
            </div>
            <div className="p-4 flex items-center gap-3">
              <div className="bg-gray-50 p-2 rounded-lg text-gray-600"><Phone size={18} /></div>
              <div className="flex-1">
                <p className="text-xs text-gray-400">Teléfono</p>
                <p className="text-sm font-medium text-gray-800">{profile.phone}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Settings */}
        <section>
          <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3 ml-2">Configuración</h3>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {[
              { icon: Bell, label: 'Notificaciones', val: 'Activadas' },
              { icon: Shield, label: 'Seguridad y Privacidad', val: '' },
              { icon: HelpCircle, label: 'Ayuda y Soporte', val: '' },
            ].map((item, i) => (
              <button key={i} className="w-full p-4 border-b border-gray-50 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${roleBg} ${roleColor}`}>
                    <item.icon size={18} />
                  </div>
                  <span className="text-sm font-medium text-gray-800">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">{item.val}</span>
                  <ChevronRight size={16} className="text-gray-300" />
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Logout */}
        <button 
          onClick={onLogout}
          className="w-full bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center gap-2 text-red-500 font-medium hover:bg-red-50 transition-colors"
        >
          <LogOut size={18} />
          Cerrar Sesión
        </button>
        
        <p className="text-center text-xs text-gray-400 pt-4">Versión 1.0.2 - WAQI App</p>
      </div>
    </div>
  );
};