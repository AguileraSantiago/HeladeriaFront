import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Route, Switch } from 'wouter';
import HeladoDetail from './pages/Helados/HeladoDetail.jsx';
import Home from './pages/Home.jsx';
import HeladoList from './pages/Helados/HeladoList.jsx';
import FormHeladoCreate from './components/FormHeladoCreate.jsx';

// El <Route> más específico (/helados/create) debe ir antes que /helados/:id, o si no, create será interpretado como un :id.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/helados" component={HeladoList}/>
      <Route path="/helados/create" component={FormHeladoCreate} />
      <Route path="/helados/:id" component={HeladoDetail} />
    </Switch>
  </StrictMode>
);
