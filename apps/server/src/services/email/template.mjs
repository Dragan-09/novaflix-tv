import { readFileSync } from "fs";
import handlebars from "handlebars";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const { compile } = handlebars;
const templates_locations = {
  credentials: "/templates/credentials.hbs",
  purchase: "/templates/purchase.hbs",
  trial: "/templates/trial.hbs",
  verification: "/templates/verification.hbs",
};

const generate_template = (template_name, data) => {
  try {
    const html = readFileSync(
      `${__dirname}/${templates_locations[template_name]}`,
      "utf8"
    );
    const template = compile(html);
    const content = template(data);
    return content;
  } catch (error) {
    console.log(error);
  }
};

export default generate_template;
