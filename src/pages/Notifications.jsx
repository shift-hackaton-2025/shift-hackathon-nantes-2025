import { dummyNotifications } from '../data/dummyData'

function Notifications() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Notifications</h1>
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="space-y-4">
          {dummyNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 ${
                notification.type === 'update'
                  ? 'bg-violet/5 border-l-4 border-violet'
                  : 'bg-magenta/5 border-l-4 border-magenta'
              } rounded-r-lg`}
            >
              <h3 className="font-medium">{notification.title}</h3>
              <p className="text-sm text-gray-600 mt-1">
                {notification.description}
              </p>
              <span className="text-xs text-gray-500 mt-2 block">
                Il y a {notification.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Notifications