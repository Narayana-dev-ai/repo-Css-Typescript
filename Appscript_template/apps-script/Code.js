function doGet() {
  var template = HtmlService.createTemplateFromFile("index.html");
  // template.data = JSON.stringify(data); // Passing data to the frontend
  return template
    .evaluate()
    .addMetaTag("viewport", "width=device-width, initial-scale=1.0")
    .setTitle("BOT2324");
}
