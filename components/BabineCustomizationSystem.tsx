import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  Palette, Type, MessageCircle, Settings, Image, Save, 
  Upload, Download, Eye, EyeOff, Sparkles, Brush, 
  Monitor, Smartphone, Tablet, RefreshCw, Check, X, Zap, Heart
} from 'lucide-react';

// =============================================
// 🎨 SYSTÈME DE PERSONNALISATION OPTIMISÉ
// =============================================

const BabineCustomizationSystem = () => {
  // ⚡ ÉTATS OPTIMISÉS AVEC USEMEMO
  const [activeTab, setActiveTab] = useState('theme');
  const [previewDevice, setPreviewDevice] = useState('desktop');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [lastBabineResponse, setLastBabineResponse] = useState('');
  
  // 🎯 CONFIGURATION THÈME OPTIMISÉE
  const [themeConfig, setThemeConfig] = useState({
    primaryColor: '#EC4899',
    secondaryColor: '#8B5CF6', 
    accentColor: '#06B6D4',
    backgroundColor: '#FDF2F8',
    textColor: '#1F2937',
    successColor: '#10B981',
    warningColor: '#F59E0B',
    errorColor: '#EF4444',
    gradientStyle: 'elegant',
    borderRadius: 'rounded',
    shadowStyle: 'soft'
  });

  // 🏢 CONFIGURATION BRANDING
  const [brandingConfig, setBrandingConfig] = useState({
    salonName: 'Esthetica Spa',
    tagline: 'Votre beauté, notre passion',
    logoUrl: '',
    address: '200, 33e Rue, Notre-Dame-des-Pins, G0M 1K0',
    phone: '581-813-1123',
    email: 'info@estheticaspa.com',
    website: 'https://estheticaspa.com',
    socialMedia: {
      facebook: 'https://facebook.com/estheticaspa',
      instagram: 'https://instagram.com/estheticaspa'
    }
  });

  // 🤖 CONFIGURATION MESSAGES BABINE INTELLIGENTE
  const [messagesConfig, setMessagesConfig] = useState({
    welcomeMessage: "Salut Jessica! 🌸 C'est Babine, comment ça va aujourd'hui?",
    greetingVariations: [
      "Allo Jessica! 🌸 Comment se passe ta journée?",
      "Salut! J'espère que tout va bien au spa aujourd'hui!",
      "Bonjour! Babine à ton service, prête pour une belle journée! ✨"
    ],
    serviceResponses: {
      lipocavitation: "La lipocavitation, c'est ton service signature! Soin ultrasons non-invasif pour sculpter le corps. Les clients adorent les résultats qu'ils obtiennent avec toi.",
      iplAisselles: "IPL aisselles, rapide et efficace! 15 minutes de pure magie technologique. Tes clientes ressortent toujours satisfaites.",
      soinsVisage: "Tes soins visage sont exceptionnels! Entre la technologie (IPL/Oxygénéo) et les soins manuels Ella Baché, tu offres le meilleur des deux mondes."
    },
    conversationalResponses: {
      stress: "Je vois que tu es un peu stressée. Prends une grande respiration, tu gères toujours tout avec brio! Veux-tu que je regarde ton horaire pour voir s'il y a des moments pour souffler?",
      busy: "Tu as une journée bien remplie! N'oublie pas que tu fais un travail extraordinaire. Tes clientes sont chanceuses de t'avoir.",
      team: "Obeylia et toi formez une super équipe! Elle apprend vite et s'intègre bien. Comment ça se passe avec elle aujourd'hui?"
    },
    personality: {
      tone: 'supportive',
      intelligence: 'contextual',
      empathy: 'high',
      humor: 'léger',
      formality: 'familier'
    }
  });

  // 🔧 CONFIGURATION AVANCÉE
  const [advancedConfig, setAdvancedConfig] = useState({
    ai: {
      contextMemory: true,
      moodDetection: true,
      proactiveAssistance: true,
      learningEnabled: true
    },
    notifications: {
      smartTiming: true,
      contextAware: true,
      prioritySystem: 'intelligent'
    },
    schedule: {
      timeFormat: '24h',
      firstDayOfWeek: 'monday',
      businessHours: {
        monday: { start: '09:00', end: '18:00', closed: false },
        tuesday: { start: '09:00', end: '18:00', closed: false },
        wednesday: { start: '09:00', end: '18:00', closed: false },
        thursday: { start: '09:00', end: '18:00', closed: false },
        friday: { start: '09:00', end: '18:00', closed: false },
        saturday: { start: '09:00', end: '16:00', closed: false },
        sunday: { start: '10:00', end: '15:00', closed: true }
      },
      appointmentDuration: 15,
      bufferTime: 15,
      maxAdvanceBooking: 90
    }
  });

  // 🎨 THÈMES PRÉDÉFINIS PREMIUM
  const presetThemes = useMemo(() => ({
    rose_elegance: {
      name: 'Rose Élégant',
      primaryColor: '#EC4899',
      secondaryColor: '#8B5CF6',
      backgroundColor: '#FDF2F8',
      gradientStyle: 'elegant',
      mood: 'feminine'
    },
    luxury_purple: {
      name: 'Luxe Violet',
      primaryColor: '#7C3AED',
      secondaryColor: '#EC4899',
      backgroundColor: '#F5F3FF',
      gradientStyle: 'vibrant',
      mood: 'premium'
    },
    ocean_fresh: {
      name: 'Océan Frais',
      primaryColor: '#06B6D4',
      secondaryColor: '#10B981',
      backgroundColor: '#F0FDFA',
      gradientStyle: 'soft',
      mood: 'refreshing'
    },
    sunset_glow: {
      name: 'Coucher Doré',
      primaryColor: '#F59E0B',
      secondaryColor: '#EF4444',
      backgroundColor: '#FFFBEB',
      gradientStyle: 'vibrant',
      mood: 'warm'
    }
  }), []);

  // ⚡ FONCTIONS OPTIMISÉES AVEC USECALLBACK
  const applyPresetTheme = useCallback((themeKey: string) => {
    const preset = presetThemes[themeKey];
    if (preset) {
      setThemeConfig(prev => ({
        ...prev,
        ...preset
      }));
      setHasUnsavedChanges(true);
    }
  }, [presetThemes]);

  const saveConfiguration = useCallback(async () => {
    try {
      const fullConfig = {
        theme: themeConfig,
        branding: brandingConfig,
        messages: messagesConfig,
        advanced: advancedConfig,
        savedAt: new Date().toISOString(),
        version: '2.0'
      };

      console.log('💾 Configuration sauvegardée:', fullConfig);
      
      setHasUnsavedChanges(false);
      
      // Notification succès optimisée
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 z-50 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl shadow-2xl border border-white/20 backdrop-blur animate-slideIn';
      notification.innerHTML = `
        <div class="flex items-center space-x-2">
          <div class="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
            ✓
          </div>
          <span class="font-medium">Configuration sauvegardée avec succès!</span>
        </div>
      `;
      document.body.appendChild(notification);
      setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in forwards';
        setTimeout(() => notification.remove(), 300);
      }, 2500);

    } catch (error) {
      console.error('❌ Erreur sauvegarde:', error);
    }
  }, [themeConfig, brandingConfig, messagesConfig, advancedConfig]);

  // � STYLES OPTIMISÉS AVEC USEMEMO
  const gradientStyle = useMemo(() => ({
    background: themeConfig.gradientStyle === 'elegant'
      ? `linear-gradient(135deg, ${themeConfig.primaryColor}, ${themeConfig.secondaryColor})`
      : `linear-gradient(45deg, ${themeConfig.primaryColor}, ${themeConfig.secondaryColor})`
  }), [themeConfig.gradientStyle, themeConfig.primaryColor, themeConfig.secondaryColor]);

  const messageStyle = useMemo(() => ({
    backgroundColor: `${themeConfig.primaryColor}15`,
    borderColor: `${themeConfig.primaryColor}30`,
    color: themeConfig.textColor
  }), [themeConfig.primaryColor, themeConfig.textColor]);

  // �🎯 COMPOSANT PREVIEW OPTIMISÉ
  const PreviewComponent = useMemo(() => {
    return (
      <div 
        className={`${
          previewDevice === 'mobile' ? 'w-80' : 
          previewDevice === 'tablet' ? 'w-96' : 'w-full'
        } bg-white rounded-3xl shadow-2xl border overflow-hidden transition-all duration-500 max-w-md mx-auto`}
        style={{ 
          background: `linear-gradient(135deg, ${themeConfig.backgroundColor}, ${themeConfig.primaryColor}15)`
        }}
      >
        {/* Header Preview */}
        <div 
          className="px-6 py-6 text-white relative overflow-hidden"
          style={gradientStyle}
        >
          <div className="flex items-center space-x-4 relative z-10">
            <div 
              className="w-14 h-14 rounded-full flex items-center justify-center backdrop-blur border-2 border-white/30"
              style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}
            >
              <Sparkles className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl font-bold">{brandingConfig.salonName}</h2>
              <p className="text-sm opacity-90">{brandingConfig.tagline}</p>
            </div>
          </div>
          
          {/* Éléments décoratifs */}
          <div className="absolute -right-6 -top-6 w-20 h-20 rounded-full bg-white/10 backdrop-blur"></div>
          <div className="absolute -right-2 -bottom-2 w-12 h-12 rounded-full bg-white/5"></div>
        </div>

        {/* Chat Preview Intelligent - Optimisé */}
        <div className="p-5 space-y-4">
          <div className="flex justify-end">
            <div 
              className="max-w-xs px-4 py-3 rounded-2xl text-sm text-white shadow-lg"
              style={{ 
                background: `linear-gradient(135deg, ${themeConfig.primaryColor}, ${themeConfig.secondaryColor})` 
              }}
            >
              Comment ça va aujourd'hui au spa?
            </div>
          </div>
          
          <div className="flex justify-start">
            <div 
              className="max-w-xs px-4 py-3 rounded-2xl text-sm backdrop-blur border"
              style={messageStyle}
            >
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-lg">💪</span>
                <span className="font-medium text-xs opacity-75">Babine</span>
              </div>
              {messagesConfig.conversationalResponses.busy}
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="px-5 py-4 bg-gradient-to-r from-gray-50 to-purple-50 border-t border-white/40">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span className="flex items-center">
              <Heart className="w-4 h-4 mr-1 text-pink-500" />
              {brandingConfig.phone}
            </span>
            <span>{brandingConfig.address.split(',')[0]}</span>
          </div>
        </div>
      </div>
    );
  }, [previewDevice, themeConfig, brandingConfig, messagesConfig]);

  // 🎨 INTERFACE PRINCIPALE
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Premium */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Brush className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Personnalisation Babine
                </h1>
                <p className="text-gray-600 mt-1">
                  Intelligence artificielle sur mesure pour Esthetica Spa
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {hasUnsavedChanges && (
                <div className="px-4 py-2 bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-800 text-sm rounded-2xl border border-orange-200 flex items-center space-x-2">
                  <Zap className="w-4 h-4" />
                  <span>Modifications non sauvegardées</span>
                </div>
              )}
              
              <button
                onClick={saveConfiguration}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-2xl hover:from-purple-600 hover:to-pink-700 transition-all flex items-center space-x-2 shadow-lg hover:shadow-xl font-medium"
              >
                <Save className="w-5 h-5" />
                <span>Sauvegarder</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Panel de configuration */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Onglets Premium */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
              <div className="flex border-b border-white/20">
                {[
                  { key: 'theme', icon: Palette, label: 'Thème & Style', color: 'from-purple-500 to-indigo-600' },
                  { key: 'branding', icon: Image, label: 'Branding', color: 'from-pink-500 to-rose-600' },
                  { key: 'messages', icon: MessageCircle, label: 'Intelligence IA', color: 'from-blue-500 to-cyan-600' },
                  { key: 'advanced', icon: Settings, label: 'Paramètres Pro', color: 'from-green-500 to-emerald-600' }
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex-1 flex items-center justify-center space-x-2 px-6 py-4 font-medium transition-all ${
                      activeTab === tab.key
                        ? `bg-gradient-to-r ${tab.color} text-white shadow-lg`
                        : 'text-gray-600 hover:bg-white/60'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </div>
              
              <div className="p-8">
                
                {/* Onglet Thème */}
                {activeTab === 'theme' && (
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                        <Sparkles className="w-6 h-6 mr-2 text-purple-600" />
                        Thèmes Premium
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        {Object.entries(presetThemes).map(([key, theme]) => (
                          <button
                            key={key}
                            onClick={() => applyPresetTheme(key)}
                            className="group p-6 border-2 border-gray-200 rounded-2xl hover:border-purple-300 transition-all hover:shadow-lg"
                          >
                            <div className="flex items-center space-x-3 mb-4">
                              <div 
                                className="w-8 h-8 rounded-full shadow-md"
                                style={{ backgroundColor: theme.primaryColor }}
                              />
                              <div 
                                className="w-8 h-8 rounded-full shadow-md"
                                style={{ backgroundColor: theme.secondaryColor }}
                              />
                            </div>
                            <p className="font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
                              {theme.name}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              Style {theme.mood}
                            </p>
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-6">Personnalisation Avancée</h3>
                      <div className="grid grid-cols-2 gap-6">
                        {[
                          { key: 'primaryColor', label: 'Couleur principale', desc: 'Couleur dominante de l\'interface' },
                          { key: 'secondaryColor', label: 'Couleur secondaire', desc: 'Accents et dégradés' },
                          { key: 'accentColor', label: 'Couleur accent', desc: 'Éléments interactifs' },
                          { key: 'backgroundColor', label: 'Arrière-plan', desc: 'Fond de l\'interface' }
                        ].map((color) => (
                          <div key={color.key} className="p-4 bg-gray-50 rounded-2xl">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              {color.label}
                            </label>
                            <p className="text-xs text-gray-500 mb-3">{color.desc}</p>
                            <div className="flex items-center space-x-3">
                              <input
                                type="color"
                                value={themeConfig[color.key]}
                                onChange={(e) => {
                                  setThemeConfig(prev => ({
                                    ...prev,
                                    [color.key]: e.target.value
                                  }));
                                  setHasUnsavedChanges(true);
                                }}
                                className="w-14 h-14 rounded-xl border-2 border-gray-300 cursor-pointer shadow-md hover:shadow-lg transition-shadow"
                              />
                              <input
                                type="text"
                                value={themeConfig[color.key]}
                                onChange={(e) => {
                                  setThemeConfig(prev => ({
                                    ...prev,
                                    [color.key]: e.target.value
                                  }));
                                  setHasUnsavedChanges(true);
                                }}
                                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl text-sm font-mono focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                                placeholder="#000000"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Onglet Intelligence IA */}
                {activeTab === 'messages' && (
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                        <MessageCircle className="w-6 h-6 mr-2 text-blue-600" />
                        Intelligence Conversationnelle
                      </h3>
                      
                      <div className="grid gap-6">
                        <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-100">
                          <h4 className="font-semibold text-gray-800 mb-3">Message d'accueil personnalisé</h4>
                          <textarea
                            value={messagesConfig.welcomeMessage}
                            onChange={(e) => {
                              setMessagesConfig(prev => ({
                                ...prev,
                                welcomeMessage: e.target.value
                              }));
                              setHasUnsavedChanges(true);
                            }}
                            className="w-full px-4 py-3 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white/80 backdrop-blur"
                            rows={3}
                            placeholder="Message d'accueil intelligent de Babine..."
                          />
                        </div>

                        <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-100">
                          <h4 className="font-semibold text-gray-800 mb-4">Réponses Contextuelles Intelligentes</h4>
                          <div className="space-y-4">
                            {Object.entries(messagesConfig.conversationalResponses).map(([key, response]) => (
                              <div key={key}>
                                <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                                  Situation: {key === 'stress' ? 'Stress détecté' : key === 'busy' ? 'Journée chargée' : 'Équipe'}
                                </label>
                                <textarea
                                  value={response}
                                  onChange={(e) => {
                                    setMessagesConfig(prev => ({
                                      ...prev,
                                      conversationalResponses: {
                                        ...prev.conversationalResponses,
                                        [key]: e.target.value
                                      }
                                    }));
                                    setHasUnsavedChanges(true);
                                  }}
                                  className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:border-transparent bg-white/80"
                                  rows={2}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Autres onglets simplifiés pour l'espace */}
                {activeTab === 'branding' && (
                  <div className="text-center py-12">
                    <Image className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">Configuration Branding</h3>
                    <p className="text-gray-500">Paramètres du salon et informations de contact</p>
                  </div>
                )}

                {activeTab === 'advanced' && (
                  <div className="text-center py-12">
                    <Settings className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">Paramètres Avancés</h3>
                    <p className="text-gray-500">Notifications intelligentes et horaires</p>
                  </div>
                )}
                
              </div>
            </div>
          </div>
          
          {/* Preview Panel */}
          <div className="space-y-6">
            
            {/* Contrôles preview */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-6">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                <Eye className="w-5 h-5 mr-2 text-purple-600" />
                Aperçu en Temps Réel
              </h3>
              <div className="flex items-center justify-center space-x-2 mb-6">
                {[
                  { key: 'mobile', icon: Smartphone, label: 'Mobile' },
                  { key: 'tablet', icon: Tablet, label: 'Tablette' },
                  { key: 'desktop', icon: Monitor, label: 'Bureau' }
                ].map((device) => (
                  <button
                    key={device.key}
                    onClick={() => setPreviewDevice(device.key)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      previewDevice === device.key
                        ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg'
                        : 'text-gray-600 hover:bg-white/60 border border-gray-200'
                    }`}
                  >
                    <device.icon className="w-4 h-4" />
                    <span>{device.label}</span>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Preview live */}
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-6">
              {PreviewComponent}
            </div>
            
          </div>
        </div>
        
      </div>
      
      {/* CSS Global pour les animations */}
      <style jsx global>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes slideOut {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default BabineCustomizationSystem;