import { useNavigate } from 'react-router-dom';

import { mountRemoteComponent } from '@/utils/loadComponent';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  return mountRemoteComponent({
    module: 'checkout',
    component: 'PaymentFailed',
    props: {
      navigate
    }
  });
};

export default PaymentSuccess;
