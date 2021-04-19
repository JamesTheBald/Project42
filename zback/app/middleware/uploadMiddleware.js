const util = require("util");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");

var storage = new GridFsStorage({                   // https://www.npmjs.com/package/multer-gridfs-storage
  url: "mongodb+srv://User:User123@cluster0.1xoim.mongodb.net/helpfulpostings?retryWrites=true&w=majority",
  options: { useNewUrlParser: true, useUnifiedTopology: true },  // https://mongodb.github.io/node-mongodb-native/3.3/reference/unified-topology/
  file: (req, file) => {
    return {
      bucketName: "files",
      filename: `${Date.now()}-${file.originalname}`
    };
  }
});

var uploadFiles = multer({ storage: storage }).array("multi-files", 10);    // accept up to 10 files, an array of files
var uploadFilesMiddleware = util.promisify(uploadFiles);    // https://nodejs.org/api/util.html#util_util_promisify_original

module.exports = uploadFilesMiddleware;
