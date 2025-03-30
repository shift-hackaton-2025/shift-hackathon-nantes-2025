import { dummySources } from '../data/dummyData'
import { useState } from 'react'
import { Plus, Pencil, Trash2, ExternalLink } from 'lucide-react'
import SourceModal from '../components/SourceModal'
import DeleteConfirmationModal from '../components/DeleteConfirmationModal'

function Sources() {
  const [sources, setSources] = useState(dummySources)
  const [isSourceModalOpen, setIsSourceModalOpen] = useState(false)
  const [sourceToEdit, setSourceToEdit] = useState(null)
  const [sourceToDelete, setSourceToDelete] = useState(null)

  // Calculate source statistics
  const totalSources = sources.length
  const sourcesWithNotes = sources.filter(source => source.notes?.trim()).length

  const handleSaveSource = (source) => {
    if (source.id) {
      setSources(sources.map(s => s.id === source.id ? source : s))
    } else {
      setSources([...sources, { ...source, id: sources.length + 1 }])
    }
  }

  const handleDeleteSource = (sourceId) => {
    setSources(sources.filter(source => source.id !== sourceId))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Sources</h1>
          <p className="text-gray-600 mt-2">
            {totalSources} source{totalSources !== 1 ? 's' : ''} au total • 
            {sourcesWithNotes} avec des notes
          </p>
        </div>
        <button
          onClick={() => setIsSourceModalOpen(true)}
          className="bg-violet text-white px-4 py-2 rounded-lg hover:bg-violet-700 transition flex items-center gap-2"
        >
          <Plus size={20} />
          Nouvelle Source
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Mes Sources</h2>
          <span className="text-sm text-gray-600">
            {totalSources} élément{totalSources !== 1 ? 's' : ''}
          </span>
        </div>
        <div className="space-y-4">
          {sources.map((source) => (
            <div key={source.id} className="flex items-center justify-between p-4 bg-offwhite rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-violet rounded-full flex items-center justify-center text-white">
                  {source.initials}
                </div>
                <div>
                  <h3 className="font-medium">{source.name}</h3>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-600">{source.description}</p>
                    {source.notes?.trim() && (
                      <span className="px-2 py-0.5 bg-violet/10 text-violet rounded-full text-xs">
                        Note
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {source.url && (
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-400 hover:text-violet transition rounded-full hover:bg-violet/5"
                  >
                    <ExternalLink size={18} />
                  </a>
                )}
                <button
                  onClick={() => setSourceToEdit(source)}
                  className="p-2 text-gray-400 hover:text-violet transition rounded-full hover:bg-violet/5"
                >
                  <Pencil size={18} />
                </button>
                <button
                  onClick={() => setSourceToDelete(source)}
                  className="p-2 text-gray-400 hover:text-red-600 transition rounded-full hover:bg-red-50"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <SourceModal
        isOpen={isSourceModalOpen || !!sourceToEdit}
        onClose={() => {
          setIsSourceModalOpen(false)
          setSourceToEdit(null)
        }}
        onSave={handleSaveSource}
        source={sourceToEdit}
      />

      <DeleteConfirmationModal
        isOpen={!!sourceToDelete}
        onClose={() => setSourceToDelete(null)}
        onConfirm={() => handleDeleteSource(sourceToDelete.id)}
        title="Supprimer la source"
        message={`Êtes-vous sûr de vouloir supprimer la source "${sourceToDelete?.name}" ? Cette action est irréversible.`}
      />
    </div>
  )
}

export default Sources