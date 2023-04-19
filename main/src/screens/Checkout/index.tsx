import { useNavigate } from 'react-router-dom';

import { mountRemoteComponent } from '@/utils/loadComponent';
import globalStorage from '@/utils/loadStorage'

const Checkout = ({ eventBus }: any) => {
  const navigate = useNavigate();
  const token = globalStorage.getToken();
  return mountRemoteComponent({
    module: 'checkout',
    component: 'Checkout',
    props: {
      navigate,
      token,
      eventBus
    }
  });
};

export default Checkout;
