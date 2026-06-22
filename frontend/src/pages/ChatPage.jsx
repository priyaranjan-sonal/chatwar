import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore.js";
import { ChatNavigationProvider } from "../context/ChatNavigationContext.jsx";

import Header from "../components/Header";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import ChatsList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder";
import SettingsSidebar from "../components/SettingsSidebar";
import SettingsPanel from "../components/SettingsPanel";
import ProfilePanel from "../components/ProfilePanel";
import NoSettingsOpenPlaceholder from "../components/NoSettingsOpenPlaceholder";

function ChatPage() {
  const { activeTab, selectedUser } = useChatStore();
  const socket = useAuthStore((state) => state.socket);
  const location = useLocation();
  const isSettings = location.pathname === "/settings";
  const [activeSettingsSection, setActiveSettingsSection] = useState(null);

  const closeSettingsSection = () => {
    setActiveSettingsSection(null);
  };

  useEffect(() => {
    if (!isSettings) {
      setActiveSettingsSection(null);
    }
  }, [isSettings]);

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (message) => {
      useChatStore.getState().addIncomingMessage(message);
    };

    socket.on("newMessage", handleNewMessage);
    return () => socket.off("newMessage", handleNewMessage);
  }, [socket]);

  const showListOnMobile = !selectedUser && !isSettings;
  const showChatOnMobile = selectedUser && !isSettings;
  const showSettingsOnMobile = isSettings;
  const showSettingsPanelOnMobile =
    isSettings && (activeSettingsSection === "general" || activeSettingsSection === "profile");

  const renderSettingsPanel = () => {
    if (activeSettingsSection === "general") {
      return <SettingsPanel onClose={closeSettingsSection} />;
    }

    if (activeSettingsSection === "profile") {
      return <ProfilePanel onClose={closeSettingsSection} />;
    }

    return <NoSettingsOpenPlaceholder />;
  };

  return (
    <ChatNavigationProvider>
      <div className="relative h-full w-full">
        <div className="flex h-full min-h-0 w-full flex-col overflow-hidden app-gradient-bg md:flex-row">
          {/* LEFT SIDE */}
          <div
            className={`min-h-0 w-full flex-col panel-surface md:flex md:w-72 md:flex-none md:shrink-0 lg:w-[22rem] ${
              showListOnMobile ||
              (showSettingsOnMobile && !showSettingsPanelOnMobile)
                ? "flex flex-1"
                : "hidden md:flex"
            }`}
          >
            <Header />

            {isSettings ? (
              <SettingsSidebar
                activeSection={activeSettingsSection}
                onSectionChange={setActiveSettingsSection}
              />
            ) : (
              <>
                <ActiveTabSwitch />
                <div className="flex-1 overflow-y-auto px-4 pb-4 pt-0">
                  {activeTab === "chats" ? <ChatsList /> : <ContactList />}
                </div>
              </>
            )}
          </div>

          {/* RIGHT SIDE */}
          <div
            className={`min-h-0 w-full min-w-0 flex-col panel-main md:flex md:flex-1 ${
              showChatOnMobile || showSettingsPanelOnMobile
                ? "flex flex-1"
                : "hidden md:flex"
            }`}
          >
            {selectedUser && !isSettings ? (
              <ChatContainer />
            ) : isSettings ? (
              renderSettingsPanel()
            ) : (
              <NoConversationPlaceholder />
            )}
          </div>
        </div>
      </div>
    </ChatNavigationProvider>
  );
}

export default ChatPage;
