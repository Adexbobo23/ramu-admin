import React, { useState } from "react";
import "../ComStyle/SecuritySettings.scss";

const SecuritySettings = () => {
  const [mobileAppSecurity, setMobileAppSecurity] = useState(false);
  const [adminRouteSecurity, setAdminRouteSecurity] = useState(true);

  const handleMobileAppSecurityToggle = () => {
    setMobileAppSecurity(!mobileAppSecurity);
  };

  const handleAdminRouteSecurityToggle = () => {
    setAdminRouteSecurity(!adminRouteSecurity);
  };

  return (
    <div className="security-settings">
      <h2 className="security-settings__title">Security Settings</h2>

      <div className="security-settings__option">
        <label htmlFor="mobile-app-security" className="security-settings__label">
          Mobile App Security:
        </label>
        <input
          id="mobile-app-security"
          type="checkbox"
          checked={mobileAppSecurity}
          onChange={handleMobileAppSecurityToggle}
          className="security-settings__checkbox"
        />
      </div>

      <div className="security-settings__option">
        <label htmlFor="admin-route-security" className="security-settings__label">
          Admin Route Security:
        </label>
        <input
          id="admin-route-security"
          type="checkbox"
          checked={adminRouteSecurity}
          onChange={handleAdminRouteSecurityToggle}
          className="security-settings__checkbox"
        />
      </div>
    </div>
  );
};

export default SecuritySettings;
