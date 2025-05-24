module.exports = function(eleventyConfig) {
  // Static files passthrough
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("blog/images");

  // Collection: pages
  eleventyConfig.addCollection("pages", function(collectionApi) {
    return collectionApi.getAll().filter(item =>
      "title" in item.data &&
      "description" in item.data &&
      "image" in item.data &&
      !item.data.excludeFromIndex
    )
    .sort((a, b) => (a.data.order || 0) - (b.data.order || 0));
  });

  // Collection: blog
  eleventyConfig.addCollection("blog", function(collectionApi) {
    return collectionApi.getAll().filter(item =>
      item.data.tags && item.data.tags.includes("blog")
    );
  });

  return {
    dir: {
      input: ".",
      includes: "_includes",
      output: "_site"
    }
  };
};
