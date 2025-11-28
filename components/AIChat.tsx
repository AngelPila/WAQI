import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
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

  const roleColors = {
    agricultor: '#65a30d',
    comprador: '#059669',
    inversionista: '#2563eb',
  };

  const roleColor = roleColors[role];

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const initialGreetings: Record<UserRole, string> = {
        agricultor: '¡Hola! Soy CampoIA. ¿Cómo van esos cultivos hoy?',
        comprador: 'Bienvenido a MercadoIA. ¿Buscas algún producto en específico?',
        inversionista: 'Saludos. Soy RiskAI. ¿Analizamos oportunidades de inversión?',
      };
      setMessages([{ id: 'init', role: 'model', text: initialGreetings[role] }]);
    }
  }, [isOpen, role, messages.length]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const responseText = await sendMessageToGemini(input, role);

    setMessages((prev) => [
      ...prev,
      {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
      },
    ]);
    setIsLoading(false);
  };

  return (
    <Modal
      visible={isOpen}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setIsOpen(false)}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.modalContainer}
      >
        <View style={styles.chatContainer}>
          {/* Header */}
          <View style={[styles.header, { backgroundColor: roleColor }]}>
            <View style={styles.headerContent}>
              <View style={styles.headerIcon}>
                <Sparkles color="#ffffff" size={18} />
              </View>
              <View>
                <Text style={styles.headerTitle}>Asistente WAQI</Text>
                <Text style={styles.headerSubtitle}>Powered by Gemini</Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => setIsOpen(false)} style={styles.closeButton}>
              <X color="#ffffff" size={20} />
            </TouchableOpacity>
          </View>

          {/* Messages */}
          <ScrollView
            ref={scrollViewRef}
            style={styles.messagesContainer}
            contentContainerStyle={styles.messagesContent}
            onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
          >
            {messages.map((msg) => (
              <View
                key={msg.id}
                style={[
                  styles.messageRow,
                  msg.role === 'user' ? styles.messageRowUser : styles.messageRowModel,
                ]}
              >
                <View
                  style={[
                    styles.avatar,
                    msg.role === 'user'
                      ? styles.avatarUser
                      : { backgroundColor: roleColor },
                  ]}
                >
                  {msg.role === 'user' ? (
                    <User color="#6b7280" size={14} />
                  ) : (
                    <Bot color="#ffffff" size={14} />
                  )}
                </View>
                <View
                  style={[
                    styles.messageBubble,
                    msg.role === 'user' ? styles.messageBubbleUser : styles.messageBubbleModel,
                  ]}
                >
                  <Text
                    style={[
                      styles.messageText,
                      msg.role === 'user' ? styles.messageTextUser : styles.messageTextModel,
                    ]}
                  >
                    {msg.text}
                  </Text>
                </View>
              </View>
            ))}
            {isLoading && (
              <View style={[styles.messageRow, styles.messageRowModel]}>
                <View style={[styles.avatar, { backgroundColor: roleColor }]}>
                  <Bot color="#ffffff" size={14} />
                </View>
                <View style={styles.messageBubbleModel}>
                  <ActivityIndicator size="small" color={roleColor} />
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
              style={[
                styles.sendButton,
                { backgroundColor: roleColor },
                (!input.trim() || isLoading) && styles.sendButtonDisabled,
              ]}
              onPress={handleSend}
              disabled={!input.trim() || isLoading}
            >
              <Send color="#ffffff" size={18} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
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
    padding: 8,
    borderRadius: 20,
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  messagesContent: {
    padding: 16,
    gap: 16,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
    marginBottom: 16,
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
    alignItems: 'center',
    justifyContent: 'center',
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
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  messageTextUser: {
    color: '#ffffff',
  },
  messageTextModel: {
    color: '#1f2937',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    gap: 8,
  },
  input: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    color: '#111827',
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
});
