import React, { useEffect } from 'react';

import 'jquery-ui-bundle';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'jquery-nice-select';
import './style/sass/style.scss';

const App = () => {
  useEffect(() => {
    ($("select") as any).niceSelect();
  }, []);

  return (
    <div>
      <h1>Basic Host-Remote</h1>
      <h2>Remote</h2>
    </div>
  );
}

export default App;
