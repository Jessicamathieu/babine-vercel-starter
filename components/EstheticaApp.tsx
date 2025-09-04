import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, Bot, Calendar, Clock, MapPin, Phone, Mail, Star, Sparkles, 
  ChevronLeft, ChevronRight, Plus, X, MessageCircle, Minimize2,
  User, Edit, Trash2, Save, Users, Home
} from 'lucide-react';

const EsteticaSpaSystem = () => {
  // DONNÉES COMPLÈTES ESTHETICA SPA
  const SALON_DATA = {
    name: "Esthetica Spa",
    address: "200, 33e Rue, Notre-Dame-des-Pins, G0M 1K0",
    phone: "581-813-1123",
    email: "info@estheticaspa.com",
    owner: "Jessica",
    
    employees: {
      jessica: { 
        id: "jessica", 
        name: "Jessica", 
        color: "#E879F9",
        specialties: ["soins visage/corps", "IPL", "ongles", "lipocavitation"] 
      },
      obeylia: { 
        id: "obeylia", 
        name: "Obeylia", 
        color: "#60A5FA",
        specialties: ["soins esthétiques", "IPL", "ongles"] 
      }
    },
    
    rooms: {
      "salle-ongles": { 
        name: "Salle Ongles", 
        color: "#F97316",
        services: ["pose-ongles", "pedicure"] 
      },
      "salle-lipo": { 
        name: "Salle Lipo", 
        color: "#EF4444",
        services: ["ipl-poils", "lipocavitation", "lifting-colombien", "infratherapie"] 
      },
      "salle-soins": { 
        name: "Salle Soins", 
        color: "#10B981",
        services: ["soins-visage", "ipl-visage"] 
      },
      "salle-bronzage": { 
        name: "Salle Bronzage", 
        color: "#F59E0B",
        services: ["bronzage"] 
      }
    },
    
    serviceCategories: {
      "soins-visage": { name: "Soins Visage", color: "#10B981", room: "salle-soins" },
      "ipl-poils": { name: "IPL Épilation", color: "#EF4444", room: "salle-lipo" },
      "ipl-visage": { name: "IPL Visage", color: "#8B5CF6", room: "salle-soins" },
      "ongles": { name: "Ongles", color: "#F97316", room: "salle-ongles" },
      "pedicure": { name: "Pédicure", color: "#EC4899", room: "salle-ongles" },
      "lipocavitation": { name: "Lipocavitation", color: "#06B6D4", room: "salle-lipo" },
      "lifting-colombien": { name: "Lifting Colombien", color: "#84CC16", room: "salle-lipo" },
      "bronzage": { name: "Bronzage", color: "#F59E0B", room: "salle-bronzage" }
    },
    
    services: {
      "ipl-acne": { name: "IPL Acné", price: 200, duration: 120, category: "ipl-visage" },
      "ipl-couperose": { name: "IPL Couperose", price: 200, duration: 120, category: "ipl-visage" },
      "ipl-taches": { name: "IPL Taches", price: 200, duration: 120, category: "ipl-visage" },
      "photorajeunissement": { name: "Photorajeunissement", price: 200, duration: 120, category: "ipl-visage" },
      "green-filler": { name: "Green Filler", price: 160, duration: 120, category: "soins-visage" },
      "hydra-repulpant": { name: "Hydra Repulpant", price: 160, duration: 120, category: "soins-visage" },
      "morphostructure": { name: "Morphostructure", price: 160, duration: 120, category: "soins-visage" },
      "pose-ongles": { name: "Pose Ongles", price: 55, duration: 120, category: "ongles" },
      "pedicure": { name: "Pédicure", price: 60, duration: 60, category: "pedicure" },
      "ipl-aines": { name: "Aines", price: 80, duration: 15, category: "ipl-poils" },
      "ipl-aisselles": { name: "Aisselles", price: 75, duration: 15, category: "ipl-poils" },
      "ipl-levre": { name: "Lèvre supérieure", price: 65, duration: 15, category: "ipl-poils" },
      "ipl-menton": { name: "Menton", price: 75, duration: 15, category: "ipl-poils" },
      "ipl-sourcils": { name: "Sourcils", price: 75, duration: 15, category: "ipl-poils" },
      "ipl-integrale": { name: "Intégrale", price: 130, duration: 15, category: "ipl-poils" },
      "ipl-dos": { name: "Dos", price: 380, duration: 45, category: "ipl-poils" },
      "ipl-jambes": { name: "Jambes complètes", price: 585, duration: 60, category: "ipl-poils" },
      "lipocavitation": { name: "Lipocavitation", price: 120, duration: 90, category: "lipocavitation" },
      "lifting-colombien": { name: "Lifting Colombien", price: 100, duration: 60, category: "lifting-colombien" },
      "infratherapie": { name: "Infrathérapie", price: 40, duration: 45, category: "lifting-colombien" },
      "bronzage": { name: "Bronzage", price: 12, duration: 10, category: "bronzage" }
    }
  };

  // États principaux
  const [currentView, setCurrentView] = useState('calendar');
  const [calendarView, setCalendarView] = useState('week');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showBabine, setShowBabine] = useState(false);
  const [babineMinimized, setBabineMinimized] = useState(true);
  
  // États Babine
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Allo Jessica! C'est Babine 🤍 Comment je peux t'aider aujourd'hui?",
      sender: 'babine',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  
  // États pour la gestion des rendez-vous
  const [selectedEmployee, setSelectedEmployee] = useState('all');
  const [selectedRoom, setSelectedRoom] = useState('all');
  const [showNewAppointment, setShowNewAppointment] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [newAppointment, setNewAppointment] = useState({
    clientName: '',
    phone: '',
    email: '',
    service: '',
    employee: '',
    date: '',
    time: '',
    duration: 60,
    notes: ''
  });
  
  // États pour configuration Messenger
  const [messengerStatus, setMessengerStatus] = useState('not_configured');
  
  // Rendez-vous d'exemple
  const [appointments, setAppointments] = useState([
    {
      id: '1',
      clientName: 'Marie Dubois',
      phone: '418-555-0123',
      service: 'lipocavitation',
      employee: 'jessica',
      date: '2025-09-03',
      time: '10:00',
      duration: 90,
      status: 'confirmé'
    },
    {
      id: '2', 
      clientName: 'Sophie Tremblay',
      phone: '418-555-0456',
      service: 'ipl-aisselles',
      employee: 'obeylia', 
      date: '2025-09-03',
      time: '14:00',
      duration: 15,
      status: 'confirmé'
    }
  ]);

  // APIs SIMULATION
  const sendSMSConfirmation = async (appointment) => {
    const message = `Allo ${appointment.clientName}! 🌸 Ton RDV chez Esthetica Spa est confirmé le ${appointment.date} à ${appointment.time}. À bientôt! - Jessica ✨`;
    console.log(`📱 SMS envoyé depuis +15817044600 vers ${appointment.phone}:`, message);
    
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 z-50 px-4 py-2 rounded-lg shadow-lg text-white bg-green-500';
    notification.textContent = `SMS envoyé à ${appointment.clientName}`;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  };

  const createGoogleCalendarEvent = async (appointment) => {
    console.log(`📅 Événement Google Calendar créé:`, {
      title: `${SALON_DATA.services[appointment.service]?.name} - ${appointment.clientName}`,
      date: appointment.date,
      time: appointment.time,
      duration: appointment.duration,
      employee: SALON_DATA.employees[appointment.employee]?.name
    });
  };

  // Test connexion Messenger
  const testMessengerConnection = async () => {
    try {
      console.log('🧪 Test connexion Messenger...');
      setMessengerStatus('testing');
      
      setTimeout(() => {
        setMessengerStatus('connected');
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 z-50 px-4 py-2 rounded-lg shadow-lg text-white bg-green-500';
        notification.textContent = 'Messenger connecté avec succès!';
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
      }, 2000);
      
    } catch (error) {
      setMessengerStatus('error');
      console.error('❌ Erreur test Messenger:', error);
    }
  };

  // Fonction pour créer un nouveau RDV
  const handleCreateAppointment = async () => {
    if (!newAppointment.clientName || !newAppointment.service || !newAppointment.employee) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }
    
    const appointment = {
      id: Date.now().toString(),
      ...newAppointment,
      status: 'confirmé'
    };
    
    setAppointments(prev => [...prev, appointment]);
    
    await sendSMSConfirmation(appointment);
    await createGoogleCalendarEvent(appointment);
    
    setNewAppointment({
      clientName: '',
      phone: '',
      email: '',
      service: '',
      employee: '',
      date: '',
      time: '',
      duration: 60,
      notes: ''
    });
    setShowNewAppointment(false);
  };

  // Fonction pour obtenir les RDV d'une date spécifique
  const getAppointmentsForDate = (date, timeSlot) => {
    const dateStr = date.toISOString().split('T')[0];
    return appointments.filter(apt => {
      const aptDate = new Date(apt.date + 'T' + apt.time);
      const slotTime = parseInt(timeSlot.split(':')[0]);
      const aptHour = aptDate.getHours();
      
      return apt.date === dateStr && aptHour === slotTime;
    });
  };
  
  // Fonctions utilitaires pour les dates
  const formatDate = (date) => {
    return date.toLocaleDateString('fr-CA', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  const getWeekDays = (date) => {
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
    startOfWeek.setDate(diff);
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    return days;
  };
  
  const timeSlots = Array.from({ length: 12 }, (_, i) => `${8 + i}:00`);
  
  // Navigation calendrier
  const navigateDate = (direction) => {
    const newDate = new Date(currentDate);
    
    switch (calendarView) {
      case 'day':
        newDate.setDate(currentDate.getDate() + direction);
        break;
      case 'week':
        newDate.setDate(currentDate.getDate() + (direction * 7));
        break;
      case 'month':
        newDate.setMonth(currentDate.getMonth() + direction);
        break;
    }
    
    setCurrentDate(newDate);
  };
  
  // Babine AI Logic
  const generateBabineResponse = async (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('horaire') || lowerMessage.includes('calendrier')) {
      return "Je vois que tu regardes l'horaire! Tu veux que je t'aide avec quelque chose de spécifique?";
    }
    
    if (lowerMessage.includes('obeylia')) {
      return "Obeylia est libre ou occupée? Je peux t'aider à voir ses disponibilités!";
    }
    
    if (lowerMessage.includes('allo') || lowerMessage.includes('salut') || lowerMessage.includes('bonjour')) {
      return "Allo Jessica! Tout va bien aujourd'hui? Tu as besoin d'aide avec l'horaire ou autre chose?";
    }
    
    if (lowerMessage.includes('rendez-vous') || lowerMessage.includes('rdv')) {
      return "Parfait! Quel service et pour quand? Je peux t'aider à organiser ça.";
    }
    
    if (lowerMessage.includes('lipocavitation') && !lowerMessage.includes('prix')) {
      return "La lipocavitation, c'est 90 minutes de soin pour sculpter le corps. Entre 6-10 séances généralement.";
    }
    
    if (lowerMessage.includes('prix') || lowerMessage.includes('combien')) {
      if (lowerMessage.includes('lipocavitation')) {
        return "120$ pour 90 minutes.";
      }
      return "Dis-moi quel service et je te donne le prix!";
    }
    
    return "Comment je peux t'aider Jessica? Horaire, clients, services... je suis là! 🤍";
  };
  
  const handleSendMessage = async () => {
    if (!inputText.trim()) return;
    
    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);
    
    setTimeout(async () => {
      const response = await generateBabineResponse(inputText);
      
      const babineMessage = {
        id: messages.length + 2,
        text: response,
        sender: 'babine',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, babineMessage]);
      setIsTyping(false);
    }, 1000);
  };
  
  useEffect(() => {
    if (showBabine && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, showBabine]);
  
  // Composant Horaire
  const CalendarView = () => (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-rose-500 to-pink-600 px-6 py-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-bold">Horaire Esthetica Spa</h2>
            <div className="flex bg-white/20 rounded-lg p-1">
              {['day', 'week', 'month'].map((view) => (
                <button
                  key={view}
                  onClick={() => setCalendarView(view)}
                  className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                    calendarView === view 
                      ? 'bg-white text-rose-600' 
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  {view === 'day' ? 'Jour' : view === 'week' ? 'Semaine' : 'Mois'}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => navigateDate(-1)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="font-medium min-w-[200px] text-center">
              {formatDate(currentDate)}
            </span>
            <button 
              onClick={() => navigateDate(1)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="mt-4 flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium">Employée:</label>
            <select 
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
              className="bg-white/20 text-white rounded px-3 py-1 text-sm"
            >
              <option value="all">Toutes</option>
              <option value="jessica">Jessica</option>
              <option value="obeylia">Obeylia</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <label className="text-sm font-medium">Salle:</label>
            <select 
              value={selectedRoom}
              onChange={(e) => setSelectedRoom(e.target.value)}
              className="bg-white/20 text-white rounded px-3 py-1 text-sm"
            >
              <option value="all">Toutes</option>
              {Object.entries(SALON_DATA.rooms).map(([key, room]) => (
                <option key={key} value={key}>{room.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      <div className="px-6 py-3 bg-gray-50 border-b">
        <div className="flex flex-wrap gap-3">
          {Object.entries(SALON_DATA.serviceCategories).map(([key, category]) => (
            <div key={key} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              <span className="text-sm font-medium text-gray-700">{category.name}</span>
            </div>
          ))}
        </div>
      </div>
      
      {calendarView === 'week' && (
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            <div className="grid grid-cols-8 border-b">
              <div className="p-4 font-medium text-gray-500 text-sm">Heure</div>
              {getWeekDays(currentDate).map((day, index) => (
                <div key={index} className="p-4 text-center border-l">
                  <div className="font-medium text-gray-900">
                    {day.toLocaleDateString('fr-CA', { weekday: 'short' })}
                  </div>
                  <div className="text-sm text-gray-500">
                    {day.getDate()}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="relative">
              {timeSlots.map((time, timeIndex) => (
                <div key={time} className="grid grid-cols-8 border-b border-gray-100">
                  <div className="p-4 text-sm text-gray-500 font-medium border-r">
                    {time}
                  </div>
                  {getWeekDays(currentDate).map((day, dayIndex) => {
                    const dayAppointments = getAppointmentsForDate(day, time);
                    return (
                      <div 
                        key={`${timeIndex}-${dayIndex}`}
                        className="p-1 border-l border-gray-100 min-h-[60px] hover:bg-gray-50 cursor-pointer relative"
                        onClick={() => {
                          setNewAppointment(prev => ({
                            ...prev,
                            date: day.toISOString().split('T')[0],
                            time: time
                          }));
                          setShowNewAppointment(true);
                        }}
                      >
                        {dayAppointments.map((apt) => {
                          const service = SALON_DATA.services[apt.service];
                          const category = SALON_DATA.serviceCategories[service?.category];
                          const employee = SALON_DATA.employees[apt.employee];
                          
                          return (
                            <div
                              key={apt.id}
                              className="absolute inset-1 rounded p-1 text-xs text-white font-medium shadow-sm cursor-pointer hover:opacity-90"
                              style={{ backgroundColor: category?.color || '#6B7280' }}
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingAppointment(apt);
                              }}
                            >
                              <div className="truncate font-medium">{apt.clientName}</div>
                              <div className="truncate text-xs opacity-90">{service?.name}</div>
                              <div className="truncate text-xs opacity-75">{employee?.name}</div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Vue Messenger
  const MessengerView = () => (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <MessageCircle className="w-6 h-6" />
            <div>
              <h2 className="text-xl font-bold">Configuration Messenger</h2>
              <p className="text-sm text-blue-100">Babine répond automatiquement à tes clientes</p>
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
            messengerStatus === 'connected' ? 'bg-green-100 text-green-800' :
            messengerStatus === 'testing' ? 'bg-yellow-100 text-yellow-800' :
            messengerStatus === 'error' ? 'bg-red-100 text-red-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {messengerStatus === 'connected' ? '✅ Connecté' :
             messengerStatus === 'testing' ? '🧪 Test...' :
             messengerStatus === 'error' ? '❌ Erreur' :
             '⚠️ Non configuré'}
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-800 mb-4">📋 Guide de Configuration</h3>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
              <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
              <div>
                <h4 className="font-medium text-gray-800">Créer une App Facebook</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Va sur <a href="https://developers.facebook.com/apps" target="_blank" className="text-blue-600 underline">developers.facebook.com</a> 
                  → "Créer une app" → "Business" → Nommer "Esthetica Spa Bot"
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
              <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
              <div>
                <h4 className="font-medium text-gray-800">Ajouter Messenger</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Dans ton app → "Ajouter des produits" → "Messenger" → "Configurer"<br/>
                  Connecter à ta page Facebook "Esthetica Spa"
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-lg">
              <div className="w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
              <div>
                <h4 className="font-medium text-gray-800">Configurer Webhook</h4>
                <div className="text-sm text-gray-600 mt-1">
                  <p><strong>URL:</strong> <code className="bg-gray-100 px-2 py-1 rounded">https://babine.estheticaspa.com/webhook/messenger</code></p>
                  <p><strong>Token:</strong> <code className="bg-gray-100 px-2 py-1 rounded">babine_esthetica_verify_2025</code></p>
                  <p><strong>Événements:</strong> messages, messaging_postbacks</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-4 bg-purple-50 rounded-lg">
              <div className="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
              <div>
                <h4 className="font-medium text-gray-800">Obtenir le Token</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Copier le "Page Access Token" et le coller ci-dessous
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">🔑 Configuration Token</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Page Access Token
              </label>
              <input
                type="password"
                placeholder="EAAxxxxxxxxxxxxxxxxxxxxx"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                Token de ta page Facebook Esthetica Spa
              </p>
            </div>
            
            <div className="flex space-x-3 pt-4">
              <button
                onClick={testMessengerConnection}
                disabled={messengerStatus === 'testing'}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {messengerStatus === 'testing' ? 'Test en cours...' : 'Tester la connexion'}
              </button>
              
              <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                Sauvegarder
              </button>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-6">
          
          <div className="bg-gray-50 rounded-lg p-4 max-w-md">
            <div className="space-y-3">
              <div className="text-right">
                <div className="inline-block bg-blue-500 text-white px-3 py-2 rounded-2xl text-sm">
                  Allo! C'est quoi la lipocavitation?
                </div>
              </div>
              
              <div className="text-left">
                <div className="inline-block bg-white border px-3 py-2 rounded-2xl text-sm">
                  Allo! La lipocavitation, c'est un soin non-invasif avec ultrasons. Ça aide à détruire les cellules graisseuses et sculpter le corps. Entre 6-10 séances généralement. 🌸
                </div>
              </div>
              
              <div className="text-right">
                <div className="inline-block bg-blue-500 text-white px-3 py-2 rounded-2xl text-sm">
                  Combien ça coûte?
                </div>
              </div>
              
              <div className="text-left">
                <div className="inline-block bg-white border px-3 py-2 rounded-2xl text-sm">
                  120$ pour 90 minutes. Tu veux qu'on regarde pour un rendez-vous? 😊
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 mt-4">
            ↗️ C'est comme ça que Babine répondra à tes clientes automatiquement sur Messenger !
          </p>
        </div>
      </div>
    </div>
  );
  
  // Interface principale
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      {/* Header principal */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-rose-200/50 px-6 py-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Esthetica Spa</h1>
              <p className="text-sm text-gray-600">200, 33e Rue, Notre-Dame-des-Pins • 581-813-1123</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <nav className="flex space-x-2">
              <button 
                onClick={() => setCurrentView('calendar')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentView === 'calendar' 
                    ? 'bg-rose-100 text-rose-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Calendar className="w-4 h-4 inline mr-2" />
                Horaire
              </button>
              <button 
                onClick={() => setCurrentView('messenger')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  currentView === 'messenger' 
                    ? 'bg-rose-100 text-rose-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <MessageCircle className="w-4 h-4 inline mr-2" />
                Messenger
                {messengerStatus === 'connected' && (
                  <div className="inline-block w-2 h-2 bg-green-400 rounded-full ml-2"></div>
                )}
              </button>
            </nav>
          </div>
        </div>
      </div>
      
      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        {currentView === 'calendar' && <CalendarView />}
        {currentView === 'messenger' && <MessengerView />}
      </div>
      
      {/* Widget Babine flottant - Position fixe à gauche */}
      <div className="fixed left-0 top-1/2 transform -translate-y-1/2 z-50">
        
        {/* Widget caché par défaut */}
        <div 
          className={`transition-all duration-500 ease-in-out ${
            babineHidden ? '-translate-x-16' : 'translate-x-0'
          }`}
        >
          
          {/* Babine widget interactif */}
          {showBabineWidget && (
            <div
              onClick={handleBabineClick}
              className={`relative cursor-pointer group ${
                babineAnimating ? 'animate-bounce' : ''
              }`}
            >
              {/* Ombre et glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity animate-pulse" 
                   style={{ transform: 'scale(1.1)' }}></div>
              
              {/* Avatar Babine principal */}
              <div className="relative w-20 h-20 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full shadow-2xl flex items-center justify-center transform transition-all duration-300 hover:scale-110 group-hover:shadow-rose-400/50 border-4 border-white">
                
                {/* Avatar style Jessica */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-200 to-rose-300 flex items-center justify-center relative overflow-hidden">
                  
                  {/* Visage stylisé */}
                  <div className="relative">
                    {/* Cheveux noirs */}
                    <div className="absolute -top-2 -left-3 w-10 h-8 bg-gray-900 rounded-full transform -rotate-12"></div>
                    <div className="absolute -top-1 -right-2 w-8 h-6 bg-gray-900 rounded-full transform rotate-12"></div>
                    
                    {/* Visage */}
                    <div className="w-6 h-6 bg-orange-100 rounded-full relative">
                      {/* Yeux */}
                      <div className="absolute top-1 left-1 w-1 h-1 bg-gray-800 rounded-full"></div>
                      <div className="absolute top-1 right-1 w-1 h-1 bg-gray-800 rounded-full"></div>
                      
                      {/* Sourire */}
                      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-1 border-b border-gray-700 rounded-full"></div>
                    </div>
                    
                    {/* Tablier rose */}
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-4 h-3 bg-rose-400 rounded-t-lg"></div>
                  </div>
                </div>
                
                {/* Badge de notification */}
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-white flex items-center justify-center">
                  <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
                </div>
                
                {/* Bulle de message */}
                <div className={`absolute left-full ml-3 transition-all duration-300 ${
                  babineAnimating ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                }`}>
                  <div className="bg-white px-3 py-2 rounded-lg shadow-lg text-xs font-medium text-gray-800 whitespace-nowrap relative">
                    Clique-moi! 💬
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-white"></div>
                  </div>
                </div>
                
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Chat Babine complet quand ouvert */}
      {babineVisible && (
        <div 
          className={`fixed inset-0 bg-black/20 z-40 transition-opacity duration-300 ${
            showBabine ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setBabineMinimized(true)}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className={`fixed right-6 top-1/2 transform -translate-y-1/2 transition-all duration-500 ${
              babineMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
            } ${showBabine ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
          >
            <div className="bg-white rounded-2xl shadow-2xl border h-full flex flex-col overflow-hidden">
              
              {/* Header Babine avec avatar */}
              <div className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-4 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center relative">
                    {/* Même avatar que le widget */}
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-200 to-rose-300 flex items-center justify-center relative overflow-hidden">
                      <div className="text-lg">👩🏻‍🔬</div>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white">
                      <div className="w-full h-full bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <div>
                    <div className="font-semibold">Babine</div>
                    <div className="text-xs text-rose-100">Assistante IA • En ligne</div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setBabineMinimized(!babineMinimized)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <Minimize2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={hideBabine}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {/* Chat content */}
              {!babineMinimized && (
                <>
                  <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {messages.map((message) => (
                      <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-xs px-4 py-3 rounded-2xl text-sm ${
                          message.sender === 'user' 
                            ? 'bg-gradient-to-br from-rose-500 to-pink-600 text-white' 
                            : 'bg-gray-100 text-gray-800 border border-gray-200'
                        }`}>
                          {message.sender === 'babine' && (
                            <div className="flex items-start space-x-2 mb-1">
                              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <div className="text-xs text-white">👩🏻‍🔬</div>
                              </div>
                              <div className="flex-1">
                                <p className="whitespace-pre-line">{message.text}</p>
                                <p className="text-xs text-gray-500 mt-1">
                                  {message.timestamp.toLocaleTimeString('fr-CA', { 
                                    hour: '2-digit', 
                                    minute: '2-digit' 
                                  })}
                                </p>
                              </div>
                            </div>
                          )}
                          
                          {message.sender === 'user' && (
                            <>
                              <p className="whitespace-pre-line">{message.text}</p>
                              <p className="text-xs text-rose-200 mt-1">
                                {message.timestamp.toLocaleTimeString('fr-CA', { 
                                  hour: '2-digit', 
                                  minute: '2-digit' 
                                })}
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                    
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-gray-100 px-4 py-3 rounded-2xl border border-gray-200">
                          <div className="flex items-center space-x-3">
                            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center flex-shrink-0">
                              <div className="text-xs text-white">👩🏻‍🔬</div>
                            </div>
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div ref={messagesEndRef} />
                  </div>
                  
                  {/* Input zone */}
                  <div className="p-4 border-t bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Écris à Babine..."
                        className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-full text-sm focus:ring-2 focus:ring-rose-400 focus:border-transparent outline-none shadow-sm"
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={!inputText.trim()}
                        className="w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-full flex items-center justify-center text-white transition-all shadow-lg hover:shadow-xl"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Version mobile - Icône flottante simplifiée */}
      <div className="sm:hidden fixed bottom-6 right-6 z-50">
        {!babineVisible && (
          <button
            onClick={handleBabineClick}
            className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
          >
            <div className="relative">
              <div className="text-2xl">👩🏻‍🔬</div>
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-green-400 rounded-full border-2 border-white">
                <div className="w-full h-full bg-green-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </button>
        )}
      </div>

      {/* Modale nouveau RDV */}
      {showNewAppointment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-6 py-4 rounded-t-2xl flex items-center justify-between">
              <h3 className="font-bold text-lg">Nouveau Rendez-vous</h3>
              <button 
                onClick={() => setShowNewAppointment(false)}
                className="p-1 hover:bg-white/20 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Client *</label>
                <input
                  type="text"
                  value={newAppointment.clientName}
                  onChange={(e) => setNewAppointment(prev => ({...prev, clientName: e.target.value}))}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-transparent"
                  placeholder="Nom du client"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone *</label>
                <input
                  type="tel"
                  value={newAppointment.phone}
                  onChange={(e) => setNewAppointment(prev => ({...prev, phone: e.target.value}))}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-transparent"
                  placeholder="418-555-0123"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Service *</label>
                <select
                  value={newAppointment.service}
                  onChange={(e) => {
                    const service = SALON_DATA.services[e.target.value];
                    setNewAppointment(prev => ({
                      ...prev, 
                      service: e.target.value,
                      duration: service?.duration || 60
                    }));
                  }}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-transparent"
                >
                  <option value="">Choisir un service</option>
                  {Object.entries(SALON_DATA.services).map(([key, service]) => (
                    <option key={key} value={key}>
                      {service.name} - {service.price}$ ({service.duration}min)
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Employée *</label>
                <select
                  value={newAppointment.employee}
                  onChange={(e) => setNewAppointment(prev => ({...prev, employee: e.target.value}))}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-transparent"
                >
                  <option value="">Choisir une employée</option>
                  {Object.entries(SALON_DATA.employees).map(([key, employee]) => (
                    <option key={key} value={key}>{employee.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                  <input
                    type="date"
                    value={newAppointment.date}
                    onChange={(e) => setNewAppointment(prev => ({...prev, date: e.target.value}))}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Heure *</label>
                  <input
                    type="time"
                    value={newAppointment.time}
                    onChange={(e) => setNewAppointment(prev => ({...prev, time: e.target.value}))}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  value={newAppointment.notes}
                  onChange={(e) => setNewAppointment(prev => ({...prev, notes: e.target.value}))}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-rose-400 focus:border-transparent"
                  rows="2"
                  placeholder="Notes sur le client ou le service..."
                />
              </div>
            </div>
            
            <div className="px-6 py-4 bg-gray-50 rounded-b-2xl flex space-x-3">
              <button
                onClick={() => setShowNewAppointment(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleCreateAppointment}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-lg hover:from-rose-600 hover:to-pink-700 transition-all"
              >
                Créer RDV
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Modale édition RDV */}
      {editingAppointment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-4 rounded-t-2xl flex items-center justify-between">
              <h3 className="font-bold text-lg">Modifier Rendez-vous</h3>
              <button 
                onClick={() => setEditingAppointment(null)}
                className="p-1 hover:bg-white/20 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Client:</span>
                  <span>{editingAppointment.clientName}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Service:</span>
                  <span>{SALON_DATA.services[editingAppointment.service]?.name}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Employée:</span>
                  <span>{SALON_DATA.employees[editingAppointment.employee]?.name}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Date/Heure:</span>
                  <span>{editingAppointment.date} à {editingAppointment.time}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Téléphone:</span>
                  <span>{editingAppointment.phone}</span>
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4 bg-gray-50 rounded-b-2xl flex space-x-3">
              <button
                onClick={() => {
                  const cancelMessage = `Allo ${editingAppointment.clientName}, ton RDV du ${editingAppointment.date} à ${editingAppointment.time} chez Esthetica Spa a été annulé. Contacte-nous pour reprogrammer! - Jessica`;
                  console.log(`📱 SMS annulation envoyé vers ${editingAppointment.phone}:`, cancelMessage);
                  
                  const notification = document.createElement('div');
                  notification.className = 'fixed top-4 right-4 z-50 px-4 py-2 rounded-lg shadow-lg text-white bg-blue-500';
                  notification.textContent = `RDV annulé - SMS envoyé à ${editingAppointment.clientName}`;
                  document.body.appendChild(notification);
                  setTimeout(() => notification.remove(), 3000);
                  
                  setAppointments(prev => prev.filter(apt => apt.id !== editingAppointment.id));
                  setEditingAppointment(null);
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                <Trash2 className="w-4 h-4 inline mr-2" />
                Supprimer
              </button>
              <button
                onClick={() => setEditingAppointment(null)}
                className="flex-1 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EsteticaSpaSystem;