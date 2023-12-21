import { ComponentLoader } from "adminjs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const componentLoader = new ComponentLoader();
const __dirname = dirname(fileURLToPath(import.meta.url));

const Components = {
  Credentials: componentLoader.add(
    "Credentials",
    __dirname + "/components/credentials"
  ),
};

export { componentLoader, Components };
