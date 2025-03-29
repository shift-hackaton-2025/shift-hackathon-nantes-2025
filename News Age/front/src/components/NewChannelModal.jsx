import * as Dialog from '@radix-ui/react-dialog'
import { X, Plus } from 'lucide-react'
import { useState, useEffect } from 'react'

function NewChannelModal({ isOpen, onClose, onCreateChannel, initialChannel = null }) {
  const [name, setName] = useState(initialChannel?.name || '')
  const [prompt, setPrompt] = useState(initialChannel?.prompt || '')
  const [tagInput, setTagInput] = useState('')
  const [tags, setTags] = useState(initialChannel?.tags || [])

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setName(initialChannel?.name || '')
      setPrompt(initialChannel?.prompt || '')
      setTags(initialChannel?.tags || [])
      setTagInput('')
    }
  }, [isOpen, initialChannel])

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setName(initialChannel?.name || '')
      setPrompt(initialChannel?.prompt || '')
      setTags(initialChannel?.tags || [])
      setTagInput('')
    }
  }, [isOpen, initialChannel])

  const handleAddTag = (e) => {
    e.preventDefault()
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput('')
    }
  }

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name && prompt && tags.length > 0) {
      onCreateChannel({
        id: initialChannel?.id,
        name,
        prompt,
        tags,
        articles: initialChannel?.articles || [], // Keep existing articles or start empty
      })
      setName('')
      setPrompt('')
      setTags([])
      onClose()
    }
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        <Dialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-white p-6 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <Dialog.Title className="text-2xl font-semibold">
              {initialChannel ? 'Modifier le canal' : 'Nouveau Canal'}
            </Dialog.Title>
            <Dialog.Close className="text-gray-400 hover:text-gray-600">
              <X size={24} />
            </Dialog.Close>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom du canal
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Veille Tech"
                className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-violet focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prompt de veille
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Décrivez le type de contenu que vous souhaitez suivre..."
                className="w-full h-32 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-violet focus:border-transparent resize-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <div className="flex gap-2 mb-3 flex-wrap">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-violet/10 text-violet rounded-full text-sm flex items-center gap-2"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="text-violet/60 hover:text-violet"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="Ajouter un tag"
                  className="flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-violet focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="bg-violet/10 text-violet px-4 py-2 rounded-lg hover:bg-violet/20 transition flex items-center gap-2"
                >
                  <Plus size={20} />
                  Ajouter
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-violet text-white px-4 py-2 rounded-lg hover:bg-violet-600 transition"
            >
              {initialChannel ? 'Modifier' : 'Créer le canal'}
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default NewChannelModal