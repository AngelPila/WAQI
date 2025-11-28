import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

type Props = {
  visible: boolean;
  onClose: () => void;
};

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
};

export default function IAAssistant({ visible, onClose }: Props) {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Bienvenido a MercadoIA. ¿Buscas algún producto en específico?', sender: 'bot' }
  ]);

  function handleSend() {
    if (!text.trim()) return;
    
    const userMsg: Message = { id: Date.now().toString(), text, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setText('');

    // Simulate response
    setTimeout(() => {
      const botMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        text: 'Entendido. Estoy analizando las mejores ofertas para ti...', 
        sender: 'bot' 
      };
      setMessages(prev => [...prev, botMsg]);
    }, 1000);
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          
          <View style={styles.header}>
            <View style={styles.headerTitleRow}>
              <View style={styles.iconBox}><Text style={{color:'#fff', fontSize: 18}}>✨</Text></View>
              <View>
                <Text style={styles.title}>Asistente WAQI</Text>
                <Text style={styles.subtitle}>Powered by Gemini</Text>
              </View>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView 
            style={styles.chatArea} 
            contentContainerStyle={{ padding: 16, paddingBottom: 20 }}
          >
            {messages.map(m => (
              <View key={m.id} style={[
                styles.bubble, 
                m.sender === 'user' ? styles.bubbleUser : styles.bubbleBot
              ]}>
                {m.sender === 'bot' && (
                  <View style={styles.botIcon}><Text style={{fontSize: 12}}>🤖</Text></View>
                )}
                <View style={[
                  styles.msgBox,
                  m.sender === 'user' ? styles.msgBoxUser : styles.msgBoxBot
                ]}>
                  <Text style={[
                    styles.msgText,
                    m.sender === 'user' ? styles.msgTextUser : styles.msgTextBot
                  ]}>{m.text}</Text>
                </View>
              </View>
            ))}
          </ScrollView>

          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <View style={styles.inputArea}>
              <TextInput
                style={styles.input}
                placeholder="Escribe tu mensaje..."
                value={text}
                onChangeText={setText}
                placeholderTextColor="#9ca3af"
              />
              <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
                <Text style={{color:'#fff', fontSize: 18}}>➤</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 24,
    overflow: 'hidden',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  header: {
    backgroundColor: '#0ea37a',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  title: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 16,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 11,
  },
  closeBtn: {
    padding: 8,
  },
  closeText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  chatArea: {
    flex: 1,
    backgroundColor: '#f8faf9',
  },
  bubble: {
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  bubbleUser: {
    justifyContent: 'flex-end',
  },
  bubbleBot: {
    justifyContent: 'flex-start',
  },
  botIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#0ea37a',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    marginBottom: 4,
  },
  msgBox: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
  },
  msgBoxBot: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 4,
    elevation: 1,
  },
  msgBoxUser: {
    backgroundColor: '#ecfdf5', // very light green
    borderBottomRightRadius: 4,
  },
  msgText: {
    fontSize: 15,
    lineHeight: 20,
  },
  msgTextBot: {
    color: '#374151',
  },
  msgTextUser: {
    color: '#064e3b',
  },
  inputArea: {
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    backgroundColor: '#f9fafb',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 15,
    marginRight: 10,
    color: '#111827',
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#66dcc0', // lighter green for inactive look, or active color
    alignItems: 'center',
    justifyContent: 'center',
  },
});
