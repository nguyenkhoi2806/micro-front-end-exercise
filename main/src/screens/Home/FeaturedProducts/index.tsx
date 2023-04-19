import React from "react";
import { mountRemoteComponent } from "@/utils/loadComponent";
import { useNavigate } from "react-router-dom";

const FeaturedProducts = ({eventBus}: any) => {
  const navigate = useNavigate();
  return (
    <div>
      {mountRemoteComponent({
        module: 'product', component: 'FeaturedProducts', props: {
          navigate,
          eventBus
        },
      })}
    </div>
  );
};

export default FeaturedProducts;
