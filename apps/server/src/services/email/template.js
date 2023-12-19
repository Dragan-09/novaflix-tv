const fs = require("fs");
const handlebars = require("handlebars");

const templates_locations = {
  credentials: "/templates/credentials.hbs",
  purchase: "/templates/purchase.hbs",
  trial: "/templates/trial.hbs",
  verification: "/templates/verification.hbs",
};

const generate_template = (template_name, data) => {
  try {
    const html = fs.readFileSync(
      `${__dirname}/${templates_locations[template_name]}`,
      "utf8"
    );
    const template = handlebars.compile(html);
    const content = template(data);
    return content;
  } catch (error) {
    console.log(error);
  }
};

module.exports = generate_template;
