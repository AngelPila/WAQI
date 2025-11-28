import React from 'react';
import { MessageSquare, Heart, Share2, MoreHorizontal } from 'lucide-react';
import { Post, UserRole } from '../../types';

const MOCK_POSTS: Post[] = [
  { id: '1', author: 'Juan Pérez', role: 'agricultor', content: '¿Alguien sabe qué precio está cerrando el maíz en Quevedo hoy?', likes: 12, comments: 4, type: 'aviso', timeAgo: '2h' },
  { id: '2', author: 'AgroInsumos SA', role: 'comprador', content: 'Compramos soya en grandes cantidades. Pago inmediato.', likes: 45, comments: 10, type: 'compra', timeAgo: '5h' },
  { id: '3', author: 'Maria L.', role: 'inversionista', content: 'Buscando proyectos de Cacao CCN51 para financiar. Interesados enviar DM.', likes: 28, comments: 8, type: 'inversion', timeAgo: '1d' },
];

interface CommunityFeedProps {
  userRole: UserRole;
}

export const CommunityFeed: React.FC<CommunityFeedProps> = ({ userRole }) => {
  const getBadgeColor = (type: string) => {
    switch(type) {
      case 'venta': return 'bg-green-100 text-green-700';
      case 'compra': return 'bg-blue-100 text-blue-700';
      case 'inversion': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="space-y-4 pb-20">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-lg">Comunidad</h3>
        <button className="text-sm text-gray-500 font-medium">Ver todo</button>
      </div>

      {/* Create Post Input */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-3 items-center">
        <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-white ${userRole === 'agricultor' ? 'bg-lime-600' : userRole === 'comprador' ? 'bg-emerald-600' : 'bg-blue-600'}`}>
          YO
        </div>
        <input 
          type="text" 
          placeholder={`Escribe algo para la comunidad...`}
          className="flex-1 bg-gray-50 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
        />
      </div>

      {/* Feed */}
      {MOCK_POSTS.map(post => (
        <div key={post.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500 text-sm">
                {post.author.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-sm text-gray-900">{post.author}</p>
                <p className="text-xs text-gray-400 capitalize">{post.role} • {post.timeAgo}</p>
              </div>
            </div>
            <button><MoreHorizontal size={16} className="text-gray-400" /></button>
          </div>
          
          <div className="mb-3">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase mb-2 inline-block ${getBadgeColor(post.type)}`}>
              {post.type}
            </span>
            <p className="text-sm text-gray-700 leading-relaxed">{post.content}</p>
          </div>

          <div className="flex items-center gap-6 pt-3 border-t border-gray-50">
            <button className="flex items-center gap-1.5 text-gray-500 text-xs font-medium hover:text-red-500">
              <Heart size={16} /> {post.likes}
            </button>
            <button className="flex items-center gap-1.5 text-gray-500 text-xs font-medium hover:text-blue-500">
              <MessageSquare size={16} /> {post.comments}
            </button>
            <button className="flex items-center gap-1.5 text-gray-500 text-xs font-medium ml-auto">
              <Share2 size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};