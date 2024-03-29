const express = require('express');
const tagsRouter = express.Router();
const { getAllTags, getPostsByTagName } = require('../db');

tagsRouter.use((req, res, next) => {
    console.log("A request is being made to /tags");
  
    next();
  });
  
  tagsRouter.get('/', async (req, res) => {
      const tags = await getAllTags();
    
      res.send({
        tags
      });
  });
  
  tagsRouter.get('/:tagName/posts', async (req, res, next) => {
    const { tagName } = req.params

      try {
        const allPosts = await getPostsByTagName(decodeURIComponent(tagName));
        // use our method to get posts by tag name from the db
        const posts = allPosts.filter((post) => {
          if (post.active) {
            return true;
          }
          if (req.user && post.author.id === req.user.id) {
            return true;
          }
          return false;
         
        })
        // send out an object to the client { posts: // the posts }
        res.send({ posts });
      } catch ({ name, message }) {
        // forward the name and message to the error handler
        next({ name, message })
      }
  });

  module.exports = tagsRouter;