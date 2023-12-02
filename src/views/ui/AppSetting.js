import React, { useState } from "react";
import "../ComStyle/AppSetting.scss";

const AppSettings = () => {
  const [theme, setTheme] = useState("light");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleThemeChange = (event) => {
    setTheme(event.target.value);
  };

  const handleNotificationsToggle = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  return (
    <div className="app-settings">
      <h2 className="app-settings__title">App Settings</h2>

      <div className="app-settings__option">
        <label htmlFor="theme" className="app-settings__label">
          Theme:
        </label>
        <select
          id="theme"
          value={theme}
          onChange={handleThemeChange}
          className="app-settings__select"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>

      <div className="app-settings__option">
        <label htmlFor="notifications" className="app-settings__label">
          Notifications:
        </label>
        <input
          id="notifications"
          type="checkbox"
          checked={notificationsEnabled}
          onChange={handleNotificationsToggle}
          className="app-settings__checkbox"
        />
      </div>
    </div>
  );
};

export default AppSettings;
