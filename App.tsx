
import React, { useState } from 'react';
import { User, Sparkles, Home, Users } from 'lucide-react';
import { UserRole } from './types';
import { Onboarding } from './components/Onboarding';
import { AgricultorView } from './components/views/AgricultorView';
import { CompradorView } from './components/views/CompradorView';
import { InversionistaView } from './components/views/InversionistaView';
import { ProfileView } from './components/views/ProfileView';
import { CommunityFeed } from './components/shared/CommunityFeed';
import { AIChat } from './components/AIChat';

type Tab = 'home' | 'community' | 'profile';

const App: React.FC = () => {
  const [role, setRole] = useState<UserRole | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [showChat, setShowChat] = useState(false);

  // If no role selected, show Onboarding
  if (!role) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-200 p-0 sm:p-4 font-sans">
        <div className="relative w-full max-w-md h-full sm:h-[850px] bg-white shadow-2xl overflow-hidden sm:rounded-[3rem] sm:border-[8px] sm:border-gray-900">
          <Onboarding onComplete={setRole} />
        </div>
      </div>
    );
  }

  // Navigation Config per Role
  const navConfig = {
    agricultor: { bg: 'bg-white', active: 'text-lime-600', inactive: 'text-gray-400' },
    comprador: { bg: 'bg-white', active: 'text-emerald-600', inactive: 'text-gray-400' },
    inversionista: { bg: 'bg-slate-900 border-t border-slate-800', active: 'text-cyan-400', inactive: 'text-slate-500' },
  }[role];

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
  };

  const renderContent = () => {
    if (activeTab === 'profile') return <ProfileView role={role} onLogout={() => setRole(null)} />;
    
    if (activeTab === 'community') {
      const bgClass = role === 'inversionista' ? 'bg-slate-900 min-h-full text-white' : 'bg-gray-50 min-h-full text-gray-900';
      return (
        <div className={`pt-12 px-6 ${bgClass} pb-24`}>
          <h2 className="text-2xl font-bold mb-6">Comunidad WAQI</h2>
          <CommunityFeed userRole={role} />
        </div>
      );
    }

    // Home Tab - Specific Role Views
    if (role === 'agricultor') return <AgricultorView />;
    if (role === 'comprador') return <CompradorView />;
    if (role === 'inversionista') return <InversionistaView />;
    
    return null;
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-200 p-0 sm:p-4 font-sans">
      <div className="relative w-full max-w-md h-full sm:h-[850px] bg-white shadow-2xl overflow-hidden sm:rounded-[3rem] sm:border-[8px] sm:border-gray-900 flex flex-col">
        
        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto no-scrollbar relative">
           {renderContent()}
        </div>

        {/* Floating Chat Modal */}
        <AIChat role={role} isOpen={showChat} setIsOpen={setShowChat} />

        {/* Bottom Navigation */}
        <nav className={`px-6 py-4 flex justify-between items-center z-30 ${navConfig.bg}`}>
           <button 
             onClick={() => handleTabChange('home')}
             className={`flex flex-col items-center gap-1 w-16 ${activeTab === 'home' ? navConfig.active : navConfig.inactive}`}
           >
             <Home size={24} />
             <span className="text-[10px] font-medium">Inicio</span>
           </button>

           <button 
             onClick={() => handleTabChange('community')}
             className={`flex flex-col items-center gap-1 w-16 ${activeTab === 'community' ? navConfig.active : navConfig.inactive}`}
           >
             <Users size={24} />
             <span className="text-[10px] font-medium">Comunidad</span>
           </button>

           <button 
             onClick={() => setShowChat(true)}
             className={`flex flex-col items-center gap-1 w-16 ${navConfig.inactive}`}
           >
             <div className={`p-3 rounded-full -mt-8 border-4 shadow-lg transform active:scale-95 transition-transform ${role === 'inversionista' ? 'bg-cyan-900 text-cyan-400 border-slate-900' : role === 'comprador' ? 'bg-emerald-600 text-white border-white' : 'bg-lime-500 text-white border-white'}`}>
                <Sparkles size={24} />
             </div>
             <span className="text-[10px] font-medium mt-1">IA</span>
           </button>

           <button 
             onClick={() => handleTabChange('profile')}
             className={`flex flex-col items-center gap-1 w-16 ${activeTab === 'profile' ? navConfig.active : navConfig.inactive}`}
           >
             <User size={24} />
             <span className="text-[10px] font-medium">Perfil</span>
           </button>
        </nav>

      </div>
    </div>
  );
};

export default App;
