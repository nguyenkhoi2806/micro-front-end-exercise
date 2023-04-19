import { useNavigate } from 'react-router-dom';

import { mountRemoteComponent } from '@/utils/loadComponent';
import globalStorage from '@/utils/loadStorage'

const ShoppingCart = () => {
  const navigate = useNavigate();
  const token = globalStorage.getToken();

  return mountRemoteComponent({
    module: 'checkout',
    component: 'ShoppingCart',
    props: {
      navigate,
      token
    }
  });
};

export default ShoppingCart;
