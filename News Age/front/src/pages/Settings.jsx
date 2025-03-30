function Settings() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Paramètres</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Profil</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nom</label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-violet focus:ring-1 focus:ring-violet"
                placeholder="Votre nom"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-violet focus:ring-1 focus:ring-violet"
                placeholder="votre@email.com"
              />
            </div>
            <button className="bg-violet text-white px-6 py-2 rounded-lg hover:bg-violet-600 transition">
              Sauvegarder
            </button>
          </form>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Préférences</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Notifications par email</span>
              <button className="w-12 h-6 bg-gray-200 rounded-full relative transition-colors focus:outline-none focus:ring-2 focus:ring-violet">
                <span className="block w-4 h-4 bg-white rounded-full absolute left-1 top-1 transition-transform" />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span>Mode sombre</span>
              <button className="w-12 h-6 bg-gray-200 rounded-full relative transition-colors focus:outline-none focus:ring-2 focus:ring-violet">
                <span className="block w-4 h-4 bg-white rounded-full absolute left-1 top-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings