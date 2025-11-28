import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, Modal, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { Sparkles, X, Send, User, Bot } from 'lucide-react-native';
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

  // Initial Greeting
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

  // Scroll to bottom
  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
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
    switch (role) {
      case 'agricultor': return '#65a30d';
      case 'comprador': return '#059669';
      case 'inversionista': return '#2563eb';
      default: return '#65a30d';
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
      <View style={styles.modalOverlay}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <View style={styles.chatContainer}>
            {/* Header */}
            <View style={[styles.header, { backgroundColor: getRoleColor() }]}>
              <View style={styles.headerContent}>
                <View style={styles.headerIcon}>
                  <Sparkles size={18} color="#ffffff" />
                </View>
                <View>
                  <Text style={styles.headerTitle}>Asistente WAQI</Text>
                  <Text style={styles.headerSubtitle}>Powered by Gemini</Text>
                </View>
              </View>
              <TouchableOpacity onPress={() => setIsOpen(false)} style={styles.closeButton}>
                <X size={20} color="#ffffff" />
              </TouchableOpacity>
            </View>

            {/* Chat Area */}
            <ScrollView 
              ref={scrollViewRef}
              style={styles.chatArea}
              contentContainerStyle={styles.chatContent}
            >
              {messages.map((msg) => (
                <View 
                  key={msg.id} 
                  style={[
                    styles.messageRow,
                    msg.role === 'user' ? styles.messageRowUser : styles.messageRowModel
                  ]}
                >
                  <View style={[
                    styles.avatar,
                    msg.role === 'user' 
                      ? styles.avatarUser 
                      : { backgroundColor: getRoleColor() }
                  ]}>
                    {msg.role === 'user' 
                      ? <User size={14} color="#6b7280" /> 
                      : <Bot size={14} color="#ffffff" />
                    }
                  </View>
                  <View style={[
                    styles.messageBubble,
                    msg.role === 'user' ? styles.messageBubbleUser : styles.messageBubbleModel
                  ]}>
                    <Text style={[
                      styles.messageText,
                      msg.role === 'user' ? styles.messageTextUser : styles.messageTextModel
                    ]}>
                      {msg.text}
                    </Text>
                  </View>
                </View>
              ))}
              {isLoading && (
                <View style={[styles.messageRow, styles.messageRowModel]}>
                  <View style={[styles.avatar, { backgroundColor: getRoleColor() }]}>
                    <Bot size={14} color="#ffffff" />
                  </View>
                  <View style={[styles.messageBubble, styles.messageBubbleModel]}>
                    <ActivityIndicator size="small" color={getRoleColor()} />
                  </View>
                </View>
              )}
            </ScrollView>

            {/* Input */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
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
                style={[
                  styles.sendButton, 
                  { backgroundColor: getRoleColor() },
                  (!input.trim() || isLoading) && styles.sendButtonDisabled
                ]}
              >
                <Send size={18} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  keyboardView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  chatContainer: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: '80%',
    overflow: 'hidden',
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerIcon: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 8,
    borderRadius: 20,
  },
  headerTitle: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  headerSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
  },
  closeButton: {
    padding: 4,
  },
  chatArea: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  chatContent: {
    padding: 16,
    gap: 16,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    marginBottom: 8,
  },
  messageRowUser: {
    flexDirection: 'row-reverse',
  },
  messageRowModel: {
    flexDirection: 'row',
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarUser: {
    backgroundColor: '#e5e7eb',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
  },
  messageBubbleUser: {
    backgroundColor: '#1f2937',
    borderBottomRightRadius: 4,
  },
  messageBubbleModel: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#f3f4f6',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 14,
  },
  messageTextUser: {
    color: '#ffffff',
  },
  messageTextModel: {
    color: '#1f2937',
  },
  inputContainer: {
    padding: 12,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    color: '#1f2937',
  },
  sendButton: {
    padding: 10,
    borderRadius: 20,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
});
