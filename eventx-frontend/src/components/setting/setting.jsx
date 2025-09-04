import ResponsiveDrawer from "../DashboardScreen/maindashboard";
import { useState } from "react";
import { useAuth } from "../Auth/AuthContext";
export default function Settings() {
    const { user } = useAuth();
    const [activeSection, setActiveSection] = useState('profile');
    const [saveStatus, setSaveStatus] = useState('');
    
    // State for different settings sections
    const [profileName, setProfileName] = useState(user.name);
    const [profileEmail, setProfileEmail] = useState(user.email);
    const [twoFactorAuth, setTwoFactorAuth] = useState(false);
    const [emailNotifications, setEmailNotifications] = useState(true);
  
    const handleSave = () => {
      setSaveStatus('Saving...');
      setTimeout(() => {
        // In a real application, this is where a Firebase API call would go.
        console.log('Saved settings:', { profileName, profileEmail, twoFactorAuth, emailNotifications });
        setSaveStatus('Saved!');
        setTimeout(() => setSaveStatus(''), 2000);
      }, 1500);
    };
  
    // Inline SVG icons for the sidebar
    const userIcon = (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
      </svg>
    );
  
    const shieldIcon = (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      </svg>
    );
  
    const bellIcon = (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
      </svg>
    );
  
    // Render the content for the selected section
    const renderContent = () => {
      switch (activeSection) {
        case 'profile':
          return (
            <div className="space-y-6 h-[calc(100vh-300px)]">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Profile</h2>
              <p className="text-gray-500 dark:text-gray-400">Update your personal details and account information.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                  <input
                    id="name"
                    type="text"
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-900 shadow-sm p-3 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    value={profileEmail}
                    onChange={(e) => setProfileEmail(e.target.value)}
                    className="mt-1 block w-full rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-900 shadow-sm p-3 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          );
        case 'security':
          return (
            <div className="space-y-6 h-[calc(100vh-300px)]">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Security</h2>
              <p className="text-gray-500 dark:text-gray-400">Manage your password and two-factor authentication.</p>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">Enable Two-Factor Authentication</span>
                  <button
                    onClick={() => setTwoFactorAuth(!twoFactorAuth)}
                    className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                      twoFactorAuth ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200 ${
                        twoFactorAuth ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    ></span>
                  </button>
                </div>
                <button className="w-full text-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">Change Password</button>
              </div>
            </div>
          );
        case 'notifications':
          return (
            <div className="space-y-6 h-[calc(100vh-300px)]">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Notifications</h2>
              <p className="text-gray-500 dark:text-gray-400">Customize how you receive alerts and updates.</p>
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                <span className="text-gray-700 dark:text-gray-300 font-medium">Receive email notifications</span>
                <button
                  onClick={() => setEmailNotifications(!emailNotifications)}
                  className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                    emailNotifications ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-600'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200 ${
                      emailNotifications ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  ></span>
                </button>
              </div>
            </div>
          );
        default:
          return null;
      }
    };
  
    return (
      <ResponsiveDrawer>
        <div className="w-full max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden font-sans">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
          </div>
  
          <div className="flex flex-col lg:flex-row bg-gray-50 dark:bg-gray-700">
            {/* Navigation Sidebar */}
            <nav className="w-full lg:w-64 p-6 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-600 flex lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2 overflow-x-auto lg:overflow-x-hidden">
              <button
                onClick={() => setActiveSection('profile')}
                className={`flex items-center justify-center lg:justify-start flex-shrink-0 px-4 py-3 rounded-lg font-medium transition-colors ${
                  activeSection === 'profile' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {userIcon}
                <span className="ml-2 hidden lg:inline">Profile</span>
              </button>
              <button
                onClick={() => setActiveSection('security')}
                className={`flex items-center justify-center lg:justify-start flex-shrink-0 px-4 py-3 rounded-lg font-medium transition-colors ${
                  activeSection === 'security' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {shieldIcon}
                <span className="ml-2 hidden lg:inline">Security</span>
              </button>
              <button
                onClick={() => setActiveSection('notifications')}
                className={`flex items-center justify-center lg:justify-start flex-shrink-0 px-4 py-3 rounded-lg font-medium transition-colors ${
                  activeSection === 'notifications' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {bellIcon}
                <span className="ml-2 hidden lg:inline">Notifications</span>
              </button>
            </nav>
  
            {/* Content Area and Save Button */}
            <main className="flex-1 p-8">
              {renderContent()}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-600 flex justify-end items-center">
                {saveStatus && (
                  <p className="mr-4 text-sm text-gray-500 dark:text-gray-400 transition-opacity duration-300 opacity-100">
                    {saveStatus}
                  </p>
                )}
                <button
                  onClick={handleSave}
                  className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Save Changes
                </button>
              </div>
            </main>
          </div>
        </div>
      </ResponsiveDrawer>
    );
  }
   