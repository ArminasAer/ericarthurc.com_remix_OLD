import React from 'react';

export default function Themer() {
  React.useEffect(() => {
    let theme = localStorage.getItem('theme');
    let themeSwitcherInput: HTMLInputElement | null =
      document.querySelector('#themeSwitch');

    if (themeSwitcherInput) {
      if (theme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        themeSwitcherInput.checked = false;
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeSwitcherInput.checked = true;
      }

      themeSwitcherInput.addEventListener('change', (e) => {
        let target = e.target as HTMLInputElement;
        if (target != null) {
          if (target.checked) {
            localStorage.setItem('theme', 'dark');
            document.documentElement.setAttribute('data-theme', 'dark');
          } else {
            localStorage.setItem('theme', 'light');
            document.documentElement.setAttribute('data-theme', 'light');
          }
        }
      });
    }
  }, []);

  return (
    <div className="theme-switcher">
      <label className="theme-switcher-container">
        <input
          className="theme-switcher-container-input"
          id="themeSwitch"
          type="checkbox"
        />
        <span className="theme-switcher-container-span"></span>
      </label>
    </div>
  );
}
