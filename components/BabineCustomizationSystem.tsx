import React, { useState, useEffect } from 'react';
import { 
  Palette, Type, MessageCircle, Settings, Image, Save, 
  Upload, Download, Eye, EyeOff, Sparkles, Brush, 
  Monitor, Smartphone, Tablet, RefreshCw, Check, X
} from 'lucide-react';

const BabineCustomizationSystem = () => {
  // États de personnalisation
  const [activeTab, setActiveTab] = useState('theme');
  const [previewDevice, setPreviewDevice] = useState('desktop');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  
  // Configuration thème
  const [themeConfig, setThemeConfig] = useState({
    primaryColor: '#EC4899', // Rose signature
    secondaryColor: '#F97316', // Orange accent
    accentColor: '#8B5CF6', // Violet
    backgroundColor: '#FDF2F8', // Rose très clair
    textColor: '#1F2937', // Gris foncé
    successColor: '#10B981', // Vert
    warningColor: '#F59E0B', // Jaune
    errorColor: '#EF4444', // Rouge
    gradientStyle: 'soft', // soft, vibrant, elegant
    borderRadius: 'rounded', // sharp, rounded, pill
    shadowStyle: 'soft' // none, soft, dramatic
  });

  // Configuration branding
  const [brandingConfig, setBrandingConfig] = useState({
    salonName: 'Esthetica Spa',
    tagline: 'Votre beauté, notre passion',
    logoUrl: '', // Upload logo
    faviconUrl: '',
    address: '200, 33e Rue, Notre-Dame-des-Pins, G0M 1K0',
    phone: '581-813-1123',
    email: 'info@estheticaspa.com',
    website: 'https://estheticaspa.com',
    socialMedia: {
      facebook: 'https://facebook.com/estheticaspa',
      instagram: 'https://instagram.com/estheticaspa'
    }
  });

  // Configuration messages Babine
  const [messagesConfig, setMessagesConfig] = useState({
    welcomeMessage: "Allo! C'est Babine 🤍 Comment je peux t'aider aujourd'hui?",
    greetingVariations: [
      "Allo! 🌸 C'est Babine d'Esthetica Spa!",
      "Salut! Comment ça va? C'est Babine ici!",
      "Bonjour! Babine à ton service! 😊"
    ],
    serviceResponses: {
      lipocavitation: "La lipocavitation, c'est un soin non-invasif avec ultrasons pour sculpter le corps. Entre 6-10 séances généralement.",
      iplAisselles: "L'IPL aux aisselles, c'est rapide et efficace. 15 minutes pis c'est fini!",
      soinsVisage: "J'ai 2 types : technologie (IPL/Oxygénéo) ou manuel (Ella Baché). Lequel t'intéresse?"
    },
    closingMessages: [
      "Si tu as des questions d'ici là, écris-moi!",
      "À bientôt chez Esthetica Spa! 🌸",
      "Hâte de te voir pour ton soin! ✨"
    ],
    personality: {
      tone: 'chaleureux', // professionnel, chaleureux, décontracté
      humor: 'léger', // aucun, léger, prononcé  
      emojis: 'modéré', // aucun, modéré, fréquent
      formality: 'familier' // formel, familier, très_familier
    }
  });

  // Configuration paramètres avancés
  const [advancedConfig, setAdvancedConfig] = useState({
    notifications: {
      soundEnabled: true,
      vibrationEnabled: true,
      desktopNotifications: true,
      emailNotifications: true,
      smsNotifications: true
    },
    schedule: {
      timeFormat: '24h', // 12h, 24h
      firstDayOfWeek: 'monday', // sunday, monday
      businessHours: {
        monday: { start: '09:00', end: '18:00', closed: false },
        tuesday: { start: '09:00', end: '18:00', closed: false },
        wednesday: { start: '09:00', end: '18:00', closed: false },
        thursday: { start: '09:00', end: '18:00', closed: false },
        friday: { start: '09:00', end: '18:00', closed: false },
        saturday: { start: '09:00', end: '16:00', closed: false },
        sunday: { start: '10:00', end: '15:00', closed: true }
      },
      appointmentDuration: 15, // minutes par défaut
      bufferTime: 15, // minutes entre RDV
      maxAdvanceBooking: 90 // jours
    },
    language: {
      primary: 'fr-CA', // Français canadien
      dateFormat: 'DD/MM/YYYY',
      currency: 'CAD',
      timezone: 'America/Toronto'
    }
  });

  // Thèmes prédéfinis
  const presetThemes = {
    rose_elegance: {
      name: 'Rose Élégance',
      primaryColor: '#EC4899',
      secondaryColor: '#F97316', 
      backgroundColor: '#FDF2F8',
      gradientStyle: 'elegant'
    },
    purple_luxury: {
      name: 'Violet Luxe',
      primaryColor: '#8B5CF6',
      secondaryColor: '#EC4899',
      backgroundColor: '#F5F3FF',
      gradientStyle: 'vibrant'
    },
    mint_fresh: {
      name: 'Menthe Fraîche',
      primaryColor: '#10B981',
      secondaryColor: '#06B6D4',
      backgroundColor: '#F0FDF4',
      gradientStyle: 'soft'
    },
    sunset_glow: {
      name: 'Coucher de Soleil',
      primaryColor: '#F59E0B',
      secondaryColor: '#EF4444',
      backgroundColor: '#FFFBEB',
      gradientStyle: 'vibrant'
    }
  };

  // Appliquer thème prédéfini
  const applyPresetTheme = (themeKey) => {
    const preset = presetThemes[themeKey];
    setThemeConfig(prev => ({
      ...prev,
      ...preset
    }));
    setHasUnsavedChanges(true);
  };

  // Sauvegarder configuration
  const saveConfiguration = async () => {
    try {
      const fullConfig = {
        theme: themeConfig,
        branding: brandingConfig,
        messages: messagesConfig,
        advanced: advancedConfig,
        savedAt: new Date().toISOString()
      };

      // Simulation sauvegarde
      console.log('💾 Configuration sauvegardée:', fullConfig);
      
      // En production : API call
      // await fetch('/api/save-configuration', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(fullConfig)
      // });

      setHasUnsavedChanges(false);
      
      // Notification succès
      const notification = document.createElement('div');
      notification.className = 'fixed top-4 right-4 z-50 px-6 py-3 bg-green-500 text-white rounded-lg shadow-lg';
      notification.textContent = '✅ Configuration sauvegardée avec succès!';
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 3000);

    } catch (error) {
      console.error('❌ Erreur sauvegarde:', error);
    }
  };

  // Preview Component
  const PreviewComponent = () => (
    <div 
      className={`${previewDevice === 'mobile' ? 'w-80' : previewDevice === 'tablet' ? 'w-96' : 'w-full'} 
                  bg-white rounded-2xl shadow-2xl border overflow-hidden transition-all duration-500`}
      style={{ 
        background: `linear-gradient(135deg, ${themeConfig.backgroundColor}, ${themeConfig.primaryColor}15)`
      }}
    >
      {/* Header Preview */}
      <div 
        className="px-6 py-4 text-white relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${themeConfig.primaryColor}, ${themeConfig.secondaryColor})`
        }}
      >
        <div className="flex items-center space-x-3 relative z-10">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
          >
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold">{brandingConfig.salonName}</h2>
            <p className="text-sm opacity-90">{brandingConfig.tagline}</p>
          </div>
        </div>
        <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-white/10"></div>
        <div className="absolute -right-4 -bottom-4 w-16 h-16 rounded-full bg-white/5"></div>
      </div>

      {/* Chat Preview */}
      <div className="p-4 space-y-3">
        <div className="flex justify-start">
          <div 
            className="max-w-xs px-4 py-2 rounded-2xl text-sm"
            style={{ 
              backgroundColor: `${themeConfig.primaryColor}15`,
              color: themeConfig.textColor
            }}
          >
            {messagesConfig.welcomeMessage}
          </div>
        </div>
        
        <div className="flex justify-end">
          <div 
            className="max-w-xs px-4 py-2 rounded-2xl text-sm text-white"
            style={{ backgroundColor: themeConfig.primaryColor }}
          >
            C'est quoi la lipocavitation?
          </div>
        </div>
        
        <div className="flex justify-start">
          <div 
            className="max-w-xs px-4 py-2 rounded-2xl text-sm"
            style={{ 
              backgroundColor: `${themeConfig.primaryColor}15`,
              color: themeConfig.textColor
            }}
          >
            {messagesConfig.serviceResponses.lipocavitation}
          </div>
        </div>
      </div>

      {/* Footer Preview */}
      <div className="px-4 py-3 bg-gray-50 border-t">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>{brandingConfig.phone}</span>
          <span>{brandingConfig.address.split(',')[0]}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header avec actions */}
        <div className="bg-white rounded-2xl shadow-xl border p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                <Brush className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Personnalisation Babine</h1>
                <p className="text-sm text-gray-600">Customise ton assistant IA aux couleurs d'Esthetica Spa</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {hasUnsavedChanges && (
                <div className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">
                  ⚠️ Modifications non sauvegardées
                </div>
              )}
              
              <button
                onClick={saveConfiguration}
                className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Sauvegarder</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          
          {/* Panel de configuration */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Onglets */}
            <div className="bg-white rounded-2xl shadow-xl border overflow-hidden">
              <div className="flex border-b">
                {[
                  { key: 'theme', icon: Palette, label: 'Thème & Couleurs' },
                  { key: 'branding', icon: Image, label: 'Branding' },
                  { key: 'messages', icon: MessageCircle, label: 'Messages Babine' },
                  { key: 'advanced', icon: Settings, label: 'Paramètres' }
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 font-medium transition-colors ${
                      activeTab === tab.key
                        ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </div>
              
              <div className="p-6">
                
                {/* Onglet Thème */}
                {activeTab === 'theme' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">🎨 Thèmes prédéfinis</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {Object.entries(presetThemes).map(([key, theme]) => (
                          <button
                            key={key}
                            onClick={() => applyPresetTheme(key)}
                            className="p-4 border-2 border-gray-200 rounded-xl hover:border-purple-300 transition-all group"
                          >
                            <div className="flex items-center space-x-3 mb-2">
                              <div 
                                className="w-6 h-6 rounded-full"
                                style={{ backgroundColor: theme.primaryColor }}
                              />
                              <div 
                                className="w-6 h-6 rounded-full"
                                style={{ backgroundColor: theme.secondaryColor }}
                              />
                            </div>
                            <p className="font-medium text-gray-800 group-hover:text-purple-600">
                              {theme.name}
                            </p>
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">🎯 Couleurs personnalisées</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { key: 'primaryColor', label: 'Couleur principale' },
                          { key: 'secondaryColor', label: 'Couleur secondaire' },
                          { key: 'accentColor', label: 'Couleur accent' },
                          { key: 'backgroundColor', label: 'Arrière-plan' },
                          { key: 'successColor', label: 'Succès (vert)' },
                          { key: 'errorColor', label: 'Erreur (rouge)' }
                        ].map((color) => (
                          <div key={color.key}>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              {color.label}
                            </label>
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
                                className="w-12 h-10 rounded-lg border-2 border-gray-300 cursor-pointer"
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
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono"
                                placeholder="#000000"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">✨ Style visuel</h3>
                      <div className="grid grid-cols-3 gap-4">
                        {[
                          {
                            key: 'gradientStyle',
                            label: 'Style dégradé',
                            options: [
                              { value: 'soft', label: 'Doux' },
                              { value: 'vibrant', label: 'Vibrant' },
                              { value: 'elegant', label: 'Élégant' }
                            ]
                          },
                          {
                            key: 'borderRadius',
                            label: 'Bordures',
                            options: [
                              { value: 'sharp', label: 'Carrées' },
                              { value: 'rounded', label: 'Arrondies' },
                              { value: 'pill', label: 'Pilules' }
                            ]
                          },
                          {
                            key: 'shadowStyle',
                            label: 'Ombres',
                            options: [
                              { value: 'none', label: 'Aucune' },
                              { value: 'soft', label: 'Douces' },
                              { value: 'dramatic', label: 'Dramatiques' }
                            ]
                          }
                        ].map((style) => (
                          <div key={style.key}>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              {style.label}
                            </label>
                            <select
                              value={themeConfig[style.key]}
                              onChange={(e) => {
                                setThemeConfig(prev => ({
                                  ...prev,
                                  [style.key]: e.target.value
                                }));
                                setHasUnsavedChanges(true);
                              }}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
                            >
                              {style.options.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Onglet Branding */}
                {activeTab === 'branding' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">🏢 Informations du salon</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nom du salon
                          </label>
                          <input
                            type="text"
                            value={brandingConfig.salonName}
                            onChange={(e) => {
                              setBrandingConfig(prev => ({
                                ...prev,
                                salonName: e.target.value
                              }));
                              setHasUnsavedChanges(true);
                            }}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Slogan
                          </label>
                          <input
                            type="text"
                            value={brandingConfig.tagline}
                            onChange={(e) => {
                              setBrandingConfig(prev => ({
                                ...prev,
                                tagline: e.target.value
                              }));
                              setHasUnsavedChanges(true);
                            }}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
                            placeholder="Votre beauté, notre passion"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">📍 Coordonnées</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Adresse complète
                          </label>
                          <input
                            type="text"
                            value={brandingConfig.address}
                            onChange={(e) => {
                              setBrandingConfig(prev => ({
                                ...prev,
                                address: e.target.value
                              }));
                              setHasUnsavedChanges(true);
                            }}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Téléphone
                            </label>
                            <input
                              type="tel"
                              value={brandingConfig.phone}
                              onChange={(e) => {
                                setBrandingConfig(prev => ({
                                  ...prev,
                                  phone: e.target.value
                                }));
                                setHasUnsavedChanges(true);
                              }}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Email
                            </label>
                            <input
                              type="email"
                              value={brandingConfig.email}
                              onChange={(e) => {
                                setBrandingConfig(prev => ({
                                  ...prev,
                                  email: e.target.value
                                }));
                                setHasUnsavedChanges(true);
                              }}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">📱 Réseaux sociaux</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Facebook
                          </label>
                          <input
                            type="url"
                            value={brandingConfig.socialMedia.facebook}
                            onChange={(e) => {
                              setBrandingConfig(prev => ({
                                ...prev,
                                socialMedia: {
                                  ...prev.socialMedia,
                                  facebook: e.target.value
                                }
                              }));
                              setHasUnsavedChanges(true);
                            }}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
                            placeholder="https://facebook.com/estheticaspa"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Instagram
                          </label>
                          <input
                            type="url"
                            value={brandingConfig.socialMedia.instagram}
                            onChange={(e) => {
                              setBrandingConfig(prev => ({
                                ...prev,
                                socialMedia: {
                                  ...prev.socialMedia,
                                  instagram: e.target.value
                                }
                              }));
                              setHasUnsavedChanges(true);
                            }}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
                            placeholder="https://instagram.com/estheticaspa"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Onglet Messages */}
                {activeTab === 'messages' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">💬 Message d'accueil</h3>
                      <textarea
                        value={messagesConfig.welcomeMessage}
                        onChange={(e) => {
                          setMessagesConfig(prev => ({
                            ...prev,
                            welcomeMessage: e.target.value
                          }));
                          setHasUnsavedChanges(true);
                        }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
                        rows="3"
                        placeholder="Message d'accueil de Babine..."
                      />
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">🌸 Salutations variées</h3>
                      {messagesConfig.greetingVariations.map((greeting, index) => (
                        <div key={index} className="mb-3">
                          <input
                            type="text"
                            value={greeting}
                            onChange={(e) => {
                              const newGreetings = [...messagesConfig.greetingVariations];
                              newGreetings[index] = e.target.value;
                              setMessagesConfig(prev => ({
                                ...prev,
                                greetingVariations: newGreetings
                              }));
                              setHasUnsavedChanges(true);
                            }}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
                            placeholder={`Salutation ${index + 1}`}
                          />
                        </div>
                      ))}
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">💆‍♀️ Réponses services</h3>
                      <div className="space-y-4">
                        {[
                          { key: 'lipocavitation', label: 'Lipocavitation' },
                          { key: 'iplAisselles', label: 'IPL Aisselles' },
                          { key: 'soinsVisage', label: 'Soins Visage' }
                        ].map((service) => (
                          <div key={service.key}>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              {service.label}
                            </label>
                            <textarea
                              value={messagesConfig.serviceResponses[service.key]}
                              onChange={(e) => {
                                setMessagesConfig(prev => ({
                                  ...prev,
                                  serviceResponses: {
                                    ...prev.serviceResponses,
                                    [service.key]: e.target.value
                                  }
                                }));
                                setHasUnsavedChanges(true);
                              }}
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
                              rows="2"
                              placeholder={`Réponse pour ${service.label}...`}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">🎭 Personnalité Babine</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          {
                            key: 'tone',
                            label: 'Ton général',
                            options: [
                              { value: 'professionnel', label: 'Professionnel' },
                              { value: 'chaleureux', label: 'Chaleureux' },
                              { value: 'décontracté', label: 'Décontracté' }
                            ]
                          },
                          {
                            key: 'humor',
                            label: 'Humour',
                            options: [
                              { value: 'aucun', label: 'Aucun' },
                              { value: 'léger', label: 'Léger' },
                              { value: 'prononcé', label: 'Prononcé' }
                            ]
                          },
                          {
                            key: 'emojis',
                            label: 'Usage émojis',
                            options: [
                              { value: 'aucun', label: 'Aucun' },
                              { value: 'modéré', label: 'Modéré' },
                              { value: 'fréquent', label: 'Fréquent' }
                            ]
                          },
                          {
                            key: 'formality',
                            label: 'Formalité',
                            options: [
                              { value: 'formel', label: 'Formel (vous)' },
                              { value: 'familier', label: 'Familier (tu)' },
                              { value: 'très_familier', label: 'Très familier' }
                            ]
                          }
                        ].map((trait) => (
                          <div key={trait.key}>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              {trait.label}
                            </label>
                            <select
                              value={messagesConfig.personality[trait.key]}
                              onChange={(e) => {
                                setMessagesConfig(prev => ({
                                  ...prev,
                                  personality: {
                                    ...prev.personality,
                                    [trait.key]: e.target.value
                                  }
                                }));
                                setHasUnsavedChanges(true);
                              }}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
                            >
                              {trait.options.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Onglet Paramètres avancés */}
                {activeTab === 'advanced' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">🔔 Notifications</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { key: 'soundEnabled', label: 'Sons' },
                          { key: 'vibrationEnabled', label: 'Vibrations' },
                          { key: 'desktopNotifications', label: 'Notifications bureau' },
                          { key: 'emailNotifications', label: 'Notifications email' },
                          { key: 'smsNotifications', label: 'Notifications SMS' }
                        ].map((notification) => (
                          <div key={notification.key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <span className="text-sm font-medium text-gray-700">
                              {notification.label}
                            </span>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                checked={advancedConfig.notifications[notification.key]}
                                onChange={(e) => {
                                  setAdvancedConfig(prev => ({
                                    ...prev,
                                    notifications: {
                                      ...prev.notifications,
                                      [notification.key]: e.target.checked
                                    }
                                  }));
                                  setHasUnsavedChanges(true);
                                }}
                                className="sr-only"
                              />
                              <div className={`w-11 h-6 rounded-full transition-colors ${
                                advancedConfig.notifications[notification.key] 
                                  ? 'bg-purple-600' 
                                  : 'bg-gray-300'
                              }`}>
                                <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${
                                  advancedConfig.notifications[notification.key] 
                                    ? 'translate-x-5' 
                                    : 'translate-x-0.5'
                                } mt-0.5`}>
                                </div>
                              </div>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">⏰ Heures d'ouverture</h3>
                      <div className="space-y-3">
                        {Object.entries(advancedConfig.schedule.businessHours).map(([day, hours]) => (
                          <div key={day} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                            <div className="w-20 text-sm font-medium text-gray-700 capitalize">
                              {day === 'monday' ? 'Lundi' :
                               day === 'tuesday' ? 'Mardi' :
                               day === 'wednesday' ? 'Mercredi' :
                               day === 'thursday' ? 'Jeudi' :
                               day === 'friday' ? 'Vendredi' :
                               day === 'saturday' ? 'Samedi' : 'Dimanche'}
                            </div>
                            
                            <label className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                checked={!hours.closed}
                                onChange={(e) => {
                                  setAdvancedConfig(prev => ({
                                    ...prev,
                                    schedule: {
                                      ...prev.schedule,
                                      businessHours: {
                                        ...prev.schedule.businessHours,
                                        [day]: {
                                          ...hours,
                                          closed: !e.target.checked
                                        }
                                      }
                                    }
                                  }));
                                  setHasUnsavedChanges(true);
                                }}
                                className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
                              />
                              <span className="text-sm text-gray-600">Ouvert</span>
                            </label>
                            
                            {!hours.closed && (
                              <div className="flex items-center space-x-2">
                                <input
                                  type="time"
                                  value={hours.start}
                                  onChange={(e) => {
                                    setAdvancedConfig(prev => ({
                                      ...prev,
                                      schedule: {
                                        ...prev.schedule,
                                        businessHours: {
                                          ...prev.schedule.businessHours,
                                          [day]: {
                                            ...hours,
                                            start: e.target.value
                                          }
                                        }
                                      }
                                    }));
                                    setHasUnsavedChanges(true);
                                  }}
                                  className="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-purple-400"
                                />
                                <span className="text-gray-500">à</span>
                                <input
                                  type="time"
                                  value={hours.end}
                                  onChange={(e) => {
                                    setAdvancedConfig(prev => ({
                                      ...prev,
                                      schedule: {
                                        ...prev.schedule,
                                        businessHours: {
                                          ...prev.schedule.businessHours,
                                          [day]: {
                                            ...hours,
                                            end: e.target.value
                                          }
                                        }
                                      }
                                    }));
                                    setHasUnsavedChanges(true);
                                  }}
                                  className="px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-purple-400"
                                />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">📅 Paramètres rendez-vous</h3>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Durée par défaut (min)
                          </label>
                          <input
                            type="number"
                            value={advancedConfig.schedule.appointmentDuration}
                            onChange={(e) => {
                              setAdvancedConfig(prev => ({
                                ...prev,
                                schedule: {
                                  ...prev.schedule,
                                  appointmentDuration: parseInt(e.target.value)
                                }
                              }));
                              setHasUnsavedChanges(true);
                            }}
                            min="15"
                            max="180"
                            step="15"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Temps tampon (min)
                          </label>
                          <input
                            type="number"
                            value={advancedConfig.schedule.bufferTime}
                            onChange={(e) => {
                              setAdvancedConfig(prev => ({
                                ...prev,
                                schedule: {
                                  ...prev.schedule,
                                  bufferTime: parseInt(e.target.value)
                                }
                              }));
                              setHasUnsavedChanges(true);
                            }}
                            min="0"
                            max="60"
                            step="5"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Réservation max (jours)
                          </label>
                          <input
                            type="number"
                            value={advancedConfig.schedule.maxAdvanceBooking}
                            onChange={(e) => {
                              setAdvancedConfig(prev => ({
                                ...prev,
                                schedule: {
                                  ...prev.schedule,
                                  maxAdvanceBooking: parseInt(e.target.value)
                                }
                              }));
                              setHasUnsavedChanges(true);
                            }}
                            min="1"
                            max="365"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Preview Panel */}
          <div className="space-y-6">
            
            {/* Contrôles preview */}
            <div className="bg-white rounded-2xl shadow-xl border p-4">
              <h3 className="font-semibold text-gray-800 mb-3">👁️ Aperçu</h3>
              <div className="flex items-center justify-center space-x-2 mb-4">
                {[
                  { key: 'mobile', icon: Smartphone, label: 'Mobile' },
                  { key: 'tablet', icon: Tablet, label: 'Tablette' },
                  { key: 'desktop', icon: Monitor, label: 'Bureau' }
                ].map((device) => (
                  <button
                    key={device.key}
                    onClick={() => setPreviewDevice(device.key)}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      previewDevice === device.key
                        ? 'bg-purple-100 text-purple-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <device.icon className="w-4 h-4" />
                    <span>{device.label}</span>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Preview live */}
            <div className="bg-white rounded-2xl shadow-xl border p-6">
              <div className="flex items-center justify-center">
                <PreviewComponent />
              </div>
            </div>
            
            {/* Actions rapides */}
            <div className="bg-white rounded-2xl shadow-xl border p-4">
              <h3 className="font-semibold text-gray-800 mb-3">⚡ Actions rapides</h3>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    const config = JSON.stringify({
                      theme: themeConfig,
                      branding: brandingConfig,
                      messages: messagesConfig,
                      advanced: advancedConfig
                    }, null, 2);
                    
                    const blob = new Blob([config], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'babine-config.json';
                    a.click();
                  }}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Exporter config</span>
                </button>
                
                <button
                  onClick={() => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = '.json';
                    input.onchange = (e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                          try {
                            const config = JSON.parse(e.target.result);
                            setThemeConfig(config.theme || themeConfig);
                            setBrandingConfig(config.branding || brandingConfig);
                            setMessagesConfig(config.messages || messagesConfig);
                            setAdvancedConfig(config.advanced || advancedConfig);
                            setHasUnsavedChanges(true);
                          } catch (error) {
                            alert('Erreur lors de l\'import du fichier');
                          }
                        };
                        reader.readAsText(file);
                      }
                    };
                    input.click();
                  }}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  <span>Importer config</span>
                </button>
                
                <button
                  onClick={() => {
                    // Reset à la configuration par défaut
                    setThemeConfig({
                      primaryColor: '#EC4899',
                      secondaryColor: '#F97316',
                      accentColor: '#8B5CF6',
                      backgroundColor: '#FDF2F8',
                      textColor: '#1F2937',
                      successColor: '#10B981',
                      warningColor: '#F59E0B',
                      errorColor: '#EF4444',
                      gradientStyle: 'soft',
                      borderRadius: 'rounded',
                      shadowStyle: 'soft'
                    });
                    setHasUnsavedChanges(true);
                  }}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Reset par défaut</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer avec sauvegarde */}
        {hasUnsavedChanges && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white border-2 border-yellow-300 rounded-2xl shadow-2xl p-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-yellow-700">
                <RefreshCw className="w-5 h-5" />
                <span className="font-medium">Modifications non sauvegardées</span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    // Annuler les modifications (reload)
                    window.location.reload();
                  }}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={saveConfiguration}
                  className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all font-medium"
                >
                  Sauvegarder maintenant
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BabineCustomizationSystem;
                