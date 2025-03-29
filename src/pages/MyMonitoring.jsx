import { useState } from 'react'
import { Plus, ChevronLeft, Maximize2, Pencil, Trash2 } from 'lucide-react'
import { dummyMonitorings } from '../data/dummyData'
import ArticleModal from '../components/ArticleModal'
import NewChannelModal from '../components/NewChannelModal'
import DeleteConfirmationModal from '../components/DeleteConfirmationModal'

function MyMonitoring() {
  const [selectedChannel, setSelectedChannel] = useState(null)
  const [selectedArticle, setSelectedArticle] = useState(null)
  const [isNewChannelModalOpen, setIsNewChannelModalOpen] = useState(false)
  const [channelToDelete, setChannelToDelete] = useState(null)
  const [channelToEdit, setChannelToEdit] = useState(null)
  const [monitorings, setMonitorings] = useState(dummyMonitorings)

  const handleBack = () => {
    setSelectedChannel(null)
  }

  const handleOpenArticle = (article) => {
    setSelectedArticle(article)
  }

  const handleCloseArticle = () => {
    setSelectedArticle(null)
  }

  const handleCreateChannel = (newChannel) => {
    const channelWithId = {
      ...newChannel,
      id: monitorings.length + 1,
    }
    setMonitorings([...monitorings, channelWithId])
  }

  const handleEditChannel = (updatedChannel) => {
    setMonitorings(monitorings.map(channel => 
      channel.id === updatedChannel.id ? updatedChannel : channel
    ))
  }

  const handleDeleteChannel = (channelId) => {
    setMonitorings(monitorings.filter(channel => channel.id !== channelId))
  }

  return (
    <div className="space-y-6">
      {selectedChannel ? (
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center space-x-4 flex-1">
            <button
              onClick={handleBack}
              className="flex items-center text-gray-600 hover:text-violet transition"
            >
              <ChevronLeft size={20} />
              <span>Retour aux canaux</span>
            </button>
            <div className="flex items-center text-gray-400">
              <span>Mes Veilles</span>
              <span className="mx-2">•</span>
              <span className="text-navy font-medium">{selectedChannel.name}</span>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4 max-w-xs">
            <h3 className="font-medium text-lg">{selectedChannel.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{selectedChannel.description}</p>
            <div className="flex gap-2 mt-2">
              {selectedChannel.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-violet/10 text-violet text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Mes Veilles</h1>
          <button
            onClick={() => setIsNewChannelModalOpen(true)}
            className="bg-violet text-white px-4 py-2 rounded-lg hover:bg-violet-700 transition flex items-center gap-2"
          >
            <Plus size={20} />
            Nouveau Canal
          </button>
        </div>
      )}

      {selectedChannel && <h1 className="text-3xl font-bold mb-6">Articles</h1>}

      {selectedChannel ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedChannel.articles.map((article) => (
            <button
              key={article.id}
              onClick={() => handleOpenArticle(article)}
              className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition relative text-left"
            >
              <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-sm text-gray-600">{article.source}</span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                  {article.url && (
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-violet hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Voir l'article
                    </a>
                  )}
                  <div className="flex gap-1">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-violet/10 text-violet text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                <p className="text-gray-600 line-clamp-3">{article.summary}</p>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {monitorings.map((monitoring) => (
            <button
              key={monitoring.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition text-left"
            >
              <div
                className="p-6 cursor-pointer"
                onClick={() => setSelectedChannel(monitoring)}
              >
                <h3 className="text-xl font-semibold mb-2">{monitoring.name}</h3>
                <p className="text-gray-600 line-clamp-2 mb-4">
                  {monitoring.prompt}
                </p>
                <div className="flex flex-wrap gap-2">
                  {monitoring.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-violet/10 text-violet rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-end gap-2 mt-4 border-t pt-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setChannelToEdit(monitoring)
                    }}
                    className="p-2 text-gray-400 hover:text-violet transition rounded-full hover:bg-violet/5"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setChannelToDelete(monitoring)
                    }}
                    className="p-2 text-gray-400 hover:text-red-600 transition rounded-full hover:bg-red-50"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
      
      {selectedArticle && (
        <ArticleModal
          article={selectedArticle}
          isOpen={!!selectedArticle}
          onClose={handleCloseArticle}
        />
      )}

      <NewChannelModal
        isOpen={isNewChannelModalOpen}
        onClose={() => setIsNewChannelModalOpen(false)}
        onCreateChannel={handleCreateChannel}
      />

      <NewChannelModal
        isOpen={!!channelToEdit}
        onClose={() => setChannelToEdit(null)}
        onCreateChannel={handleEditChannel}
        initialChannel={channelToEdit}
      />

      <DeleteConfirmationModal
        isOpen={!!channelToDelete}
        onClose={() => setChannelToDelete(null)}
        onConfirm={() => handleDeleteChannel(channelToDelete.id)}
        title="Supprimer le canal"
        message={`Êtes-vous sûr de vouloir supprimer le canal "${channelToDelete?.name}" ? Cette action est irréversible.`}
      />
    </div>
  )
}

export default MyMonitoring