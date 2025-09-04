import React, { useState, useEffect } from 'react';
import { 
  Calendar, Download, Upload, Users, Mail, Phone, 
  CheckCircle, AlertCircle, Clock, User, Settings,
  Eye, EyeOff, Trash2, Edit, Plus, RefreshCw
} from 'lucide-react';

const CalendarImportSystem = () => {
  const [importStatus, setImportStatus] = useState('idle'); // idle, importing, success, error
  const [importedEvents, setImportedEvents] = useState([]);
  const [importProgress, setImportProgress] = useState(0);
  const [selectedCalendars, setSelectedCalendars] = useState(['primary']);
  const [importResults, setImportResults] = useState(null);
  const [obeyliaAccess, setObeyliaAccess] = useState('pending');
  
  // Calendriers disponibles pour import
  const availableCalendars = [
    { 
      id: 'primary', 
      name: 'Calendrier Principal Jessica',
      email: 'info@estheticaspa.com',
      description: 'Ton calendrier Google principal'
    },
    { 
      id: 'esthetica.business@gmail.com', 
      name: 'Calendrier Esthetica Business',
      email: 'esthetica.business@gmail.com',
      description: 'Calendrier professionnel du salon'
    },
    { 
      id: 'jessica.esthetica@outlook.com', 
      name: 'Calendrier Outlook Jessica',
      email: 'jessica.esthetica@outlook.com',
      description: 'Calendrier Outlook (si applicable)'
    }
  ];

  // Simuler l'import des calendriers
  const handleImportCalendars = async () => {
    setImportStatus('importing');
    setImportProgress(0);
    
    try {
      // Simulation progression
      for (let i = 0; i <= 100; i += 10) {
        setImportProgress(i);
        await new Promise(resolve => setTimeout(resolve, 200));
      }
      
      // Simuler événements importés
      const mockImportedEvents = [
        {
          id: 'import_1',
          clientName: 'Marie Dubois',
          phone: '418-555-1234',
          service: 'lipocavitation',
          employee: 'jessica',
          date: '2025-09-05',
          time: '10:00',
          duration: 90,
          source: 'google_calendar',
          status: 'imported'
        },
        {
          id: 'import_2',
          clientName: 'Sophie Martin',
          phone: '418-555-5678', 
          service: 'ipl-aisselles',
          employee: 'jessica',
          date: '2025-09-06',
          time: '14:00',
          duration: 15,
          source: 'google_calendar',
          status: 'imported'
        },
        {
          id: 'import_3',
          clientName: 'Julie Tremblay',
          phone: '418-555-9012',
          service: 'green-filler',
          employee: 'jessica',
          date: '2025-09-07',
          time: '16:00',
          duration: 120,
          source: 'google_calendar',
          status: 'imported'
        },
        {
          id: 'import_4',
          clientName: 'Emma Bouchard',
          phone: '418-555-3456',
          service: 'pose-ongles',
          employee: 'obeylia',
          date: '2025-09-08',
          time: '13:00',
          duration: 120,
          source: 'google_calendar',
          status: 'imported'
        },
        {
          id: 'import_5',
          clientName: 'Camille Gagnon',
          phone: '418-555-7890',
          service: 'lifting-colombien',
          employee: 'jessica',
          date: '2025-09-09',
          time: '11:00',
          duration: 60,
          source: 'google_calendar',
          status: 'imported'
        }
      ];
      
      setImportedEvents(mockImportedEvents);
      setImportResults({
        total: mockImportedEvents.length,
        success: mockImportedEvents.length,
        errors: 0,
        duplicates: 0
      });
      setImportStatus('success');
      
    } catch (error) {
      setImportStatus('error');
      console.error('Erreur import:', error);
    }
  };

  // Configurer accès Obeylia
  const configureObeyliaAccess = async () => {
    setObeyliaAccess('configuring');
    
    // Simulation configuration
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setObeyliaAccess('configured');
    
    // Simulation email d'invitation
    console.log(`📧 Email d'invitation envoyé à obeyliagilbert@hotmail.com`);
  };

  // Services mapping pour affichage
  const getServiceName = (serviceKey) => {
    const serviceMap = {
      'lipocavitation': 'Lipocavitation',
      'ipl-aisselles': 'IPL Aisselles',
      'green-filler': 'Green Filler', 
      'pose-ongles': 'Pose Ongles',
      'lifting-colombien': 'Lifting Colombien',
      'ipl-acne': 'IPL Acné',
      'pedicure': 'Pédicure',
      'bronzage': 'Bronzage'
    };
    return serviceMap[serviceKey] || serviceKey;
  };

  const getServiceColor = (serviceKey) => {
    const colorMap = {
      'lipocavitation': '#06B6D4',
      'ipl-aisselles': '#EF4444', 
      'green-filler': '#10B981',
      'pose-ongles': '#F97316',
      'lifting-colombien': '#84CC16',
      'ipl-acne': '#8B5CF6',
      'pedicure': '#EC4899',
      'bronzage': '#F59E0B'
    };
    return colorMap[serviceKey] || '#6B7280';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Calendar className="w-8 h-8" />
                <div>
                  <h1 className="text-2xl font-bold">Import Calendriers + Accès Obeylia</h1>
                  <p className="text-sm text-purple-100">Récupère tes rendez-vous existants et configure l'accès employée</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          
          {/* Section Import Calendriers */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-600 px-6 py-4 text-white">
              <div className="flex items-center space-x-3">
                <Download className="w-6 h-6" />
                <div>
                  <h2 className="text-lg font-bold">Import Calendriers Google</h2>
                  <p className="text-sm text-blue-100">Récupère tes rendez-vous existants</p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              
              {/* Sélection calendriers */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Calendriers à importer</h3>
                <div className="space-y-3">
                  {availableCalendars.map((calendar) => (
                    <div key={calendar.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <input
                        type="checkbox"
                        id={calendar.id}
                        checked={selectedCalendars.includes(calendar.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedCalendars(prev => [...prev, calendar.id]);
                          } else {
                            setSelectedCalendars(prev => prev.filter(id => id !== calendar.id));
                          }
                        }}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <div className="flex-1">
                        <label htmlFor={calendar.id} className="font-medium text-gray-800 cursor-pointer">
                          {calendar.name}
                        </label>
                        <p className="text-xs text-gray-500">{calendar.description}</p>
                        <p className="text-xs text-blue-600">{calendar.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Période d'import */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date début</label>
                  <input
                    type="date"
                    defaultValue="2025-09-01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date fin</label>
                  <input
                    type="date"
                    defaultValue="2025-12-31"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Bouton d'import */}
              <div className="pt-4">
                <button
                  onClick={handleImportCalendars}
                  disabled={importStatus === 'importing' || selectedCalendars.length === 0}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-lg hover:from-blue-600 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium flex items-center justify-center space-x-2"
                >
                  {importStatus === 'importing' ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>Import en cours... {importProgress}%</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5" />
                      <span>Importer les calendriers</span>
                    </>
                  )}
                </button>
              </div>

              {/* Barre de progression */}
              {importStatus === 'importing' && (
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-cyan-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${importProgress}%` }}
                  />
                </div>
              )}

              {/* Résultats d'import */}
              {importResults && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <h4 className="font-medium text-green-800">Import terminé avec succès!</h4>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Total événements:</span>
                      <span className="font-semibold text-green-700 ml-2">{importResults.total}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Importés:</span>
                      <span className="font-semibold text-green-700 ml-2">{importResults.success}</span>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Section Accès Obeylia */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-pink-500 to-rose-600 px-6 py-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Users className="w-6 h-6" />
                  <div>
                    <h2 className="text-lg font-bold">Accès Employée Obeylia</h2>
                    <p className="text-sm text-pink-100">Configuration du compte utilisateur</p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  obeyliaAccess === 'configured' ? 'bg-green-100 text-green-800' :
                  obeyliaAccess === 'configuring' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {obeyliaAccess === 'configured' ? '✅ Configuré' :
                   obeyliaAccess === 'configuring' ? '⚙️ Configuration...' :
                   '⏳ En attente'}
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              
              {/* Infos Obeylia */}
              <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-4 rounded-lg border border-pink-100">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">Obeylia Gilbert</h3>
                    <p className="text-sm text-gray-600 mt-1">obeyliagilbert@hotmail.com</p>
                    <div className="flex items-center space-x-4 mt-3 text-sm">
                      <div className="flex items-center space-x-1">
                        <span className="text-gray-500">Rôle:</span>
                        <span className="font-medium text-pink-600">Esthéticienne</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="text-gray-500">Spécialités:</span>
                        <span className="font-medium text-pink-600">IPL, Ongles, Soins</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Permissions */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">Permissions accordées</h3>
                <div className="space-y-3">
                  {[
                    { permission: 'Voir son propre horaire', icon: Calendar, enabled: true },
                    { permission: 'Gérer ses rendez-vous', icon: Edit, enabled: true },
                    { permission: 'Voir les informations clients', icon: Users, enabled: true },
                    { permission: 'Recevoir notifications SMS', icon: Phone, enabled: true },
                    { permission: 'Accès calendrier Google partagé', icon: Calendar, enabled: true },
                    { permission: 'Modifier horaires autres employées', icon: Settings, enabled: false }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <item.icon className={`w-5 h-5 ${item.enabled ? 'text-green-600' : 'text-gray-400'}`} />
                        <span className={`text-sm ${item.enabled ? 'text-gray-800' : 'text-gray-500'}`}>
                          {item.permission}
                        </span>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {item.enabled ? 'Activé' : 'Désactivé'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <button
                  onClick={configureObeyliaAccess}
                  disabled={obeyliaAccess === 'configuring' || obeyliaAccess === 'configured'}
                  className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-lg hover:from-pink-600 hover:to-rose-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium flex items-center justify-center space-x-2"
                >
                  {obeyliaAccess === 'configuring' ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>Configuration en cours...</span>
                    </>
                  ) : obeyliaAccess === 'configured' ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      <span>Accès configuré</span>
                    </>
                  ) : (
                    <>
                      <Mail className="w-5 h-5" />
                      <span>Configurer l'accès et envoyer invitation</span>
                    </>
                  )}
                </button>

                {obeyliaAccess === 'configured' && (
                  <div className="text-center">
                    <p className="text-sm text-green-600 font-medium">
                      📧 Invitation envoyée à obeyliagilbert@hotmail.com
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Obeylia recevra un lien pour accéder à son interface Babine
                    </p>
                  </div>
                )}
              </div>

            </div>
          </div>

        </div>

        {/* Événements importés */}
        {importedEvents.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-teal-600 px-6 py-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6" />
                  <div>
                    <h2 className="text-lg font-bold">Rendez-vous importés ({importedEvents.length})</h2>
                    <p className="text-sm text-green-100">Synchronisés depuis tes calendriers Google</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="grid gap-3">
                {importedEvents.map((event) => (
                  <div key={event.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div 
                        className="w-4 h-4 rounded-full flex-shrink-0"
                        style={{ backgroundColor: getServiceColor(event.service) }}
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <span className="font-medium text-gray-800">{event.clientName}</span>
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-sm font-medium" style={{ color: getServiceColor(event.service) }}>
                            {getServiceName(event.service)}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                          <span>{event.date} à {event.time}</span>
                          <span>•</span>
                          <span>{event.duration} min</span>
                          <span>•</span>
                          <span className="capitalize">{event.employee}</span>
                          {event.phone && (
                            <>
                              <span>•</span>
                              <span>{event.phone}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                        Importé
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default CalendarImportSystem;