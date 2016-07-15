'use strict';

var articles = [];

function Article (opts) {
  for (var key in opts) this[key] = opts[key];
};

Article.prototype.toHtml = function(whichTemplate) {
  var source = whichTemplate.html();
  var templateFunction = Handlebars.compile(source);
  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
  return templateFunction(this);
};

ourLocalData.sort(function(a,b) {
  return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
});

ourLocalData.forEach(function(ele) {
  articles.push(new Article(ele));
});
