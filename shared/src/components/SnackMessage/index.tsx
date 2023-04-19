import { useEffect, useState } from "react";
import { createMountComponent } from "../../utils/mountComponent";
import { createPortal } from 'react-dom';
import "./SnackMessage.scss";

const SnackMessage = (props: any) => {
  const [serverity, setServerity] = useState("success");
  const [content, setContent] = useState<any>("");
  const portalRoot: any = document.getElementById("snackbar-message");
  const snackMessageContainer =  document.createElement("div");
  
  useEffect(() => {
    snackMessageContainer.append(content);
    portalRoot && portalRoot.appendChild(snackMessageContainer);
    props.eventBus.on("showMessage", (e: any) => {
      showMessage(e.detail.serverity, e.detail.message)}
    );
    return () => {
      props.eventBus.detach('showMessage');
      snackMessageContainer.remove();
    };
  }, [content, serverity]);

  const showMessage: any = (serverity: string, content: string) => {
    setServerity(serverity);
    setContent(content);
    const snackbar = document.getElementById("snackbar-message");
    if (snackbar) {
      snackbar.className = `show ${serverity}`;
      setTimeout(function () {
        snackbar.className = snackbar.className.replace(`show ${serverity}`, "");
      }, 5000);
    }
  };
  return createPortal(showMessage, portalRoot);
}

export default (el: any, props: any) => createMountComponent(SnackMessage, props, el);
