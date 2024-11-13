import { Css } from "../Icons/Css";
import { Doc } from "../Icons/Doc";
import { Git } from "../Icons/Git";
import { Html } from "../Icons/Html";
import { Js } from "../Icons/Js";
import { Json } from "../Icons/Json";
import { Jsx } from "../Icons/Jsx";
import { Md } from "../Icons/Md";
import { Pdf } from "../Icons/Pdf";
import { Svg } from "../Icons/Svg";
import { Ts } from "../Icons/Ts";
import { Tsx } from "../Icons/Tsx";
import { Yaml } from "../Icons/Yaml";
import { TextIcon } from "./TextIcon";

import { getSelector } from "../utils/getSelector";
import { invoke } from "@tauri-apps/api/core";
import { useEffect, useState } from "react";

const selector = await getSelector();

export const GetIconExt = ({
  fileName,
  path,
}: {
  fileName: string;
  path: string;
}) => {
  const [imgSrc, setImgSrc] = useState<string>("");

  const ext = fileName.split(".").pop()?.toLowerCase();

  const image = ["jpg", "jpeg", "png", "gif", "bmp", "webp"].includes(
    ext as string
  );

  useEffect(() => {
    if (image) {
      const getImage = async (ruta: string) => {
        const res: string = await invoke("obtener_imagen_base64", { ruta }); 

        setImgSrc(res);
      }

      const ruta = `${path}${selector}${fileName}`;
      getImage(ruta);
    }
  }, [path]);

  if (image) {
    return <img src={imgSrc} alt={fileName} className="w-18 h-12 mx-auto rounded" />;
  }
  
  switch (ext) {
    case "txt":
      return <TextIcon />;
    case "doc":
      return <Doc />;
    case "docx":
      return <Doc />;
    case "pdf":
      return <Pdf />;
    case "js":
      return <Js />;
    case "ts":
      return <Ts />;
    case "tsx":
      return <Tsx />;
    case "jsx":
      return <Jsx />;
    case "json":
      return <Json />;
    case "html":
      return <Html />;
    case "css":
      return <Css />;
    case "md":
      return <Md />;
    case "yaml":
      return <Yaml />;
    case "gitignore":
      return <Git />;
    case "svg":
      return <Svg />;
    default:
      return <TextIcon />;
  }
};
