import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput, 
  ScrollView, 
  Modal,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Sparkles, X, Send, User, Bot, Loader2 } from 'lucide-react-native';
import { UserRole, ChatMessage } from '../types';
import { sendMessageToGemini } from '../services/gemini';

interface AIChatProps {
  role: UserRole;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const AIChat: React.FC<AIChatProps> = ({ role, isOpen, setIsOpen }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const initialGreetings: Record<UserRole, string> = {
        agricultor: "¡Hola! Soy CampoIA. ¿Cómo van esos cultivos hoy?",
        comprador: "Bienvenido a MercadoIA. ¿Buscas algún producto en específico?",
        inversionista: "Saludos. Soy RiskAI. ¿Analizamos oportunidades de inversión?",
      };
      setMessages([{ id: 'init', role: 'model', text: initialGreetings[role] }]);
    }
  }, [isOpen, role, messages.length]);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const responseText = await sendMessageToGemini(input, role);
    
    setMessages(prev => [...prev, { 
      id: (Date.now() + 1).toString(), 
      role: 'model', 
      text: responseText 
    }]);
    setIsLoading(false);
  };

  const getRoleColor = () => {
    switch(role) {
      case 'agricultor': return '#65a30d';
      case 'comprador': return '#059669';
      case 'inversionista': return '#2563eb';
    }
  };

  const getRoleBgClass = () => {
    switch(role) {
      case 'agricultor': return 'bg-lime-600';
      case 'comprador': return 'bg-emerald-600';
      case 'inversionista': return 'bg-blue-600';
    }
  };

  if (!isOpen) return null;

  return (
    <Modal
      visible={isOpen}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setIsOpen(false)}
    >
      <View className="flex-1 bg-black/40 justify-end">
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="bg-white rounded-t-3xl h-4/5 overflow-hidden"
        >
          {/* Header */}
          <View className={`p-4 flex-row justify-between items-center ${getRoleBgClass()}`}>
            <View className="flex-row items-center gap-2">
              <View className="bg-white/20 p-2 rounded-full">
                <Sparkles size={18} color="white" />
              </View>
              <View>
                <Text className="font-bold text-white">Asistente WAQI</Text>
                <Text className="text-xs text-white/80">Powered by Gemini</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => setIsOpen(false)} className="p-1">
              <X size={20} color="white" />
            </TouchableOpacity>
          </View>

          {/* Chat Area */}
          <ScrollView 
            ref={scrollViewRef}
            className="flex-1 p-4 bg-slate-50"
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            {messages.map((msg) => (
              <View 
                key={msg.id} 
                className={`flex-row mb-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <View className={`flex-row items-end gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <View 
                    className={`h-6 w-6 rounded-full items-center justify-center ${msg.role === 'user' ? 'bg-gray-200' : getRoleBgClass()}`}
                  >
                    {msg.role === 'user' ? (
                      <User size={14} color="#6b7280" />
                    ) : (
                      <Bot size={14} color="white" />
                    )}
                  </View>
                  <View 
                    className={`p-3 rounded-2xl shadow-sm ${
                      msg.role === 'user' 
                        ? 'bg-gray-800 rounded-br-none' 
                        : 'bg-white border border-gray-100 rounded-bl-none'
                    }`}
                  >
                    <Text className={`text-sm ${msg.role === 'user' ? 'text-white' : 'text-gray-800'}`}>
                      {msg.text}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
            {isLoading && (
              <View className="flex-row justify-start">
                <View className="flex-row items-end gap-2">
                  <View className={`h-6 w-6 rounded-full items-center justify-center ${getRoleBgClass()}`}>
                    <Bot size={14} color="white" />
                  </View>
                  <View className="bg-white p-3 rounded-2xl rounded-bl-none border border-gray-100 shadow-sm">
                    <Loader2 size={16} color={getRoleColor()} />
                  </View>
                </View>
              </View>
            )}
          </ScrollView>

          {/* Input */}
          <View className="p-3 bg-white border-t border-gray-100 flex-row gap-2">
            <TextInput
              className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm text-gray-900"
              placeholder="Escribe tu mensaje..."
              placeholderTextColor="#9ca3af"
              value={input}
              onChangeText={setInput}
              onSubmitEditing={handleSend}
              returnKeyType="send"
            />
            <TouchableOpacity 
              onPress={handleSend}
              disabled={!input.trim() || isLoading}
              className={`p-2 rounded-full ${getRoleBgClass()} ${(!input.trim() || isLoading) ? 'opacity-50' : ''}`}
              activeOpacity={0.8}
            >
              <Send size={18} color="white" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

export default AIChat;
