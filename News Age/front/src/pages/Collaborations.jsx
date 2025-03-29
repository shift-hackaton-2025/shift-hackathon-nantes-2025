import { dummyTeams, dummySharedItems } from '../data/dummyData'

function Collaborations() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Collaborations</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Équipes</h2>
          <div className="space-y-4">
            {dummyTeams.map((team) => (
              <div key={team.id} className="p-4 border border-gray-200 rounded-lg hover:border-violet transition">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium">{team.name}</h3>
                  <span className="text-sm text-gray-600">{team.memberCount} membres</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Partages Récents</h2>
          <div className="space-y-4">
            {dummySharedItems.map((item) => (
              <div key={item.id} className="p-4 bg-offwhite rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Partagé par {item.sharedBy}</p>
                <h3 className="font-medium">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Collaborations