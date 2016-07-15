// Configure a view object, to hold all our functions for dynamic updates and article-related event handlers.
var articleView = {};

articleView.populateFilters = function() {
  $('article').each(function() {
    // populate the author filter
    var authorData = $(this).data('author');
    var authorFilterSource = $('#author-template').html();
    var authorFilterTemplate = Handlebars.compile(authorFilterSource);
    var authorOptionHtml = authorFilterTemplate({author:authorData});
    $('#author-filter').append(authorOptionHtml);

    // populate the category filter
    var categoryData = $(this).data('category');
    var categoryFilterSource = $('#category-template').html();
    var categoryFilterTemplate = Handlebars.compile(categoryFilterSource);
    var categoryOptionHtml = categoryFilterTemplate({category:categoryData});
    if ($('#category-filter option[value="' + categoryData + '"]').length === 0) {
      $('#category-filter').append(categoryOptionHtml);
    }
  });
};

articleView.handleAuthorFilter = function() {
  $('#author-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $('article[data-author="' + $(this).val() + '"]').fadeIn();
    } else {
      $('article').fadeIn();
      $('article.template').hide();
    }
    $('#category-filter').val('');
  });
};

articleView.handleCategoryFilter = function() {
  $('#category-filter').on('change', function() {
    if ($(this).val()) {
      $('article').hide();
      $('article[data-category="' + $(this).val() + '"]').fadeIn();
    } else {
      $('article').fadeIn();
      $('article.template').hide();
    }
    $('#author-filter').val('');
  });
};

articleView.handleMainNav = function() {
  $('.main-nav').on('click', '.tab', function(e) {
    $('.tab-content').hide();
    $('#' + $(this).data('content')).fadeIn();
  });
  $('.main-nav .tab:first').click(); // Let's now trigger a click on the first .tab element, to set up the page.
};

articleView.setTeasers = function() {
  $('.article-body *:nth-of-type(n+2)').hide(); // Hide elements beyond the first 2 in any artcile body.

  $('#articles').on('click', 'a.read-on', function(e) {
    e.preventDefault();
    $(this).parent().find('*').fadeIn();
    $(this).hide();
  });
};

articleView.populateFilters();
articleView.handleCategoryFilter();
articleView.handleAuthorFilter();
articleView.handleMainNav();
articleView.setTeasers();
