import { mountRemoteComponent } from "@/utils/loadComponent";
import { useParams, useNavigate } from "react-router-dom";

const ShopDetail = (props: any) => {
  const navigate = useNavigate();
  const params = useParams();
  const { eventBus } = props;
  return mountRemoteComponent({
    module: "product", component: "ProductDetailView", props: {
      navigate,
      id: params.id, 
      eventBus
    }
  });
};

export default ShopDetail;
